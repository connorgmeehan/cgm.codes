/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            colors: {
                'cream': {
                    '50': '#fefde8',
                    '100': '#fffdd0',
                    '200': '#fff688',
                    '300': '#ffea44',
                    '400': '#fed811',
                    '500': '#eebf04',
                    '600': '#cd9401',
                    '700': '#a46904',
                    '800': '#87520c',
                    '900': '#734310',
                    '950': '#432305',
                },
            }
        },
	},
	plugins: [],
}
