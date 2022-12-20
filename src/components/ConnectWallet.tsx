import { memo } from 'react'
import Button from './Button'
import { ConnectKitButton } from 'connectkit'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { useSwitchNetwork } from 'wagmi'
import { polygon } from 'wagmi/chains'

const ConnectWallet = () => {
	const { switchNetwork } = useSwitchNetwork()

	return (
		<ConnectKitButton.Custom>
			{({ show, isConnected, unsupported }) => {
				if (isConnected && !unsupported) return

				if (unsupported) {
					return (
						<Button
							className="flex gap-x-4 items-center"
							onClick={() => switchNetwork(polygon.id)}
							size="large"
							uppercase
							variant="dark"
						>
							Switch to Polygon <ChevronRightIcon className="h-4 w-4" />
						</Button>
					)
				}

				return (
					<Button onClick={show} size="large" uppercase variant="white">
						Connect wallet
					</Button>
				)
			}}
		</ConnectKitButton.Custom>
	)
}

export default memo(ConnectWallet)
