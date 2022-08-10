import { Button } from '@/common/Button'
import { Icon } from '@/common/Icon'
import { Fragment, memo, useEffect } from 'react'

export const Verify = memo(function Verify(props: { onVerify: () => void; onCancel: () => void }) {
	useEffect(() => {
		let timer: NodeJS.Timeout

		timer = setTimeout(props.onVerify, 2000)

		return () => {
			clearTimeout(timer)
		}
	}, [props])

	return (
		<div className="grid gap-y-16 text-center">
			<div className="px-4">
				<Icon className="mt-8 w-8 h-8 animate-spin" name="spinner" noMask/>
				<p className="mt-12 text-24 font-semibold">Verifying your account...</p>

				<p className="mt-4 font-rubik">
					Please wait while account is being verified. <br />
                    This normally only takes a few seconds.
				</p>
			</div>

			<Button className="w-full" size="medium" variant="dark" onClick={props.onCancel}>
				Cancel
			</Button>
		</div>
	)
})
