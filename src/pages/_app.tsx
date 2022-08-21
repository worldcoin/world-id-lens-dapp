import '@/index.css'
import Head from 'next/head'
import client from '@/lib/apollo'
import { APP_NAME } from '@/lib/consts'
import faviconImg from '@images/logo.png'
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
					<Head>
						<link rel="shortcut icon" href={faviconImg.src} />
					</Head>
					<Component {...pageProps} />
				</ConnectKitProvider>
			</WagmiConfig>
		</ApolloProvider>
	)
}

export default App
