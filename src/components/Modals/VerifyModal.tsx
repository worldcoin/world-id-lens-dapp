import Modal from './Modal'
import Button from '../Button'
import LensAvatar from '../LensAvatar'
import { Profile } from '@/types/lens'
import ProfileCard from '../ProfileCard'
import useProfiles from '@/hooks/useProfiles'
import { useToggle } from '@/hooks/useToggle'
import VerifiedIcon from '../Icons/VerifiedIcon'
import HumanCheck from '@/abi/HumanCheck.abi.json'
import { encodeProfileId, decodeProof } from '@/lib/utils'
import { FC, memo, useCallback, useMemo, useState } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { VerificationResponse, WorldIDWidget } from '@worldcoin/id'

type Props = {
	profile: Profile
	onReturn: () => void
	onVerify: (data) => void
	modalState: ReturnType<typeof useToggle>
}

const VerifyModal: FC<Props> = ({ profile, onVerify, onReturn, modalState }) => {
	const { profiles } = useProfiles()
	const [proof, setProof] = useState<VerificationResponse>(null)
	const storeProof = useCallback((proof: VerificationResponse) => setProof(proof), [])

	const hasVerifiedProfile = useMemo<boolean>(
		() => profiles?.some(profile => profile.onChainIdentity.worldcoin.isHuman),
		[profiles]
	)

	const { config } = usePrepareContractWrite({
		functionName: 'verify',
		enabled: !!profile && !!proof,
		contractInterface: HumanCheck,
		addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
		args: [profile?.id, proof?.merkle_root, proof?.nullifier_hash, decodeProof(proof?.proof)],
	})

	const { write } = useContractWrite({ ...config, onSuccess: onVerify })
	const verify = useCallback(() => write(), [write])

	if (!profile) return

	return (
		<Modal
			onReturn={onReturn}
			modalState={modalState}
			header={
				<div className="flex gap-x-1 p-2 pr-4 bg-183c4a/[5%] rounded-full ">
					<div className="relative w-8 h-8 mr-2">
						<LensAvatar className="w-8 h-8 rounded-full" profile={profile} />
						{profile.onChainIdentity.worldcoin.isHuman && (
							<span className="rounded-full absolute -bottom-1.5 -right-1.5">
								<VerifiedIcon width={18} height={18} border="text-[#F5F6F6] !w-5 !-mt-[2.1px]" />
							</span>
						)}
					</div>

					<div className="font-rubik">
						<p className="text-14">{profile.name}</p>
						<p className="text-11 opacity-50">@{profile.handle}</p>
					</div>
				</div>
			}
		>
			<div className="grid gap-y-8">
				<div className="max-w-[440px] grid gap-y-4">
					<div className="grid place-items-center gap-y-6">
						<p className="text-24 px-6 text-center">
							Verify your <span className="text-4940e0">Lens profile</span> belongs to a human with World
							ID
						</p>

						{!profile.onChainIdentity.worldcoin.isHuman && (
							<div className="z-50">
								<WorldIDWidget
									enableTelemetry={true}
									onSuccess={storeProof}
									signal={encodeProfileId(profile?.id)}
									actionId={process.env.NEXT_PUBLIC_WLD_ACTION_ID}
								/>
							</div>
						)}

						<ProfileCard
							profile={profile}
							className="w-full rounded-2xl border border-dfe2e3"
							verified={profile.onChainIdentity.worldcoin.isHuman || 'pending'}
						/>
					</div>
				</div>

				{profile.onChainIdentity.worldcoin.isHuman ? (
					<p className="font-rubik text-858494 text-center">This profile is already verified!</p>
				) : (
					<>
						{hasVerifiedProfile && (
							<p className="font-rubik text-858494 text-center max-w-xs leading-5 mx-auto">
								You already have a verified profile! Verifying{' '}
								<span className="text-gray-600 font-medium">@{profile.handle}</span> will remove the
								verification from your other profile.
							</p>
						)}
						<Button disabled={!write} className="w-full" variant="dark" size="medium" onClick={verify}>
							Verify @{profile.handle}
						</Button>
					</>
				)}
			</div>
		</Modal>
	)
}

export default memo(VerifyModal)
