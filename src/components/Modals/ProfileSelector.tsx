import { Profile } from '@/types/lens'
import Button from '@/components/Button'
import { useToggle } from '@/hooks/useToggle'
import useProfiles from '@/hooks/useProfiles'
import Modal from '@/components/Modals/Modal'
import ProfileCard from '@/components/ProfileCard'
import { FC, memo, useCallback, useEffect, useState } from 'react'

type Props = {
	onSelect: (profile: Profile) => void
	modalState: ReturnType<typeof useToggle>
}

const SelectProfile: FC<Props> = ({ onSelect, modalState }) => {
	const { profiles } = useProfiles()
	const [selectedId, setSelectedId] = useState<string>()

	// ANCHOR: Reset state if close
	useEffect(() => {
		if (modalState.isOn) return

		setSelectedId(undefined)
	}, [modalState.isOn])

	const selectProfile = useCallback(() => {
		onSelect(profiles.find(({ id }) => id === selectedId))
	}, [profiles, onSelect, selectedId])

	return (
		<Modal modalState={modalState}>
			<div className="grid gap-y-8">
				<h3 className="text-24 font-semibold">
					Verify your <span className="text-4940e0">Lens profile</span> belongs to a human with World ID
				</h3>

				<div className="rounded-xl border border-dfe2e3 overflow-clip divide-y divide-dfe2e3">
					{profiles?.map((profile, index) => (
						<ProfileCard
							key={index}
							verified={false}
							profile={profile}
							onSelect={setSelectedId}
							selected={selectedId === profile.id}
						/>
					))}
				</div>

				<Button
					size="medium"
					variant="dark"
					disabled={!selectedId}
					onClick={selectProfile}
					className="w-full text-15 text-center"
				>
					Select Profile
				</Button>
			</div>
		</Modal>
	)
}

export default memo(SelectProfile)
