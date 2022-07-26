import '@/index.css'
import client from '@/lib/apollo'
import { APP_NAME } from '@/lib/consts'
import MetaTags from '@/components/MetaTags'
import { ApolloProvider } from '@apollo/client'
import { patchClient } from '@/lib/walletconnect-fix'
import { chain, createClient, WagmiConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const wagmiClient = createClient(
	patchClient(
		getDefaultClient({
			autoConnect: true,
			appName: APP_NAME,
			chains: [chain.polygon],
			infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
		})
	)
)

const App = ({ Component, pageProps }) => {
	return (
		<ApolloProvider client={client}>
			<WagmiConfig client={wagmiClient}>
				<ConnectKitProvider mode="light">
					<MetaTags />
					<Component {...pageProps} />
				</ConnectKitProvider>
			</WagmiConfig>
		</ApolloProvider>
	)
}

export default App
