import Icon from './Icon'
import cn from 'classnames'
import { FC, memo } from 'react'
import WorldcoinIcon from './Icons/WorldcoinIcon'
import LensIcon from './Icons/LensIcon'
import { XIcon } from '@heroicons/react/solid'
import Link from 'next/link'

type Props = { className?: string; size?: 'default' | 'medium' | 'large' }

const Logo: FC<Props> = ({ className, size = 'default' }) => {
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
			<Link className="h-full" href="https://worldcoin.org" target="_blank">
				<WorldcoinIcon className="h-full aspect-square" />
			</Link>
			<XIcon className="h-1/3 justify-self-center aspect-square" />
			<Link className="h-full" href="https://lens.xyz" target="_blank">
				<LensIcon className="h-full aspect-square" />
			</Link>
		</div>
	)
}

export default memo(Logo)
