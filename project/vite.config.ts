import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";

// https://vite.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "http://127.0.0.1:8000",
				changeOrigin: true,
			},
		},
	},
	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
	},
	plugins: [react()],
});
