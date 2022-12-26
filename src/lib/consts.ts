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

export const IDKIT_ACTION_ID =
	process.env.NODE_ENV === 'production'
		? 'wid_2d3d2e7a1e0c8286083d4e43598e4f62'
		: 'wid_staging_ac7743b1589fefaf3ed2fc05b3d60da1'
