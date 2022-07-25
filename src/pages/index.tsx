import { useAccount } from 'wagmi'
import { Profile, ProfileFollowModuleRedeemParams } from '@/types/lens'
import useProfiles from '@/hooks/useProfiles'
import { FC, useCallback, useEffect, useState } from 'react'
import LensAvatar from '@/components/LensAvatar'
import LensIcon from '@/components/Icons/LensIcon'
import WorldcoinIcon from '@/components/Icons/WorldcoinIcon'
import SelectProfile from '@/components/Steps/SelectProfile'
import ConnectWallet from '@/components/Steps/ConnectWallet'
import WorldId from '@/components/Steps/WorldId'
import { VerificationResponse } from '@worldcoin/id'
import SubmitTx from '@/components/Steps/SubmitTx'

enum States {
	CONNECT_WALLET,
	SELECT_PROFILE,
	WORLD_ID,
	SEND_TX,
	VERIFIED,
}

const Home: FC = () => {
	const { address } = useAccount()
	const [profile, setProfile] = useState<Profile>(null)
	const [proof, setProof] = useState<VerificationResponse>(null)
	const [step, setStep] = useState<States>(States.CONNECT_WALLET)

	const updateProfile = useCallback((profile: Profile) => {
		setProfile(profile)
		setStep(States.WORLD_ID)
	}, [])

	const storeProof = useCallback((proof: VerificationResponse) => {
		setProof(proof)
		setStep(States.SEND_TX)
	}, [])

	useEffect(() => {
		if (!address) return

		setStep(States.SELECT_PROFILE)
	}, [address])

	return (
		<div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen">
			<div className="bg-white shadow rounded-xl w-full max-w-2xl">
				<div className="flex items-center justify-between border-b py-8 px-6">
					<div className="flex items-center space-x-4">
						<WorldcoinIcon className="w-8 h-8" />
						<span className="text-gray-200 font-thin text-4xl">/</span>
						<LensIcon className="w-8 h-8" />
					</div>
					{profile && (
						<div className="flex items-center space-x-3">
							<LensAvatar profile={profile} width={40} height={40} />
							<div>
								<p className="">{profile.name}</p>
								<p className="text-gray-400 text-sm">@{profile.handle}</p>
							</div>
						</div>
					)}
				</div>
				<div className="p-8 space-y-5 flex flex-col items-center">
					{(() => {
						switch (step) {
							case States.CONNECT_WALLET:
								return <ConnectWallet />
							case States.SELECT_PROFILE:
								return <SelectProfile onChange={updateProfile} />
							case States.WORLD_ID:
								return <WorldId profile={profile} onChange={storeProof} />
							case States.SEND_TX:
								return <SubmitTx profile={profile} proof={proof} onChange={() => alert('done')} />

							default:
								break
						}
					})()}
				</div>
			</div>
		</div>
	)
}

export default Home
