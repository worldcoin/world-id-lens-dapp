import { Button } from '@/common/Button'
import { Icon } from '@/common/Icon'
import { shortHash } from '@/common/utils/short-hash'
import cn from 'classnames'
import { memo } from 'react'
import { Human } from './types/human'

const humans: Array<Human> = [
	{
		login: 'older.lens',
		name: 'older.lens',
		hash: '0x9340dAscG0ewsCgsWEgdsds123213Dsc1aDd',
		following: '1,694',
		followers: '5.9K',
		content: <p>Surfing into blockchain world never be the same!</p>,
	},
	{
		login: 'm1guelpf.lens',
		avatar: 'https://avatars.githubusercontent.com/u/23558090?v=4',
		name: 'Miguel Piedrafita',
		hash: '0x9340dAscG0ewsCgsWEgDsc1aDd',
		following: '1,694',
		followers: '30.6K',
		content: (
			<p>
				20. Serial builder, purple-haired developer <span className="text-4940e0">@worldcoin</span>, core{' '}
				<span className="text-4940e0">@ConstitutionDAO</span>. I tweet about ideas, c...
			</p>
		),
	},
	{
		login: 'evattsatrojanz.lens',
		name: 'Satrojanz',
		hash: '0x9340dAscG0ewsCgsWEgDsc1aDd',
		following: 824,
		followers: '2,925',
		content: (
			<p>
				We are on a mission to onboard people to crypto - and help them find the coolest products || Community
				membership...
			</p>
		),
	},
]

export const VerifiedHumans = memo(function VerifiedHumans(props: { className?: string }) {
	return (
		<div className={cn('grid gap-y-4', props.className)}>
			<div className="flex justify-between text-14 font-medium">
				<span className="opacity-40 uppercase">verified humans on lens</span>

				{/* FIXME: implement real refresh */}
				<Button className={cn('flex items-center gap-x-2 hover:opacity-70 transition-opacity uppercase')}>
					refresh <Icon className="w-3 h-3" name="reload" />
				</Button>
			</div>

			<div className="grid gap-y-4">
				{humans.map((human, index) => (
					<div className="relative bg-ffffff rounded-2xl border border-dce7e9 p-8" key={index}>
						<div className="grid gap-y-4 md:grid-cols-auto/fr gap-x-8">
							<span
								className={cn(
									'relative h-24 w-24 p-8 text-ffffff bg-183c4a border',
									'border-c8d7da rounded-full overflow-hidden'
								)}
							>
								{/* FIXME: use next/image on production */}
								{human.avatar ? (
									<img src={human.avatar} alt={human.name} className="absolute inset-0" />
								) : (
									<Icon className="w-full h-full" name="lens" />
								)}
							</span>

							<div className="grid gap-y-3 text-14">
								<div className="grid gap-y-0.5">
									<div className="flex gap-x-1">
										<span className="text-20 font-semibold">{human.name}</span>
										<Icon className="w-4 h-4" name="check-badge" noMask />
									</div>

									<div className="flex items-center">
										<span className="opacity-50">@{human.login}</span>
										<span className="opacity-50">&nbsp;&bull;&nbsp;</span>

										<span
											className={cn(
												'bg-gradient-to-b from-4940e0 to-7c74fb',
												'bg-clip-text text-transparent'
											)}
										>
											Verified Human
										</span>
									</div>
								</div>

								<div className="text-12 font-rubik">{human.content}</div>

								<div className="flex gap-x-6">
									<div>
										<span className="font-bold">{human.following}</span>{' '}
										<span className="text-12 opacity-50">Following</span>
									</div>

									<div>
										<span className="font-bold">{human.followers}</span>{' '}
										<span className="text-12 opacity-50">Followers</span>
									</div>
								</div>
							</div>
						</div>

						<span className="absolute top-3 right-3 bg-ebf1f2 rounded-lg p-2.5">
							{shortHash(human.hash)}
						</span>
					</div>
				))}
			</div>
		</div>
	)
})
