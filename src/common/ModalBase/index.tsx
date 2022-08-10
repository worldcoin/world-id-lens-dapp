import { useToggle } from '@/common/hooks/useToggle'
import { memo, ReactNode, useCallback, useEffect } from 'react'

export const ModalBase = memo(function ModalBase(props: {
	modalState: ReturnType<typeof useToggle>
	children?: ReactNode
	dismissible?: boolean
}) {
	const dismissible = props.dismissible ?? true

	// ANCHOR: remove scrollbar if show
	useEffect(() => {
		document.documentElement.style.overflow = props.modalState.isOn ? 'hidden' : ''
		return () => {
			document.documentElement.style.overflow = ''
		}
	}, [props.modalState.isOn])

	// ANCHOR: bind escape for close modal
	useEffect(() => {
		if (!dismissible) {
			return
		}

		const handlePressEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				props.modalState.toggleOff()
			}
		}

		window.addEventListener('keyup', handlePressEsc)

		return () => {
			window.removeEventListener('keyup', handlePressEsc)
		}
	}, [dismissible, props.modalState])

	const handleClickOverlay = useCallback(() => dismissible && props.modalState.toggleOff(), [dismissible, props.modalState])

	if (!props.modalState.isOn) {
		return null
	}

	return (
		<div className="fixed inset-0 z-100">
			<div className='absolute inset-0 grid place-items-center z-10 pointer-events-none'>
				<div className='pointer-events-auto'>
					{props.children}
				</div>
			</div>
			
			<div className="absolute inset-0 z-0 bg-202124/50" onClick={handleClickOverlay}></div>
		</div>
	)
})
