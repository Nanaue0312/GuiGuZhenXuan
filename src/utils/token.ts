// 封装本地存储和读取数据的方法
/**
 * 存储token到本地
 * @param token 需要存储的token值
 */
export const SET_TOKEN = (token: string) => {
	localStorage.setItem('token', token);
};
/**
 *  从本地获取数据
 * @returns 本地存储的token数据
 */
export const GET_TOKEN = () => {
	return localStorage.getItem('token');
};
export const REMOVE_TOKEN = () => {
	localStorage.removeItem('token');
};
