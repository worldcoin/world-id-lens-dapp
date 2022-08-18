import Modal from './Modal'
import { FC, memo, useEffect, useRef } from 'react'
import LensAvatar from '../LensAvatar'
import { Profile } from '@/types/lens'
import confetti from 'canvas-confetti'
import ProfileCard from '../ProfileCard'
import { useToggle } from '@/hooks/useToggle'
import VerifiedIcon from '../Icons/VerifiedIcon'

type Props = {
	txHash: string
	profile: Profile
	modalState: ReturnType<typeof useToggle>
}

const SuccessModal: FC<Props> = ({ profile, txHash, modalState }) => {
	const confettiCanvas = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		if (!modalState.isOn || !confettiCanvas.current) return

		shotConfetti()
	}, [modalState.isOn])

	if (!txHash) return

	const shotConfetti = () => {
		if (!confettiCanvas.current) return

		const end = Date.now() + 1 * 1000
		const colors = ['#4DEAFF', '#894DFF', '#E14DFF']
		const confettiSource = confetti.create(confettiCanvas.current, { resize: true, disableForReducedMotion: true })

		const frame = () => {
			confettiSource({ particleCount: 3, angle: 120, spread: 55, colors: colors, shapes: ['circle'] })
			confettiSource({ particleCount: 3, angle: 60, spread: 55, colors: colors, shapes: ['circle'] })

			if (Date.now() < end) requestAnimationFrame(frame)
		}

		frame()
	}

	return (
		<Modal
			backdrop={<canvas className="w-full h-full" ref={confettiCanvas} />}
			modalState={modalState}
			header={
				<div className="flex gap-x-1.5 p-2 pr-4 bg-183c4a/[5%] rounded-full ">
					<div className="relative w-8 h-8">
						<LensAvatar className="w-8 h-8 rounded-full" profile={profile} />
						<span className="p-0.5 rounded-full absolute -bottom-1 -right-1 grid transition bg-[#F4F5F6]">
							<VerifiedIcon className="w-3 h-3" />
						</span>
					</div>

					<div className="font-rubik">
						<p className="text-14">{profile.name}</p>
						<p className="text-11 opacity-50">@{profile.handle}</p>
					</div>
				</div>
			}
		>
			<div className="grid gap-y-8">
				<div className="max-w-[440px] grid gap-y-4">
					<div className="grid place-items-center gap-y-6">
						<h3 className="text-24 px-6">Your profile is now verified!</h3>
						<p className="text-12 font-rubik text-center px-6">
							Supported frontends will now show your profile as verified. Thanks for{' '}
							<span className="text-green-500 font-medium">making Lens more human</span>!
						</p>

						<ProfileCard verified className="w-full rounded-2xl border border-dfe2e3" profile={profile} />
					</div>
				</div>
			</div>
		</Modal>
	)
}

export default memo(SuccessModal)
