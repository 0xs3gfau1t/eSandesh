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
				primary: "#D9D9D9",
				red: "#BB0A21",
				blue: "#5C80BC",
				darkblue: "#101935",
				black1: "rgb(24, 24, 24)",
			},
		},
	},
	plugins: [],
}
