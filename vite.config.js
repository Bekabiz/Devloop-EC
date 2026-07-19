import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// Serve the repo's `assets/` folder as the public dir so
// `assets/projects/...` is available at `/projects/...`
export default defineConfig({
  plugins: [react()],
  publicDir: "assets",
})
