import { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { ModalBase } from '@/common/ModalBase'
import { useToggle } from '@/common/hooks/useToggle'
import { Profile } from '@/common/types/profile'
import { ModalDefault } from '@/common/ModalDefault'
import { ProfileSelect } from './ProfileSelect'
import { Verify } from './Verify'
import { Verified } from './Verified'
import facebook from 'public/images/facebook.png'
import instagram from 'public/images/instagram.png'
import twitter from 'public/images/twitter.png'

// FIXME: replace mocked profiles
const profiles: Array<Profile> = [
	{
		id: '0',
		avatar: 'https://avatars.githubusercontent.com/u/23558090',
		login: '@verifiedhuman.lens',
		name: 'Miguel.P295',
		socialLogo: facebook,
		verified: true,
	},
	{
		id: '1',
		avatar: 'https://avatars.githubusercontent.com/u/23558090',
		login: '@m1guelpf',
		name: '$MIGUEL Piedrafita',
		socialLogo: instagram,
		verified: false,
	},
	{
		id: '2',
		avatar: 'https://avatars.githubusercontent.com/u/23558090',
		login: '@verifiedhuman.lens',
		name: 'Miguel Piedrafita',
		socialLogo: twitter,
		verified: false,
	},
]

enum Screens {
	SELECT,
	VERIFY,
	VERIFIED,
}

export const VerifyProfile = memo(function VerifyProfile(props: {
	onVerify: (profile: Profile) => void
	modalState: ReturnType<typeof useToggle>
}) {
	const [screen, setScreen] = useState<Screens>(Screens['SELECT'])
	const [selectedId, setSelectedId] = useState<string>()

	// ANCHOR: Reset state if close
	useEffect(() => {
		if (!props.modalState.isOn) {
			setSelectedId(undefined)
			setScreen(Screens['SELECT'])
		}
	}, [props.modalState.isOn])

	const handleSelect = useCallback((id: string) => {
		setSelectedId(id)
		setScreen(Screens['VERIFY'])
	}, [])

	const handleVerify = useCallback(() => {
		setScreen(Screens['VERIFIED'])
	}, [])

	const handleCancel = useCallback(() => {
		setScreen(Screens['SELECT'])
	}, [])

	const handleConfirm = useCallback(() => {
		props.onVerify(profiles.find(({ id }) => id === selectedId))
	}, [props, selectedId])

	return (
		<ModalBase modalState={props.modalState}>
			<ModalDefault>
				{screen === Screens['SELECT'] && (
					<ProfileSelect profiles={profiles} selectedId={selectedId} setSelectedId={handleSelect} />
				)}

				{screen === Screens['VERIFY'] && <Verify onVerify={handleVerify} onCancel={handleCancel} />}

				{screen === Screens['VERIFIED'] && <Verified onConfirm={handleConfirm} />}
			</ModalDefault>
		</ModalBase>
	)
})
