import client from '@/lib/apollo'
import Hero from '@/components/Hero'
import { GetStaticProps } from 'next'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Button from '@/components/Button'
import { HUMANS_QUERY } from '@/lib/consts'
import { useToggle } from '@/hooks/useToggle'
import { useAccount, useNetwork } from 'wagmi'
import VerifyLens from '@/components/VerifyLens'
import ConnectWallet from '@/components/ConnectWallet'
import { memo, useState, useCallback, FC } from 'react'
import VerifiedHumans from '@/components/VerifiedHumans'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { PaginatedProfileResult, Profile } from '@/types/lens'
import ProfileSelector from '@/components/Modals/ProfileSelector'

const Home: FC<{ humans: Profile[] }> = ({ humans }) => {
	const { chain } = useNetwork()
	const { isConnected } = useAccount()
	const [profile, setProfile] = useState<Profile>()

	const verifyModal = useToggle()
	const verifyLensModal = useToggle()

	const handleProfileSelect = useCallback(
		(profile: Profile) => {
			setProfile(profile)
			verifyModal.toggleOff()
			verifyLensModal.toggleOn()
		},
		[verifyModal, verifyLensModal]
	)

	const handleLensVerify = useCallback(({ hash }) => {
		window.open(`https://polygonscan.com/tx/${hash}`)
	}, [])

	const handleReturn = useCallback(() => {
		setProfile(null)
		verifyLensModal.toggleOff()
		verifyModal.toggleOn()
	}, [verifyModal, verifyLensModal])

	return (
		<>
			<div className="flex flex-col min-h-screen">
				<Header />

				<div className="flex flex-col md:flex-row space-y-10 md:space-y-0 items-center justify-around p-4 flex-1">
					<Hero>
						<ConnectWallet />

						{isConnected && !chain?.unsupported && (
							<Button
								className="flex gap-x-4 items-center"
								onClick={verifyModal.toggleOn}
								size="large"
								uppercase
								variant="dark"
							>
								Verify your lens account <ChevronRightIcon className="h-4 w-4" />
							</Button>
						)}
					</Hero>

					<VerifiedHumans humans={humans} className="max-w-[540px]" />
				</div>

				<Footer />
			</div>

			<ProfileSelector modalState={verifyModal} onSelect={handleProfileSelect} />
			<VerifyLens
				profile={profile}
				onReturn={handleReturn}
				onVerify={handleLensVerify}
				modalState={verifyLensModal}
			/>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const {
		data: {
			profiles: { items: humans },
		},
	} = await client.query<{ profiles: PaginatedProfileResult }>({
		query: HUMANS_QUERY,
		variables: { profileIds: ['0xf5', '0x16', '0x8d0d'] },
	})

	return {
		props: { humans },
	}
}

export default memo(Home)
