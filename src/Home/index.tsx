import { Button } from '@/common/Button'
import { Icon } from '@/common/Icon'
import { VerifyProfile } from '@/Home/VerifyProfile'
import { WalletConnect } from '@/Home/WalletConnect'
import { WorldId } from '@/Home/WorldId'
import { useToggle } from '@/common/hooks/useToggle'
import { memo, useState, Fragment, useCallback } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { Hero } from './Hero'
import { Profile } from '@/common/types/profile'
import { Wallet } from '../common/types/wallet'
import { VerifiedHumans } from './VerifiedHumans'
import { VerifyLens } from './VerifyLens'

export const Home = memo(function Home() {
	const [wallet, setWallet] = useState<Wallet>()
	const [profile, setProfile] = useState<Profile>()

	const walletModal = useToggle()
	const verifyModal = useToggle()
	const worldIdModal = useToggle()
	const verifyLensModal = useToggle()

	const handleWalletConnect = useCallback(
		(wallet: Wallet) => {
			setWallet(wallet)
			walletModal.toggleOff()
		},
		[walletModal]
	)

	const handleProfileVerify = useCallback(
		(profile: Profile) => {
			setProfile(profile)
			verifyModal.toggleOff()
			worldIdModal.toggleOn()
		},
		[verifyModal, worldIdModal]
	)

	const handleWorldIdConnect = useCallback(() => {
		setProfile(previousProfile => ({...previousProfile, __worldIdConnected: true}))
		worldIdModal.toggleOff()
		verifyLensModal.toggleOn()
	}, [verifyLensModal, worldIdModal])

	const handleLensVerify = useCallback(() => {
		setProfile(previousProfile => ({...previousProfile, __leansVerified: true}))
	}, [])

	const handleLensRemoveVerify = useCallback(() => {
		setProfile(previousProfile => ({...previousProfile, __leansVerified: false}))
	}, [])

	return (
		<Fragment>
			<div className="grid grid-rows-auto/fr/auto min-h-screen">
				<Header hash={wallet?.hash} />
				
				<div className="grid grid-cols-container p-4">
					<div className="col-start-2 grid gap-y-16 md:grid-flow-col md:place-items-center md:justify-between md:auto-cols-max">
						<Hero>
							{!wallet && (
								<Button onClick={walletModal.toggleOn} size="large" uppercase variant="white">
									Connect wallet
								</Button>
							)}

							{wallet && (
								<Button
									className="flex gap-x-4 items-center"
									onClick={verifyModal.toggleOn}
									size="large"
									uppercase
									variant="dark"
								>
									Verify your lens account <Icon className="h-2 w-3" name="arrow-right" />
								</Button>
							)}
						</Hero>

						<VerifiedHumans className="max-w-[540px]" />
					</div>
				</div>

				<Footer />
			</div>

			<WalletConnect modalState={walletModal} onConnect={handleWalletConnect} />
			<VerifyProfile modalState={verifyModal} onVerify={handleProfileVerify} />
			<WorldId modalState={worldIdModal} onConnect={handleWorldIdConnect} />
			<VerifyLens modalState={verifyLensModal} profile={profile} onVerify={handleLensVerify} onRemoveVerify={handleLensRemoveVerify} />
		</Fragment>
	)
})
