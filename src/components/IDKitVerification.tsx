import { IDKitWidget } from '@worldcoin/idkit'
import type { ISuccessResult } from '@worldcoin/idkit'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'
import { useCallback } from 'react'
import { IDKIT_ACTION_ID } from '@/lib/consts'

export function IDKitVerification(): JSX.Element {
	const { address } = useAccount()

	const handleProof = useCallback(
		async (result: ISuccessResult) => {
			console.log('Received successful verification from IDKit.')

			const response = await fetch('https://world-id-lens-bridge.vercel.app/api/v1/submit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...result,
					signal: address,
					action_id: IDKIT_ACTION_ID,
					is_production: process.env.NODE_ENV == 'production',
				}),
			})

			if (response.ok) return

			if (response.status === 400 && (await response.json()).code === 'already_verified') {
				throw toast.error(
					'You have already verified this phone number with Lens. You can only verify one wallet with one phone number.'
				)
			}

			console.error('Failed to submit verification to Lens bridge.', response.status)
			toast.error('Failed to submit verification to Lens bridge. Please try again.')
		},
		[address]
	)

	return (
		<IDKitWidget actionId={IDKIT_ACTION_ID} onSuccess={handleProof}>
			{({ open }) => (
				<button onClick={open} className="pt-4 cursor-pointer">
					Verify with phone number
				</button>
			)}
		</IDKitWidget>
	)
}
