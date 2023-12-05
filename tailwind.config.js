/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#4065DA",
				rhover1: "#2951A3",
				rhover2: "7291F5",
				rbody: "EBEBEF",
				rstroke: "646464",
			},
		},
	},
	plugins: [],
};
