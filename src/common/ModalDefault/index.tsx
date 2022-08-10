import { memo, ReactNode } from 'react'
import { Logo } from '@/common/Logo'

export const ModalDefault = memo(function ModalDefault(props: { children: ReactNode, header?: ReactNode }) {
	return (
		<div className="w-[calc(100vw_-_8px)] md:w-[500px] bg-ffffff rounded-2xl">
			<div className="flex items-center justify-between py-8 px-6 border-b border-bbbec7/30">
				<Logo className='h-6'/>
                {props.header}
			</div>
            
			<div className="p-8">{props.children}</div>
		</div>
	)
})
