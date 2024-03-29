import type { ISuccessResult, WidgetProps } from '@worldcoin/idkit'
import { useAccount } from 'wagmi'
import { useCallback } from 'react'
import { IDKIT_ACTION_ID } from '@/lib/consts'
import dynamic from 'next/dynamic'

const IDKitWidget = dynamic<WidgetProps>(() => import('@worldcoin/idkit').then(mod => mod.IDKitWidget), { ssr: false })

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

			if (response.ok) {
				// Check with Lens API user has gasless enabled
				return
			}

			if (response.status === 400 && (await response.json()).code === 'already_verified') {
				throw new Error(
					'You have already verified this phone number with Lens. You can only verify one wallet with one phone number.'
				)
			}

			console.error('Failed to submit verification to Lens bridge.', response.status)
			throw new Error()
		},
		[address]
	)

	return (
		<IDKitWidget actionId={IDKIT_ACTION_ID} signal={address} onVerification={handleProof}>
			{({ open }) => (
				<button onClick={open} className="pt-4 cursor-pointer">
					Verify with phone number
				</button>
			)}
		</IDKitWidget>
	)
}
