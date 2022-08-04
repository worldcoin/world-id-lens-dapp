import { Button } from '@/common/Button'
import { Icon } from '@/common/Icon'
import { memo } from 'react'

export const Verified = memo(function Verified(props: { onConfirm: () => void }) {
	return (
		<div className="grid gap-y-16 text-center">
			<div className='grid place-items-center px-6'>
				<span className="grid place-items-center w-[72px] h-[72px] bg-183c4a text-ffffff rounded-full">
					<Icon className="w-5 h-4" name="check" />
				</span>
				
				<p className='mt-8 text-24 font-semibold'>Account verified!</p>
				<p className='mt-4 font-rubik'>Congratulations! Your account has been <br /> successfully verified.</p>
			</div>

			<Button className="w-full" variant="dark" size="medium" onClick={props.onConfirm}>
				Take me to Polygonscan
			</Button>
		</div>
	)
})
