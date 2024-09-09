/*
 * @Author: shufei.han
 * @Date: 2024-09-09 12:25:29
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 15:14:35
 * @FilePath: \xiaoyuanbao-names\vite.config.ts
 * @Description: 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs',
  }
  ,
  base: './'
})
