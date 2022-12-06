/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				primary: ["Playfair Display", "serif"],
				secondary: ["Manrope", "sans-serif"],
			},
			colors: {
				red: "#BB0A21",
				blue: "#5C80BC",
				darkblue: "#101935",
			},
		},
	},
	plugins: [],
}
