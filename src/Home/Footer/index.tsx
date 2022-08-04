import { Icon } from '@/common/Icon'
import Link from 'next/link'
import { memo } from 'react'

export const Footer = memo(function Footer() {
	return (
		<div className="bg-183c4a text-ffffff mt-16 md:mt-0">
			<div className="grid grid-cols-container-wide px-4 md:px-12 py-10">
				<div className="col-start-2 grid gap-y-8 md:grid-flow-col justify-between">
					<p>
						Welcome to 🌿 Lens World ID Verification, a open source project. If you want to learn more,
						follow this link
					</p>

					<div className="grid md:grid-flow-col gap-x-12 gap-y-2">
						{/* FIXME: link */}
						<Link href="#!">
							<a className="flex items-center">
								<Icon className="h-4 w-4" name="lens" />
								<span className="ml-4">Learn more about Lens</span>
								<Icon className="ml-1.5 h-4 w-4" name="share" />
							</a>
						</Link>

						{/* FIXME: link */}
						<Link href="#!">
							<a className="flex items-center">
								<Icon className="h-4 w-4" name="worldcoin" />
								<span className="ml-4">Learn more about Lens</span>
								<Icon className="ml-1.5 h-4 w-4" name="share" />
							</a>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
})
