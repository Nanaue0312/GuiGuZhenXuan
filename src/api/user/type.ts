// 定义用户接口类型
// 用户登录接口
export interface LoginFormData {
	username: string;
	password: string;
}
// 定义全部接口都拥有的类型
export interface ResponseData {
	code: number;
	message: string;
	ok: boolean;
}
// 登录接口返回类型
export interface LoginResponseData extends ResponseData {
	data: string;
}
// 获取用户信息返回数据类型
export interface UserInfoResponseData extends ResponseData {
	data: {
		routes: string[];
		buttons: string[];
		roles: string[];
		name: string;
		avatar: string;
	};
}
