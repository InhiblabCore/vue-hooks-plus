const path = require('path')
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default {
	plugins: [dts()],
	build: {
		minify: true,
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'vue-hooks-plus',
			formats: ['es', 'cjs'],
			fileName: (format) => {
				return `js/index.${format}.js`
			},
		},
		chunkSizeWarningLimit: 1000,

		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ['vue'],

			output: {
				// manualChunks: (id) => {
				// 	if (id.includes('node_modules')) {
				// 		return id
				// 			.toString()
				// 			.split('node_modules/')[1]
				// 			.split('/')[0]
				// 			.toString()
				// 	}
				// },
				// entryFileNames: 'js/[name].[hash].js',
				// chunkFileNames: 'js/[name].[hash].js',
				// assetFileNames: '[ext]/[name].[hash].[ext]',

				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
}
