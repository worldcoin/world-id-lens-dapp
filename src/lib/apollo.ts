import { PRODUCTION_API_URL, STAGING_API_URL } from './consts'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { Environment } from '@/types'

export const getClient = (env: Environment) => {
	const httpLink = new HttpLink({ uri: env === Environment.Production ? PRODUCTION_API_URL : STAGING_API_URL, fetch })

	return new ApolloClient({ link: httpLink, cache: new InMemoryCache() })
}
