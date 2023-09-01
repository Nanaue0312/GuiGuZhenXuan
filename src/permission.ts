// 路由鉴权
import { router } from '@/router';
// 引入进度条
// @ts-ignore
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import useUserStore from '@/store/modules/user';
import pinia from '@/store/';
// 引入setting文件
import setting from '@/setting';
// 获取UserStore
let userStore = useUserStore(pinia);

// 全局前置守卫
/**
 * to 路由到哪
 * from 来自哪
 * next 放行函数
 */
// @ts-ignore
router.beforeEach(async (to, from, next) => {
	nprogress.start();
	let token = userStore.token;
	// 用户登录
	if (token) {
		// 用户已登录
		let user = userStore.user;
		if (!user.username) {
			try {
				await userStore.userInfo();
				console.log(to);

				next({ ...to });
			} catch (error) {
				userStore.logout();
				next({
					path: '/login',
					query: {
						redirect: to.path,
					},
				});
			}
		} else {
			next();
		}
	} else {
		if (to.path == '/login') {
			next();
		} else {
			next({
				path: '/login',
				query: {
					redirect: to.path,
				},
			});
		}
	}
});
// 全局后置守卫
// @ts-ignore
router.afterEach((to, from) => {
	document.title = `${setting.title} - ${to.meta.title}`;
	nprogress.done();
});
