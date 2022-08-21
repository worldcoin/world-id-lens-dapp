import { Connector, Provider } from '@wagmi/core'

type WagmiClient = {
	autoConnect?: boolean
	connectors?: Connector[]
	provider: Provider
	webSocketProvider?: any
}

export const patchClient = (client: WagmiClient): WagmiClient => {
	return {
		...client,
		connectors: client.connectors.map(c => {
			if (c.id !== 'walletConnect') return c

			c.options.infuraId = process.env.NEXT_PUBLIC_INFURA_ID
			return c
		}),
	}
}
