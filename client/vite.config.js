import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";
import { resolve } from "path";

export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	console.log(env.PORT);
	config({ path: resolve(__dirname, ".env") });
	return defineConfig({
		define: {
			"process.env": process.env,
		},
		plugins: [react()],
		server: {
			host: "localhost",
			open: true,
			port: env.PORT || 8000,
			proxy: {
				"/api": {
					target: "http://localhost:4000",
				},
			},
		},
	});
};
