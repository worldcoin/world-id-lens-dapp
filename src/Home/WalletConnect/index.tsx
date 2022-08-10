import { useToggle } from '@/common/hooks/useToggle'
import { memo, useEffect } from 'react'
import { ModalBase } from '@/common/ModalBase'
import { Wallet } from '@/common/types/wallet'

// FIXME: Implement WalletConnect
export const WalletConnect = memo(function WalletConnect(props: {
	onConnect: (wallet: Wallet) => void
    modalState: ReturnType<typeof useToggle>
}) {
	useEffect(() => {
		if (!props.modalState.isOn) {
			return
		}

		let timer: NodeJS.Timeout

		timer = setTimeout(() => {
			props.onConnect({ hash: '0x824dsjkdj123871238shgdhasgdA0RD' })
		}, 2000)

		return () => {
			clearTimeout(timer)
		}
	}, [props])

	return (
		<ModalBase modalState={props.modalState}>
			<div className="bg-ffffff rounded-xl p-5 text-center grid gap-y-4">
				<h1 className="text-24 font-bold">Wallet Connect</h1>
				
				<div>
					<p>Simulating connection...</p>
					<p>after 2 seconds modal will be close and you can continue</p>
				</div>
			</div>
		</ModalBase>
	)
})
