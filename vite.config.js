// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
// })

import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    build: {
      outDir: "./wwwroot/app/",
      sourcemap: true,
    },
    server: {
      port: env.VITE_PORT,
    },
  };
});
