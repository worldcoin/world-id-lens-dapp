import { FC } from 'react'
import { Profile } from '@/types/lens'
import LensAvatar from '../LensAvatar'
import { useContractWrite } from 'wagmi'
import VerifiedIcon from '../Icons/VerifiedIcon'
import HumanCheck from '@/abi/HumanCheck.abi.json'
import { VerificationResponse } from '@worldcoin/id'
import { defaultAbiCoder as abi } from 'ethers/lib/utils'

const SubmitTx: FC<{ profile: Profile; proof: VerificationResponse; onChange: () => void }> = ({
	profile,
	proof,
	onChange,
}) => {
	const { write, isLoading } = useContractWrite({
		onSuccess: onChange,
		functionName: 'verify',
		contractInterface: HumanCheck,
		addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
		args: [
			profile.id,
			proof.merkle_root,
			proof.nullifier_hash,
			abi.decode(['uint256[8]'], proof?.proof as string)?.[0],
		],
	})

	return (
		<>
			<h1 className="text-2xl font-semibold text-center">
				Verify your <span className="text-indigo-500">Lens profile</span> belongs to a human
			</h1>
			<div className="p-5 flex items-center border rounded-lg space-x-4 hover:shadow-lg transition">
				<LensAvatar profile={profile} width={80} height={80} />
				<div>
					<p className="text-2xl whitespace-nowrap text-left">{profile.name}</p>
					<p className="text-gray-400 text-left">@{profile.handle}</p>
					<div className="text-indigo-500 flex items-center space-x-1 mt-1 animate-pulse">
						<VerifiedIcon className="w-4 h-4" />
						<p className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-600 to-indigo-400 text-sm">
							Verified Human
						</p>
					</div>
				</div>
			</div>
			<p className="text-sm text-gray-400 text-center">
				If you previously verified a different profile, its badge will be removed.
			</p>
			<button
				onClick={() => write()}
				disabled={isLoading}
				className="bg-indigo-600 text-white w-full py-5 shadow rounded-lg text-lg font-semibold uppercase tracking-wide disabled:opacity-60 transition disabled:cursor-wait"
				type="button"
			>
				Verify @{profile.handle}
			</button>
		</>
	)
}

export default SubmitTx
