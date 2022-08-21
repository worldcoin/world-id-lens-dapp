import Head from 'next/head'
import favicon from '@images/logo.png'
import { APP_NAME } from '@/lib/consts'
import coverImg from '@images/cover.jpg'

const MetaTags = () => {
	const meta = {
		title: APP_NAME,
		image: coverImg.src,
		url: 'https://human.withlens.app',
		description:
			'Verify your Lens profile belongs to a unique human anonymously to improve recommendation algorithms (and get a cool badge).',
	}

	return (
		<Head>
			<title>{meta.title}</title>
			<meta name="title" content={meta.title} />
			<link rel="shortcut icon" href={favicon.src} />
			<meta name="description" content={meta.description} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={meta.url} />
			<meta property="og:title" content={meta.title} />
			<meta property="og:description" content={meta.description} />
			<meta property="og:image" content={meta.url + meta.image} />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={meta.url} />
			<meta property="twitter:title" content={meta.title} />
			<meta property="twitter:description" content={meta.description} />
			<meta property="twitter:image" content={meta.url + meta.image} />
		</Head>
	)
}

export default MetaTags
