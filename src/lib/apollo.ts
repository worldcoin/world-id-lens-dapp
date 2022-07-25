import { API_URL } from './consts'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const httpLink = new HttpLink({ uri: API_URL, fetch })

const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() })

export default client
