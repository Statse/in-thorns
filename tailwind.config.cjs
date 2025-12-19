/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	safelist: [
		// Gallery color classes for dynamic usage
		'text-ew-orange',
		'text-ew-red',
		'text-ew-green-light',
		'border-ew-orange',
		'border-ew-red',
		'border-ew-green-light',
		'bg-ew-orange',
		'bg-ew-red',
		'bg-ew-green-light',
		'bg-ew-orange/20',
		'bg-ew-red/20',
		'bg-ew-green-light/20',
		'border-ew-orange-light',
		'border-ew-red-light',
		'hover:bg-ew-orange',
		'hover:bg-ew-red',
		'hover:bg-ew-green-light',
	],
	theme: {
		extend: {
			colors: {
				// Exit Wounds color palette
				'ew-orange': {
					DEFAULT: '#FF6B35',
					light: '#FF8C42',
					dark: '#FF4500',
				},
				'ew-red': {
					DEFAULT: '#D32F2F',
					light: '#FF5252',
					dark: '#B71C1C',
				},
				'ew-green': {
					DEFAULT: '#0D7377',
					light: '#14FFEC',
					dark: '#1A4D2E',
					forest: '#2C5F2D',
				},
				'ew-cream': '#F5F5DC',
			},
			fontFamily: {
				sans: ['Roboto', 'Inter var', 'Inter', 'system-ui', 'sans-serif'],
				khmer: ['Koulen', 'Roboto', 'Inter var', 'Inter', 'system-ui', 'sans-serif'],
			},
			animation: {
				'glitch': 'glitch 1s linear infinite',
				'glitch-skew': 'glitch-skew 2s ease-in-out infinite',
				'scan': 'scan 8s linear infinite',
			},
			keyframes: {
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
