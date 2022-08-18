import Button from '../Button'
import Modal from './Modal'
import LensAvatar from '../LensAvatar'
import { Profile } from '@/types/lens'
import ProfileCard from '../ProfileCard'
import { useToggle } from '@/hooks/useToggle'
import HumanCheck from '@/abi/HumanCheck.abi.json'
import { FC, memo, useCallback, useState } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { VerificationResponse, WorldIDWidget } from '@worldcoin/id'
import { decodeProfileId, decodeProof } from '@/lib/utils'

type Props = {
	profile: Profile
	onReturn: () => void
	onVerify: (data) => void
	modalState: ReturnType<typeof useToggle>
}

const VerifyModal: FC<Props> = ({ profile, onVerify, onReturn, modalState }) => {
	const [proof, setProof] = useState<VerificationResponse>(null)
	const storeProof = useCallback((proof: VerificationResponse) => setProof(proof), [])

	const { config } = usePrepareContractWrite({
		functionName: 'verify',
		enabled: !!profile && !!proof,
		contractInterface: HumanCheck,
		addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
		args: [decodeProfileId(profile?.id), proof?.merkle_root, proof?.nullifier_hash, decodeProof(proof?.proof)],
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
					<LensAvatar className="w-8 h-8 rounded-full" profile={profile} />

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
						<p className="text-24 px-6">
							Verify your <span className="text-4940e0">Lens profile</span> belongs to a human with World
							ID
						</p>

						<div className="z-50">
							<WorldIDWidget
								enableTelemetry={true}
								onSuccess={storeProof}
								signal={profile?.id ? `0x${profile?.id.padStart(64, '0')}` : ''}
								actionId={process.env.NEXT_PUBLIC_WLD_ACTION_ID}
							/>
						</div>

						<ProfileCard
							profile={profile}
							verified="pending"
							className="w-full rounded-2xl border border-dfe2e3"
						/>
					</div>
				</div>

				<Button disabled={!write} className="w-full" variant="dark" size="medium" onClick={verify}>
					Verify @{profile.handle}
				</Button>
			</div>
		</Modal>
	)
}

export default memo(VerifyModal)
