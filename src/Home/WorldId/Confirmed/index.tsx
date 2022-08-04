import { Button } from '@/common/Button'
import { Icon } from '@/common/Icon'
import { ModalDefault } from '@/common/ModalDefault'
import { memo } from 'react'

export const Confirmed = memo(function Confirmed(props: { onContinue: () => void }) {
	return (
		<ModalDefault>
			<div className="grid gap-y-16 text-center">
				<div className="grid place-items-center px-6">
					<span className="grid place-items-center w-[72px] h-[72px] bg-183c4a text-ffffff rounded-full">
						<Icon className="w-5 h-4" name="check" />
					</span>

					<p className="mt-8 text-24 font-semibold">Identity Confirmed!</p>

					<p className="mt-4 font-rubik">
						Yay! Your identity has been successfully confirmed.
						<br />
						You can start using your WorldID.
					</p>
				</div>

				<Button className="w-full" variant="dark" size="medium" onClick={props.onContinue}>
					Continue
				</Button>
			</div>
		</ModalDefault>
	)
})
