import { ABIEncodedValue } from '@worldcoin/id'
import { defaultAbiCoder as abi, solidityKeccak256, solidityPack } from 'ethers/lib/utils'

export const shortAddr = hash => `${hash.slice(0, 5)}...${hash.slice(-4)}`

export const encodeSignal = (profileId?: string): string => {
	if (!profileId) return ''

	const rawDigest = (
		BigInt(solidityKeccak256(['bytes'], [solidityPack(['uint256'], [decodeProfileId(profileId)])])) >> BigInt(8)
	).toString(16)

	return `0x${rawDigest.padStart(64, '0')}`
}

export const decodeProfileId = (profileId?: string): number => {
	if (!profileId) return

	return parseInt(profileId)
}

export const decodeProof = (proof: ABIEncodedValue | null) => {
	if (!proof) return

	return abi.decode(['uint256[8]'], proof as string)[0]
}
