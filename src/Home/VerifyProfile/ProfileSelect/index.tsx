import { Button } from '@/common/Button'
import {memo, useState } from 'react'
import { Profile } from '@/common/types/profile'
import { ProfileCard } from '@/common/ProfileCard'

export const ProfileSelect = memo(function ProfileSelect(props: {
	profiles: Array<Profile>
	selectedId?: string
	setSelectedId: (id: string) => void
}) {
	const [currentSelectedId, setCurrentSelectedId] = useState<string>()

	return (
		<div className="grid gap-y-8">
			<h3 className="text-24 font-semibold">
				Verify your <span className="text-4940e0">Lens profile</span> belongs to a human with World ID
			</h3>
			
			<div className="rounded-xl border border-dfe2e3 overflow-clip">
				{props.profiles.map((profile, index) => (
					<ProfileCard
						key={index}
						onSelect={setCurrentSelectedId}
						profile={profile}
						selected={currentSelectedId === profile.id}
					/>
				))}
			</div>

			<Button
				disabled={!currentSelectedId}
				variant="dark"
				size="medium"
				className="w-full text-15 text-center"
				onClick={() => props.setSelectedId(currentSelectedId)}
			>
				Verify Your Profile
			</Button>
		</div>
	)
})
