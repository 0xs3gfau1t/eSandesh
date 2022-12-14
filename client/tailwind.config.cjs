/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				// for english language, use these two
				// primary: ["Playfair Display", "serif"],
				// secondary: ["Manrope", "sans-serif"],
				english: ["Manrope", "sans-serif"],
				primary: ["Vesper Libre", "serif"],
				secondary: ["Vesper Libre", "serif"],
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
