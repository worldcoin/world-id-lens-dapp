import { Logo } from '@/common/Logo'
import { shortHash } from '@/common/utils/short-hash'
import { memo } from 'react'

export const Header = memo(function Header(props: { hash: string }) {
	return (
		<div className="grid grid-cols-container-wide px-4 md:px-8 py-2">
			<div className="col-start-2 min-h-[42px] flex justify-between items-center">
				<Logo />

				{props.hash && (
					<span className="px-4 py-3 rounded-full bg-183c4a text-ffffff text-14">
						{shortHash(props.hash)}
					</span>
				)}
			</div>
		</div>
	)
})
