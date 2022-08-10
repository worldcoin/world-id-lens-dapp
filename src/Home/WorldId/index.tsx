import { memo, useState } from 'react'
import { useToggle } from '@/common/hooks/useToggle'
import { ModalBase } from '@/common/ModalBase'
import { Await } from './Await'
import { Confirm } from './Confirm'
import { Confirmed } from './Confirmed'

enum Screens {
	AWAIT,
	CONFIRM,
	CONFIRMED,
}

// FIXME: Implement WorldId
export const WorldId = memo(function WorldId(props: {
	modalState: ReturnType<typeof useToggle>
	onConnect: () => void
}) {
	const [screen, setScreen] = useState<Screens>(Screens['AWAIT'])

	return (
		<ModalBase modalState={props.modalState}>
			{screen === Screens['AWAIT'] && <Await onConnect={() => setScreen(Screens['CONFIRM'])} />}

			{screen === Screens['CONFIRM'] && (
				<Confirm
					onConfirm={() => setScreen(Screens['CONFIRMED'])}
					onCancel={() => setScreen(Screens['AWAIT'])}
				/>
			)}
			
			{screen === Screens['CONFIRMED'] && <Confirmed onContinue={props.onConnect} />}
		</ModalBase>
	)
})
