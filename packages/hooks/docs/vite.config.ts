// https://vitejs.dev/config/
export default {
	build: {
		chunkSizeWarningLimit: 2000,
	},
	server: {
		hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
		// 服务配置
		port: 3500, // 类型： number 指定服务器端口;
		open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
		cors: false, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
		host: '0.0.0.0', // IP配置，支持从IP启动
	},
}
