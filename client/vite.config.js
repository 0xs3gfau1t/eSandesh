import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "")
	console.log(env.PORT)
	return defineConfig({
		plugins: [react()],
		server: {
			open: true,
			port: env.PORT || 8000,
		},
	})
}
