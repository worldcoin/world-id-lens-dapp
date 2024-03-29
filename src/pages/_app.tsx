import '@/index.css'
import client from '@/lib/apollo'
import { APP_NAME } from '@/lib/consts'
import MetaTags from '@/components/MetaTags'
import { ApolloProvider } from '@apollo/client'
import { patchClient } from '@/lib/walletconnect-fix'
import { createClient, WagmiConfig } from 'wagmi'
import { polygon } from '@wagmi/chains'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { Toaster } from 'react-hot-toast'

const wagmiClient = createClient(
	patchClient(
		getDefaultClient({
			autoConnect: true,
			appName: APP_NAME,
			chains: [polygon],
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
					<Toaster />
				</ConnectKitProvider>
			</WagmiConfig>
		</ApolloProvider>
	)
}

export default App
