import cn from 'classnames'
import { memo } from 'react'
import { Icon } from '@/common/Icon'

export const Logo = memo(function Logo(props: { className?: string; size?: 'default' | 'medium' | 'large' }) {
	const { size = 'default', className } = props

	return (
		<div
			className={cn(
				'flex items-center text-183c4a',
				{
					'h-6 gap-x-2': size === 'default',
					'h-16 gap-x-4': size === 'large',
				},
				className
			)}
		>
			<Icon className="h-full aspect-square" name="worldcoin" />
			<Icon className="h-1/3 justify-self-center aspect-square" name="cross" />
			<Icon className="h-full aspect-square" name="lens" />
		</div>
	)
})
