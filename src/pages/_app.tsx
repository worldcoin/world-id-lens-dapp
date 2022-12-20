import '@/index.css'
import { getClient } from '@/lib/apollo'
import { APP_NAME } from '@/lib/consts'
import MetaTags from '@/components/MetaTags'
import { ApolloProvider } from '@apollo/client'
import { patchClient } from '@/lib/walletconnect-fix'
import { createClient, WagmiConfig } from 'wagmi'
import { polygon } from '@wagmi/chains'

import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { Environment } from '@/types'

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
	const { query } = useRouter()

	const client = useMemo(() => {
		const env = query.env === 'staging' ? Environment.Staging : Environment.Production
		return getClient(env)
	}, [query, getClient])

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
