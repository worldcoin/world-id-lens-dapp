import cn from 'classnames'
import { FC, memo } from 'react'
import { Profile } from '@/types/lens'
import VerifiedIcon from './Icons/VerifiedIcon'
import LensAvatar from './LensAvatar'

type Props = {
	profile: Profile
	verified: boolean
	className?: string
	selected?: boolean
	onSelect?: (id: string) => void
}

const ProfileCard: FC<Props> = ({ profile, verified, className, selected, onSelect }) => {
	return (
		<div
			className={cn(
				'grid grid-cols-auto/fr gap-x-4 items-center p-5 cursor-pointer',
				'transition-colors',
				{
					'bg-dde7ea/30': selected,
					'hover:bg-dde7ea/10': !selected,
				},
				className
			)}
			onClick={() => onSelect?.(profile.id)}
		>
			<span className="relative w-[80px] h-[80px]">
				<LensAvatar className="absolute inset-0 rounded-full border" profile={profile} />
				{verified && (
					<span
						className={`p-1 rounded-full absolute bottom-0 right-0 grid transition ${
							selected ? 'bg-[#F5F8F9]' : 'bg-white'
						}`}
					>
						<VerifiedIcon className="w-5 h-5 animate-pulse" />
					</span>
				)}
			</span>

			<div className="grid gap-y-0.5">
				<div className="flex items-center gap-x-1">
					<p className="font-semibold text-20">{profile.name}</p>
				</div>

				<p className="text-14 text-183c4a/50">
					<span>@{profile.handle}</span>

					{verified && (
						<>
							<span>&nbsp;&bull;&nbsp;</span>

							<span className="bg-gradient-to-b from-4940e0 to-7c74fb text-transparent bg-clip-text animate-pulse">
								Verified Human
							</span>
						</>
					)}
				</p>
			</div>
		</div>
	)
}

export default memo(ProfileCard)
