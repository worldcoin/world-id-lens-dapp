import { gql } from '@apollo/client'

export const APP_NAME = 'Lens x Worldcoin'
export const PRODUCTION_API_URL = 'https://api.lens.dev'
export const STAGING_API_URL = 'https://staging-api-social-mumbai.lens.crtlkey.com'

export const HUMANS_QUERY = gql`
	query ($profileIds: [ProfileId!]) {
		profiles(request: { profileIds: $profileIds }) {
			items {
				id
				ownedBy
				handle
				name
				bio
				onChainIdentity {
					worldcoin {
						isHuman
					}
				}
				picture {
					__typename
					... on NftImage {
						contractAddress
						tokenId
						uri
						verified
					}
					... on MediaSet {
						original {
							url
							mimeType
						}
					}
				}
				stats {
					totalFollowers
					totalFollowing
				}
				attributes {
					key
					traitType
					value
				}
			}
		}
	}
`
