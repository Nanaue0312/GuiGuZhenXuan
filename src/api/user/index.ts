import type {
	LoginFormData,
	LoginResponseData,
	UserInfoResponseData,
} from '@/api/user/type';
// 统一管理项目中用户相关的接口
import request from '@/utils/request';
// 统一管理接口

enum Api {
	LOGIN_URL = '/admin/acl/index/login',
	USERINFO_URL = '/admin/acl/index/info',
	LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录接口
export const reqLogin = (data: LoginFormData) =>
	request.post<any, LoginResponseData>(Api.LOGIN_URL, data);

// 获取用户信息接口
export const reqUserInfo = () =>
	request.get<any, UserInfoResponseData>(Api.USERINFO_URL);
export const reqLogout = () => request.post<any, any>(Api.LOGOUT_URL);
