import Link from 'next/link'
import { memo } from 'react'
import LensIcon from './Icons/LensIcon'
import WorldcoinIcon from './Icons/WorldcoinIcon'
import { ExternalLinkIcon } from '@heroicons/react/outline'

const Footer = () => (
	<div className="bg-183c4a text-ffffff mt-16 md:mt-0">
		<div className="px-4 md:px-10 py-10">
			<div className="flex flex-col md:flex-row space-y-6 md:space-y-0 items-center justify-between">
				<p>🌿 🪩 Lens World ID Verification, an <a href="https://github.com/worldcoin/world-id-lens-dapp" target="_blank" rel="noopener noreferrer">open source project</a> from Worldcoin.</p>

				<div className="flex flex-col-reverse md:flex-row items-center gap-x-12 gap-y-2">
					<Link href="https://lens.xyz" target="_blank" className="flex items-center">
						<LensIcon className="h-4 w-4" />
						<span className="ml-2">Learn more about Lens</span>
						<ExternalLinkIcon className="ml-1.5 h-4 w-4" />
					</Link>

					<Link href="https://id.worldcoin.org" target="_blank" className="flex items-center">
						<WorldcoinIcon className="h-4 w-4" />
						<span className="ml-2">Learn more about Worldcoin</span>
						<ExternalLinkIcon className="ml-1.5 h-4 w-4" />
					</Link>
				</div>
			</div>
		</div>
	</div>
)

export default memo(Footer)
