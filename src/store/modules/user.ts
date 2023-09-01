import { UserState } from './types/types';
// 创建用户相关的小仓库
import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token';
// 引入路由配置
import { menuRoutes, asyncRoutes, commonRoutes } from '@/router/routes';
import { router } from '@/router';
// 引入lodash
import cloneDeep from 'lodash/cloneDeep';
import {
	LoginFormData,
	LoginResponseData,
	UserInfoResponseData,
} from '@/api/user/type';

const filterAsyncRoutes = (asyncRoutes: any[], routes: any) => {
	return asyncRoutes.filter((item) => {
		if (routes.includes(item.name)) {
			if (item.children && item.children.length > 0) {
				item.children = filterAsyncRoutes(item.children, routes);
			}
			return true;
		}
	});
};

let useUserStore = defineStore('UserStore', {
	// 存储
	state: (): UserState => {
		return {
			token: GET_TOKEN(),
			menuRoutes, // 仓库生成菜单的数组（路由）
			user: {
				username: '',
				avatar: '',
			},
		};
	},
	// 异步|逻辑
	actions: {
		// 用户登录
		async userLogin(loginForm: LoginFormData) {
			let result: LoginResponseData = await reqLogin(loginForm);
			if (result.code === 200) {
				this.token = result.data;
				SET_TOKEN(result.data);

				// 保证async函数返回一个成功的promise
				return 'ok';
			} else {
				return Promise.reject(new Error(result.data));
			}
		},
		// 获取用户信息
		async userInfo() {
			let result: UserInfoResponseData = await reqUserInfo();
			if (result.code === 200) {
				this.user.username = result.data.name;
				this.user.avatar = result.data.avatar;
				// 获取当前用户的动态路由
				let userAsyncRoutes = filterAsyncRoutes(
					cloneDeep(asyncRoutes),
					result.data.routes
				);

				// 菜单的数据
				this.menuRoutes = [
					...menuRoutes,
					...(userAsyncRoutes as []),
					...commonRoutes,
				];
				// 注册路由
				[...userAsyncRoutes, ...commonRoutes].forEach((route) => {
					router.addRoute(route);
				});
				return 'ok';
			} else {
				return Promise.reject(new Error(result.message));
			}
		},
		async logout() {
			let result: any = await reqLogout();
			if (result.code === 200) {
				this.user.avatar = '';
				this.user.username = '';
				this.token = '';
				REMOVE_TOKEN();
				return 'ok';
			} else {
				return Promise.reject(new Error(result.message));
			}
		},
	},
	// 计算属性
	getters: {
		/**
		 * 判断当前登录时间
		 * @returns 登录时期（早上、上午、下午、晚上）
		 */
		getTime() {
			let message: string;
			const hours: number = new Date().getHours();
			if (hours < 9) {
				message = '早上好';
			} else if (hours < 12) {
				message = '上午好';
			} else if (hours < 18) {
				message = '下午好';
			} else {
				message = '晚上好';
			}
			return message;
		},
	},
});
export default useUserStore;
