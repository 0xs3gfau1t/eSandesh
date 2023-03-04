import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv'
import { resolve } from 'path'

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    config({ path: resolve(__dirname, '.env') })
    return defineConfig({
        define: {
            'process.env': process.env,
        },
        plugins: [react()],
        commonjsOptions: {
            esmExternals: true,
        },
        server: {
            host: process.env.HOST || 'localhost',
            port: env.PORT || 8000,
            proxy: {
                '/api': {
                    target: `http://${
                        process.env.BACKEND_HOST || 'localhost'
                    }:${process.env.BACKEND_PORT || 4000}`,
                },
            },
        },
    })
}
