import { createRouter, createWebHistory } from 'vue-router';
import { menuRoutes } from './routes';
// 通过vue-router插件实现模板路由配置
export const router = createRouter({
	history: createWebHistory(),
	routes: menuRoutes,
	// 滚动行为
	scrollBehavior() {
		return {
			left: 0,
			top: 0,
		};
	},
});
