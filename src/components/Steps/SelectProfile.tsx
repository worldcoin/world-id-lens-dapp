import { useState } from 'react'
import LensAvatar from '../LensAvatar'
import useProfiles from '@/hooks/useProfiles'
import VerifiedIcon from '../Icons/VerifiedIcon'
import Spinner from '../Spinner'

const SelectProfile = ({ onChange }) => {
	const { profiles, loading } = useProfiles()
	const [profileIndex, setProfileIndex] = useState<number>(null)

	return (
		<>
			<h1 className="text-2xl font-semibold text-center">
				Choose which <span className="text-indigo-500">Lens profile</span> to verify
			</h1>
			{loading && <Spinner className="w-12 h-12 text-indigo-500" />}
			<div className="grid grid-cols-2 gap-4">
				{profiles &&
					profiles.map((profile, i) => (
						<button
							onClick={() => setProfileIndex(i)}
							key={profile.id}
							className="p-5 flex items-center border rounded-lg space-x-4 hover:shadow-lg transition"
						>
							<LensAvatar profile={profile} width={80} height={80} />
							<div>
								<p className="text-2xl whitespace-nowrap text-left">{profile.name}</p>
								<p className="text-gray-400 text-left">@{profile.handle}</p>
								<div className="text-indigo-500 flex items-center space-x-1 mt-1">
									<VerifiedIcon className="w-4 h-4" />
									<p className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-600 to-indigo-400 text-sm">
										Verified Human
									</p>
								</div>
							</div>
						</button>
					))}
			</div>
			<button
				disabled={profileIndex == null}
				className="bg-indigo-600 text-white w-full py-5 shadow rounded-lg text-lg font-semibold uppercase tracking-wide disabled:opacity-60 transition disabled:cursor-not-allowed"
				onClick={() => onChange(profiles[profileIndex])}
				type="button"
			>
				Select Profile
			</button>
		</>
	)
}

export default SelectProfile
