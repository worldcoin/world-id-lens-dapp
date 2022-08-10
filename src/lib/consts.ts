import { gql } from '@apollo/client'

export const APP_NAME = 'Verify your Lens profile'
export const API_URL = 'https://api.lens.dev'

export const HUMANS_QUERY = gql`
	query ($profileIds: [ProfileId!]) {
		profiles(request: { profileIds: $profileIds }) {
			items {
				id
				ownedBy
				handle
				name
				bio
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
