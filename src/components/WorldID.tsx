import worldID, { AppProps, VerificationResponse } from '@worldcoin/id'
import { FC, memo, useCallback, useLayoutEffect, useRef } from 'react'

const WorldID: FC<{ signal: string; className?: string; onConfirm: (proof: VerificationResponse) => void }> = ({
	signal,
	className,
	onConfirm,
}) => {
	const worldIdReference = useRef<HTMLDivElement>(null)

	const armWLDID = useCallback(() => {
		worldID.enable().then(onConfirm, armWLDID)
	}, [onConfirm])

	useLayoutEffect(() => {
		const options = {
			signal,
			enable_telemetry: true,
			action_id: process.env.NEXT_PUBLIC_WLD_SIGNAL as string,
		} as AppProps

		if (worldID.isInitialized()) worldID.update(options)
		else worldID.init(worldIdReference.current as HTMLElement, options)

		if (!worldID.isEnabled()) armWLDID()
	}, [signal, armWLDID])

	return <div className={className} ref={worldIdReference} />
}

export default memo(WorldID)
