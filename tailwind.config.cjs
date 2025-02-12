/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Roboto', 'Inter var', 'Inter', 'system-ui', 'sans-serif'],
				khmer: ['Koulen', 'Roboto', 'Inter var', 'Inter', 'system-ui', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
