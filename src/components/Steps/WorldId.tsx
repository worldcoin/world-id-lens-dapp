import { FC } from 'react'
import dynamic from 'next/dynamic'
import { Profile } from '@/types/lens'
import { VerificationResponse } from '@worldcoin/id'
const WorldID = dynamic(() => import('../WorldID'), { ssr: false })

const WorldId: FC<{ profile: Profile; onChange: (proof: VerificationResponse) => void }> = ({ profile, onChange }) => {
	return (
		<>
			<h1 className="text-2xl font-semibold text-center">
				Verify your <span className="text-indigo-500">Lens profile</span> with World ID
			</h1>
			<WorldID signal={profile.id} onConfirm={onChange} />
		</>
	)
}

export default WorldId
