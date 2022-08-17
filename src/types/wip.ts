import { ReactNode } from 'react'
import { StaticImageData } from 'next/image'

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

// FIXME: mocked type
export type Wallet = {
	hash: string
}

// FIXME: mocked type
export type Human = {
	login: string
	avatar?: string
	name: string
	hash: string
	following: string | number
	followers: string | number
	content: ReactNode
}
