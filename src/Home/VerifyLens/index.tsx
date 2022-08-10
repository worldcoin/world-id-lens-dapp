import { memo } from 'react'
import { ModalBase } from '@/common/ModalBase'
import { Profile } from '@/common/types/profile'
import { useToggle } from '@/common/hooks/useToggle'
import { ModalDefault } from '@/common/ModalDefault'
import { ProfileCard } from '@/common/ProfileCard'
import { Icon } from '@/common/Icon'
import { Button } from '@/common/Button'
import cn from 'classnames'

export const VerifyLens = memo(function VerifyLens(props: {
	modalState: ReturnType<typeof useToggle>
	onRemoveVerify: () => void
	onVerify: () => void
	profile: Profile
}) {
	if (!props.profile) {
		return
	}

	return (
		<ModalBase modalState={props.modalState}>
			<ModalDefault
				header={
					<div className="flex gap-x-1 p-2 pr-4 bg-183c4a/[15%] rounded-full ">
						{/* FIXME: use next/image on production */}
						<img className="w-8 h-8 rounded-full" src={props.profile.avatar} alt={props.profile.name} />

						<div className="font-rubik">
							<p className="text-14">{props.profile.name}</p>
							<p className="text-11 opacity-50">{props.profile.login}</p>
						</div>
					</div>
				}
			>
				<div className="grid gap-y-8">
					<div className="max-w-[440px] grid gap-y-4">
						<div className="grid place-items-center gap-y-6">
							<p className="text-24 px-6">
								Verify your <span className="text-4940e0">Lens profile</span> belongs to a human with
								World ID
							</p>

							{!props.profile.__leansVerified && (
								<div
									className={cn(
										'relative rounded-xl overflow-hidden p-px bg-gradient-to-r from-ff6848 to-4940e0'
									)}
								>
									<div className="flex items-center px-4 py-2 bg-ffffff rounded-xl">
										<span className="w-5 h-5 grid place-items-center bg-217237 rounded-full">
											<Icon className="text-ffffff h-1.5 w-2" name="check" />
										</span>

										<span className="ml-2 text-14 font-semibold">I’m a unique person</span>
										<Icon className="w-10 h-10 ml-4" name="worldId" noMask />
									</div>
								</div>
							)}

							<ProfileCard className="w-full rounded-2xl border border-dfe2e3" profile={props.profile} />
						</div>
						
						{!props.profile.__leansVerified && (
							<p className="font-rubik text-858494">
								Looks like you already verified a Lens profile! If you continue, the badge from the
								previous profile will be removed.
							</p>
						)}
					</div>

					{!props.profile.__leansVerified && (
						<Button className="w-full" variant="dark" size="medium" onClick={props.onVerify}>
							Verify {props.profile.login}
						</Button>
					)}

					{props.profile.__leansVerified && (
						<Button variant="semi-dark" size="medium" onClick={props.onRemoveVerify}>
							Remove verification
						</Button>
					)}
				</div>
			</ModalDefault>
		</ModalBase>
	)
})
