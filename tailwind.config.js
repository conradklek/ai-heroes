export default {
	content: ["./src/**/*.{html,js,ts,svelte}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				mono: ["Berkeley Mono", "monospace"],
				serif: ["LibreCaslonCondensed", "serif"]
			},
			"animation": {
				"border-width": "border-width 3s infinite alternate"
			},
			"keyframes": {
				"border-width": {
					"from": {
						"width": "10px",
						"opacity": "0"
					},
					"to": {
						"width": "100px",
						"opacity": "1"
					}
				}
			}
		}
	},
	plugins: [require("@tailwindcss/forms")],
}
