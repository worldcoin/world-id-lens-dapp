import { IDKitWidget } from '@worldcoin/idkit'
import type { ISuccessResult } from '@worldcoin/idkit'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { Environment } from '@/types'
import { useEffect, useMemo, useState } from 'react'

export function IDKitVerification(): JSX.Element {
	const { query } = useRouter()
	const [isStaging, setIsStaging] = useState(true)
	const { address } = useAccount()

	useEffect(() => {
		setIsStaging(query.env === Environment.Staging)
		console.log(query.env)
	}, [query.env])

	const actionId = useMemo(
		() => (isStaging ? 'wid_staging_ac7743b1589fefaf3ed2fc05b3d60da1' : 'wid_2d3d2e7a1e0c8286083d4e43598e4f62'),
		[isStaging]
	)

	const handleProof = async (result: ISuccessResult) => {
		console.log('Received successful verification from IDKit.')
		const response = await fetch('https://world-id-lens-bridge.vercel.app/api/v1/submit', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				...result,
				action_id: actionId,
				signal: address,
				is_production: !isStaging,
			}),
		})

		if (!response.ok) {
			if (response.status === 400 && (await response.json()).code === 'already_verified') {
				toast.error(
					'You have already verified this phone number with Lens. You can only verify one wallet with one phone number.'
				)
			} else {
				console.error('Failed to submit verification to Lens bridge.', response.status)
				toast.error('Failed to submit verification to Lens bridge. Please try again.')
			}
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
