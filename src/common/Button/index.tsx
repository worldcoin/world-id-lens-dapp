import { ComponentPropsWithoutRef, ElementType, memo } from 'react'
import cn from 'classnames'

interface ButtonInterface<C extends ElementType = 'button'> {
	variant?: 'default' | 'white' | 'dark' | 'semi-dark'
	size?: 'default' | 'large' | 'medium'
	disabled?: boolean
	uppercase?: boolean
	component?: C
}

export const Button = memo(function Button<C extends ElementType = 'button'>(
	props: ButtonInterface<C> & ComponentPropsWithoutRef<C>
) {
	const {
		className,
		component: Component = 'button',
		size = 'default',
		uppercase,
		variant = 'default',
		...restProps
	} = props

    const {disabled} = props

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
				{ 'opacity-20': props.disabled },
				{ 'px-8 py-5': size === 'medium' },
				{ 'px-8 py-6': size === 'large' },
				{ uppercase },
				className
			)}
			{...restProps}
		/>
	)
})
