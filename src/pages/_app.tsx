import client from '@/lib/apollo'
import { APP_NAME } from '@/lib/consts'
import '@rainbow-me/rainbowkit/styles.css'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { chain, createClient, WagmiConfig, configureChains } from 'wagmi'
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ApolloProvider } from '@apollo/client'
import '@/index.css'

const { chains, provider } = configureChains(
	[chain.polygon],
	[infuraProvider({ infuraId: process.env.NEXT_PUBLIC_INFURA_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({ appName: APP_NAME, chains })
const wagmiClient = createClient({ autoConnect: false, connectors, provider })

const App = ({ Component, pageProps }) => {
	return (
		<ApolloProvider client={client}>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains}>
					<Component {...pageProps} />
				</RainbowKitProvider>
			</WagmiConfig>
		</ApolloProvider>
	)
}

export default App
