const plugin = require('tailwindcss/plugin')

const mirrorHexColors = colors =>
	Object.fromEntries(
		colors.map((color, index) => {
			if (!/#[a-f0-9]{6}/.test(color)) {
				throw new Error(
					'All colors should be lowercase hexadecimal strings 7 characters long with "#" sign at the beginning'
				)
			}

			if (colors.indexOf(color) !== index) {
				throw new Error('Colors should be unique')
			}

			if (colors[index - 1] > color) {
				throw new Error('Colors should be sorted alphabetically')
			}

			return [color.substring(1), color]
		})
	)

const commonGridTemplate = {
	'fr/auto': '1fr auto',
	'auto/fr': 'auto 1fr',
	'auto/fr/auto': 'auto 1fr auto',
	'auto/auto/fr': 'auto auto 1fr',
}

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: mirrorHexColors([
				'#000000',
				'#183c4a',
				'#202124',
				'#217237',
				'#4940e0',
				'#7c74fb',
				'#858494',
				'#bbbec7',
				'#c8d7da',
				'#dce7e9',
				'#dde7ea',
				'#ebf1f2',
				'#f5f8f9',
				'#ff6848',
				'#ffffff',
			]),

			fontFamily: {
				sora: ['Sora', 'sans-serif'],
				rubik: ['Rubik', 'sans-serif'],
			},

			fontSize: {
				72: ['calc(72 * 1rem / 16)', { lineHeight: 'calc(86 * 1rem / 16)' }],
				64: ['calc(64 * 1rem / 16)', { lineHeight: 'calc(76.8 * 1rem / 16)' }],
				48: ['calc(48 * 1rem / 16)', { lineHeight: 'calc(57.6 * 1rem / 16)' }],
				42: ['calc(40 * 1rem / 16)', { lineHeight: 'calc(49 * 1rem / 16)' }],
				40: ['calc(40 * 1rem / 16)', { lineHeight: 'calc(48 * 1rem / 16)' }],
				36: ['calc(32 * 1rem / 16)', { lineHeight: 'calc(38.5 * 1rem / 16)' }],
				32: ['calc(32 * 1rem / 16)', { lineHeight: 'calc(36 * 1rem / 16)' }],
				24: ['calc(24 * 1rem / 16)', { lineHeight: 'calc(28.8 * 1rem / 16)' }],
				20: ['calc(20 * 1rem / 16)', { lineHeight: 'calc(23.7 * 1rem / 16)' }],
				18: ['calc(18 * 1rem / 16)', { lineHeight: 'calc(21.6 * 1rem / 16)' }],
				16: ['calc(16 * 1rem / 16)', { lineHeight: 'calc(19.2 * 1rem / 16)' }],
				15: ['calc(15 * 1rem / 16)', { lineHeight: 'calc(17.78 * 1rem / 16)' }],
				14: ['calc(14 * 1rem / 16)', { lineHeight: 'calc(18 * 1rem / 16)' }],
				13: ['calc(13 * 1rem / 16)', { lineHeight: 'calc(15.6 * 1rem / 16)' }],
				11: ['calc(11 * 1rem / 16)', { lineHeight: 'calc(13.4 * 1rem / 16)' }],
			},

			gridTemplateColumns: {
				container: '1fr minmax(0, calc(328 * .25rem)) 1fr',
				'container-wide': '1fr minmax(0, calc(353 * .25rem)) 1fr',
				...commonGridTemplate,
			},

			gridTemplateRows: {
				...commonGridTemplate,
			},

			borderRadius: {
				64: '64px',
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('not-last', '&:not(:last-child)')
		}),
	],
}
