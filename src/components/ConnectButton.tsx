import { FC } from 'react'
import { ConnectButton as Connect } from '@rainbow-me/rainbowkit'

const ConnectButton: FC = () => {
	return (
		<Connect.Custom>
			{({ account, chain, openChainModal, openConnectModal, mounted }) => {
				return (
					<div
						className={`w-full ${mounted ? '' : 'opacity-0 pointer-events-none select-none'}`}
						aria-hidden={!mounted}
					>
						{(() => {
							if (!mounted || !account || !chain) {
								return (
									<button
										className="bg-indigo-600 text-white w-full py-5 shadow rounded-lg text-lg font-semibold uppercase tracking-wide"
										onClick={openConnectModal}
										type="button"
									>
										Connect Wallet
									</button>
								)
							}

							if (chain.unsupported) {
								return (
									<button
										className="bg-indigo-600 text-white w-full py-5 shadow rounded-lg text-lg font-semibold uppercase tracking-wide"
										onClick={openChainModal}
										type="button"
									>
										Wrong network
									</button>
								)
							}

							return null
						})()}
					</div>
				)
			}}
		</Connect.Custom>
	)
}

export default ConnectButton
