import { ReactNode } from "react"

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