import '@/index.css'
import client from '@/lib/apollo'
import { APP_NAME } from '@/lib/consts'
import { ApolloProvider } from '@apollo/client'
import { chain, createClient, WagmiConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const wagmiClient = createClient(
	getDefaultClient({
		autoConnect: true,
		appName: APP_NAME,
		chains: [chain.polygon],
		infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
	})
)

const App = ({ Component, pageProps }) => {
	return (
		<ApolloProvider client={client}>
			<WagmiConfig client={wagmiClient}>
				<ConnectKitProvider mode="light">
					<Component {...pageProps} />
				</ConnectKitProvider>
			</WagmiConfig>
		</ApolloProvider>
	)
}

export default App
