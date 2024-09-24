/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "selector",
	theme: {
		extend: {
			colors: {
				"deep-indigo": "hsl(265.7 33.3 12.4)",
				"navy-blue": "hsl(255 55% 26%)",
				"dark-blue": "hsl(246.43 100% 5.49%)",
				eggshell: "hsl(72 29% 94%)",
			},
			fontFamily: {
				montserrat: ["Montserrat", "sans-serif"],
				hind: ["Hind", "sans-serif"],
			},
		},
	},
	plugins: [],
};
