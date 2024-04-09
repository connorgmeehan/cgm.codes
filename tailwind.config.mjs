/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
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
                'gray': {
                  DEFAULT: '#8B8467',
                  50: '#F8F8F6',
                  100: '#ECEAE6',
                  200: '#D5D0C6',
                  300: '#BDB6A5',
                  400: '#A59D85',
                  500: '#8B8467',
                  600: '#6E6951',
                  700: '#504E3C',
                  800: '#333226',
                  900: '#161610',
                  950: '#070705'
                },
                'corn': {
                  DEFAULT: '#9A8D58',
                  50: '#F9F9F5',
                  100: '#EFEFE3',
                  200: '#DBD9C0',
                  300: '#C6C29C',
                  400: '#B2A978',
                  500: '#9A8D58',
                  600: '#796C46',
                  700: '#594E33',
                  800: '#393020',
                  900: '#18140E',
                  950: '#080705'
                },
            }
        },
	},
	plugins: [],
}
