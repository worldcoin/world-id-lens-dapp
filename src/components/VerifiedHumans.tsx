import cn from 'classnames'
import { FC, memo } from 'react'
import { Profile } from '@/types/lens'
import { shortAddr } from '@/lib/utils'
import VerifiedIcon from './Icons/VerifiedIcon'
import LensAvatar from './LensAvatar'

export const VerifiedHumans: FC<{ humans: Profile[]; className?: string }> = ({ humans, className }) => (
	<div className={cn('grid gap-y-4', className)}>
		<div className="flex justify-between text-14 font-medium">
			<span className="opacity-40 uppercase">Verified humans on Lens</span>
		</div>

		<div className="grid gap-y-4">
			{humans.map((profile, index) => (
				<div className="relative bg-ffffff rounded-2xl shadow p-8" key={index}>
					<div className="flex items-center gap-x-8">
						<span className="relative h-24 w-24 p-8 flex-shrink-0">
							<LensAvatar profile={profile} className="absolute inset-0 rounded-full border" />
							{profile.onChainIdentity.worldcoin.isHuman && (
								<span className={`p-1 rounded-full absolute bottom-0 right-0 grid transition bg-white`}>
									<VerifiedIcon className="w-5 h-5" />
								</span>
							)}
						</span>

						<div className="grid gap-y-3 text-14">
							<div className="grid gap-y-0.5">
								<div className="flex items-center gap-x-1">
									<span className="text-20 font-semibold">{profile.name}</span>
								</div>

								<div className="flex items-center">
									<span className="opacity-50">@{profile.handle}</span>
									<span className="opacity-50">&nbsp;&bull;&nbsp;</span>

									{profile.onChainIdentity.worldcoin.isHuman && (
										<span className="bg-gradient-to-b from-4940e0 to-7c74fb bg-clip-text text-transparent">
											Verified Human
										</span>
									)}
								</div>
							</div>

							<div className="text-12 font-rubik">{profile.bio}</div>

							<div className="flex gap-x-6">
								<div>
									<span className="font-bold">{profile.stats.totalFollowing}</span>{' '}
									<span className="text-12 opacity-50">Following</span>
								</div>

								<div>
									<span className="font-bold">{profile.stats.totalFollowers}</span>{' '}
									<span className="text-12 opacity-50">Followers</span>
								</div>
							</div>
						</div>
					</div>

					<a
						href={`https://polygonscan/address/${profile.ownedBy}`}
						className="absolute text-sm top-3 right-3 bg-ebf1f2 rounded-lg p-1.5"
					>
						{shortAddr(profile.ownedBy)}
					</a>
				</div>
			))}
		</div>
	</div>
)

export default memo(VerifiedHumans)
