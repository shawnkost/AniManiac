/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"deep-indigo": "hsl(265.7 33.3 12.4)",
			},
			fontFamily: {
				montserrat: ["Montserrat", "sans-serif"],
			},
		},
	},
	plugins: [],
};
