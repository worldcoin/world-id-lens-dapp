import { Profile } from '@/common/types/profile'
import cn from 'classnames'
import Image from 'next/image'
import { Fragment, memo } from 'react'
import { Icon } from '@/common/Icon'

export const ProfileCard = memo(function ProfileCard(props: {
	className?: string
	onSelect?: (id: string) => void
	profile: Profile
	selected?: boolean
}) {
	return (
		<div
			className={cn(
				'grid grid-cols-auto/fr gap-x-4 items-center p-5 cursor-pointer',
				'not-last:border-b not-last:border-dfe2e3',
				'transition-colors',
				{
					'bg-dde7ea/30': props.selected,
					'hover:bg-dde7ea/10': !props.selected,
				},
				props.className
			)}
			onClick={() => props.onSelect?.(props.profile.id)}
		>
			<span className="relative w-[80px] h-[80px]">
				<img className="absolute inset-0 rounded-full" src={props.profile.avatar} alt={props.profile.name} />

				<span className="p-1 bg-f5f8f9 rounded-full absolute bottom-0 right-0 grid">
					<Image src={props.profile.socialLogo} alt="social" width={20} height={20} />
				</span>
			</span>

			<div className="grid gap-y-0.5">
				<div className="flex gap-x-1">
					<p className="font-semibold text-20">{props.profile.name}</p>
					<Icon className="w-4 h-4" name="check-badge" noMask />
				</div>

				<p className="text-14 text-183c4a/50">
					<span>{props.profile.login}</span>

					{props.profile.verified && (
						<Fragment>
							<span>&nbsp;&bull;&nbsp;</span>

							<span
								className={cn(
									'bg-gradient-to-b from-4940e0 to-7c74fb text-transparent',
									'bg-clip-text'
								)}
							>
								Verified Human
							</span>
						</Fragment>
					)}
				</p>
			</div>
		</div>
	)
})
