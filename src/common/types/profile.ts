import { StaticImageData } from "next/image"

// FIXME: mocked type
export type Profile = {
	id: string
	avatar: string
	login: string
	name: string
	socialLogo: StaticImageData
	verified: boolean
	__worldIdConnected?: boolean
	__leansVerified?: boolean
}