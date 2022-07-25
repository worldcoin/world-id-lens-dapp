import { FC, useMemo } from 'react'
import { Profile } from '@/types/lens'

const LensAvatar: FC<{ profile: Profile; width: number; height: number; className?: string; srcOverride?: string }> = ({
	profile,
	width,
	height,
	className = '',
}) => {
	const avatarUrl = useMemo<string | null>(() => {
		if (!profile) return
		if (!profile?.picture) return `https://avatar.tobi.sh/${profile.handle}.png`

		if (profile.picture?.__typename == 'NftImage') return profile.picture?.uri
		return profile.picture.original.url
	}, [profile])

	return (
		<div className={`relative ${className}`} style={{ width, height }}>
			<img
				src={avatarUrl}
				alt={profile?.name ?? profile?.handle}
				width={width}
				height={height}
				className="rounded-full"
			/>
		</div>
	)
}

export default LensAvatar
