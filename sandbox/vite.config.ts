import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import DefineOptionsMacro from 'unplugin-vue-define-options/vite';

export default defineConfig({
  plugins: [vue(), DefineOptionsMacro()],
});
