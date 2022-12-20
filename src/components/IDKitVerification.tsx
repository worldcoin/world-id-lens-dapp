import { IDKitWidget } from '@worldcoin/idkit'
import type { ISuccessResult } from '@worldcoin/idkit'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'

const isProd = false
const actionId = isProd ? 'wid_2d3d2e7a1e0c8286083d4e43598e4f62' : 'wid_staging_ac7743b1589fefaf3ed2fc05b3d60da1'

export function IDKitVerification(): JSX.Element {
	const { address } = useAccount()

	const handleProof = async (result: ISuccessResult) => {
		console.log('Received successful verification from IDKit.')
		try {
			await fetch('https://world-id-lens-bridge.vercel.app/api/v1/submit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...result,
					action_id: actionId,
					signal: address,
					is_production: isProd,
				}),
			})
		} catch (e) {
			console.error('Failed to submit verification to Lens bridge.', e)
			toast.error('Failed to submit verification to Lens bridge. Please try again.')
		}
	}

	return (
		<IDKitWidget actionId={actionId} onSuccess={handleProof}>
			{({ open }) => (
				<a
					href="#"
					onClick={e => {
						e.preventDefault()
						open()
					}}
					className="pt-4 cursor-pointer"
				>
					Verify with phone number
				</a>
			)}
		</IDKitWidget>
	)
}
