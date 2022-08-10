import { ComponentPropsWithoutRef, ElementType, FC, memo } from 'react'
import cn from 'classnames'

interface ButtonInterface<C extends ElementType = 'button'> {
	variant?: 'default' | 'white' | 'dark' | 'semi-dark'
	size?: 'default' | 'large' | 'medium'
	disabled?: boolean
	uppercase?: boolean
	component?: C
}

type Props<C extends ElementType = 'button'> = ButtonInterface<C> & ComponentPropsWithoutRef<C>

const Button: FC<Props> = ({
	disabled,
	className,
	uppercase,
	size = 'default',
	variant = 'default',
	component: Component = 'button',
	...restProps
}) => {
	return (
		<Component
			className={cn(
				{
					'bg-ffffff text-183c4a': variant === 'white',
					'hover:bg-183c4a hover:text-ffffff transition-colors': !disabled && variant === 'white',
					'bg-183c4a text-ffffff': variant === 'dark',
					'bg-183c4a/10': variant === 'semi-dark',
					'hover:opacity-70 transition-opacity': !disabled && (variant === 'dark' || variant === 'semi-dark'),
				},

				'font-medium rounded-full',
				{ 'opacity-20': disabled },
				{ 'px-8 py-5': size === 'medium' },
				{ 'px-8 py-6': size === 'large' },
				{ uppercase },
				className
			)}
			{...restProps}
			disabled={disabled}
		/>
	)
}

export default memo(Button)
