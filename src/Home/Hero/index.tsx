import { Logo } from '@/common/Logo'
import { memo, ReactNode } from 'react'

export const Hero = memo(function Hero(props: { children?: ReactNode }) {
	return (
		<div className="grid place-items-start gap-y-16">
			<Logo className="hidden md:flex" size="large" />

			<div className="text-18">
				<p>Worldcoin meets Lens</p>

				<h1 className="mt-4 text-32 md:text48">
					<span className="font-bold">Verify your Lens profile</span>
					<br /> belongs to a unique human.
				</h1>

				<p className="mt-6">
					With World ID you can anonymously prove you are a <br /> unique human doing something only once.
				</p>
			</div>

			{props.children}
		</div>
	)
})
