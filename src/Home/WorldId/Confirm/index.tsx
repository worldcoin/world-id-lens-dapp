import { Button } from '@/common/Button'
import { Icon } from '@/common/Icon'
import { ModalDefault } from '@/common/ModalDefault'
import { memo, useEffect } from 'react'

export const Confirm = memo(function Confirm(props: { onConfirm: () => void; onCancel: () => void }) {
	// FIXME: connection simulate
	useEffect(() => {
		let timer: NodeJS.Timeout

		timer = setTimeout(() => {
			props.onConfirm()
		}, 2000)

		return () => {
			clearTimeout(timer)
		}
	}, [props])

	return (
		<ModalDefault>
			<div className="grid gap-y-16 text-center">
				<div className="px-4">
					<Icon className="mt-8 w-8 h-8 animate-spin" name="spinner" noMask />
					<p className="mt-12 text-24 font-semibold">Confirm Identity</p>
                    
					<p className="mt-4 font-rubik">
						Please confirm your identity inside your
						<br />
						Worldcoin mobile app
					</p>
				</div>

				<Button className="w-full" size="medium" variant="dark" onClick={props.onCancel}>
					Cancel
				</Button>
			</div>
		</ModalDefault>
	)
})
