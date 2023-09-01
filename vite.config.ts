import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	// 读取当前运行环境的变量
	/**
	 * mode	当前运行的环境
	 * process.cwd()	获取index.html文件的根路径
	 */
	let env = loadEnv(mode, process.cwd());
	return {
		plugins: [
			vue(),
			createSvgIconsPlugin({
				// Specify the icon folder to be cached
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
				// Specify symbolId format
				symbolId: 'icon-[dir]-[name]',
			}),
			viteMockServe({
				localEnabled: command === 'serve',
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					javascriptEnabled: true,
					additionalData: '@import "./src/styles/variable.scss";',
				},
			},
		},
		// 代理服务器-解决跨域
		server: {
			proxy: {
				[env.VITE_APP_BASE_API]: {
					// 获取数据的服务器地址
					target: env.VITE_SERVER,
					// 是否开启跨域
					changeOrigin: true,
					// 是否重写请求路径
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
	};
});
