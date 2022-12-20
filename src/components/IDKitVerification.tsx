import { IDKitWidget } from '@worldcoin/idkit'
import type { ISuccessResult } from '@worldcoin/idkit'
import { useAccount } from 'wagmi'

const isProd = false
const actionId = isProd ? 'wid_2d3d2e7a1e0c8286083d4e43598e4f62' : 'wid_staging_ac7743b1589fefaf3ed2fc05b3d60da1'

export function IDKitVerification(): JSX.Element {
	const { address } = useAccount()

	const handleProof = async (result: ISuccessResult) => {
		await fetch('https://world-id-lens-bridge.vercel.app', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				...result,
				action_id: actionId,
				signal: address,
				is_production: isProd,
			}),
		})
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
