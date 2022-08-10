import { ABIEncodedValue } from '@worldcoin/id'
import { defaultAbiCoder as abi } from 'ethers/lib/utils'

export const shortAddr = hash => `${hash.slice(0, 5)}...${hash.slice(-4)}`

export const decodeProof = (proof: ABIEncodedValue | null) => {
	if (!proof) return

	abi.decode(['uint256[8]'], proof as string)[0]
}
