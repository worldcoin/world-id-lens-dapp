import Logo from './Logo'
import { FC, memo } from 'react'
import { shortAddr } from '@/lib/utils'
import { ConnectKitButton } from 'connectkit'

const Header: FC = () => {
	return (
		<div className="py-4 px-4 md:px-8 flex justify-between items-center">
			<Logo />

			<ConnectKitButton.Custom>
				{({ show, isConnected, address, ensName }) => (
					<button onClick={show} className="px-4 py-3 rounded-full bg-183c4a text-ffffff text-14">
						{isConnected ? ensName ?? shortAddr(address) : 'Connect Wallet'}
					</button>
				)}
			</ConnectKitButton.Custom>
		</div>
	)
}

export default memo(Header)
