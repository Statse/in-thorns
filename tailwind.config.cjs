/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: [
		'text-it-orange', 'text-it-orange-light', 'text-it-red', 'text-it-red-light',
		'text-it-green', 'text-it-green-light', 'text-it-cream', 'text-wh-violet',
		'text-wh-violet-light',
		'border-it-orange', 'border-it-orange/30', 'border-it-red', 'border-it-red/30',
		'border-it-green', 'border-it-green/30', 'border-wh-violet', 'border-wh-violet/30',
		'bg-it-orange', 'bg-it-red', 'bg-it-green', 'bg-it-ink', 'bg-wh-violet',
		'bg-wh-violet-deep', 'bg-wh-bruise',
		'bg-it-orange/20', 'bg-it-red/20', 'bg-wh-violet/20',
		'hover:text-it-orange', 'hover:border-it-orange', 'hover:bg-it-orange',
		'hover:text-wh-violet', 'hover:border-wh-violet',
		// Legacy ew- classes (gallery pages still use them)
		'text-ew-orange', 'text-ew-red', 'text-ew-green', 'text-ew-green-light',
		'border-ew-orange', 'border-ew-red', 'border-ew-green', 'border-ew-green-light',
		'border-ew-orange/30', 'border-ew-red/30', 'border-ew-green/30',
		'bg-ew-orange', 'bg-ew-red', 'bg-ew-green', 'bg-ew-orange/20', 'bg-ew-red/20',
		'bg-ew-green/20', 'bg-ew-orange/80', 'bg-ew-red/80', 'bg-ew-green/80',
		'hover:border-ew-orange', 'hover:border-ew-red', 'hover:bg-ew-orange',
		'hover:bg-ew-red', 'hover:bg-ew-green', 'hover:text-ew-orange', 'hover:text-ew-red',
		'group-hover:bg-ew-orange', 'group-hover:bg-ew-red', 'group-hover:text-ew-orange',
	],
	theme: {
		extend: {
			colors: {
				// New design system palette
				'it-orange': {
					DEFAULT: '#FF6B35',
					light:   '#FF8C42',
					dark:    '#FF4500',
				},
				'it-red': {
					DEFAULT: '#D32F2F',
					light:   '#FF5252',
					dark:    '#B71C1C',
				},
				'it-green': {
					DEFAULT: '#0D7377',
					light:   '#14FFEC',
					dark:    '#1A4D2E',
				},
				'it-cream':  '#F5F5DC',
				'it-ink':    '#0A0A0A',
				'wh-violet': {
					DEFAULT: '#9D52C2',
					light:   '#C08ADE',
					dark:    '#6E2E96',
					deep:    '#2A0F3F',
				},
				'wh-bruise': '#3D1E5C',
				// Legacy ew- palette (kept for existing gallery pages)
				'ew-orange': { DEFAULT: '#FF6B35', light: '#FF8C42', dark: '#FF4500' },
				'ew-red':    { DEFAULT: '#D32F2F', light: '#FF5252', dark: '#B71C1C' },
				'ew-green':  { DEFAULT: '#0D7377', light: '#14FFEC', dark: '#1A4D2E', forest: '#2C5F2D' },
				'ew-cream':  '#F5F5DC',
				'wh-purple': { DEFAULT: '#9D52C2', light: '#C08ADE', dark: '#6E2E96' },
			},
			fontFamily: {
				display: ['Anton', 'Impact', 'sans-serif'],
				body:    ['Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
				mono:    ['JetBrains Mono', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
				// Legacy
				sans:   ['Archivo', 'Roboto', 'Inter', 'system-ui', 'sans-serif'],
				koulen: ['Anton', 'Roboto', 'Inter', 'system-ui', 'sans-serif'],
			},
			animation: {
				'ticker':      'ticker-scroll 42s linear infinite',
				'grain':       'grain 8s steps(10) infinite',
				'glitch':      'glitch 1s linear infinite',
				'glitch-skew': 'glitch-skew 2s ease-in-out infinite',
				'scan':        'scan 8s linear infinite',
			},
			keyframes: {
				'ticker-scroll': {
					from: { transform: 'translateX(0)' },
					to:   { transform: 'translateX(-50%)' },
				},
				grain: {
					'0%, 100%': { transform: 'translate(0, 0)' },
					'10%':      { transform: 'translate(-2%, -3%)' },
					'30%':      { transform: 'translate(1%, 2%)' },
					'50%':      { transform: 'translate(-1%, 1%)' },
					'70%':      { transform: 'translate(2%, -1%)' },
					'90%':      { transform: 'translate(-2%, 2%)' },
				},
				glitch: {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' },
				},
				'glitch-skew': {
					'0%, 100%': { transform: 'skew(0deg)' },
					'10%': { transform: 'skew(-2deg)' },
					'20%': { transform: 'skew(2deg)' },
					'30%': { transform: 'skew(-2deg)' },
					'40%': { transform: 'skew(2deg)' },
					'50%': { transform: 'skew(0deg)' },
				},
				scan: {
					'0%, 100%': { transform: 'translateY(-100%)' },
					'50%': { transform: 'translateY(100%)' },
				},
			},
		},
	},
	plugins: [],
}
