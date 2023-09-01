// 封装axios
import axios from 'axios';
// @ts-ignore
import { ElMessage, ElLoading } from 'element-plus';
// 引入userStore
import useUserStore from '@/store/modules/user';
// 1. 利用axios的create方法创建一个axios实例（其他配置：基础路径，超时时间）
let request = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径携带/api
	timeout: 5000, //超时时间设置
});

// 2. 给request添加请求和响应拦截器
request.interceptors.request.use((config) => {
	// config配置对象，header请求头，经常给服务端携带公共参数
	let userStore = useUserStore();
	if (userStore) {
		config.headers.token = userStore.token;
	}
	// 返回配置对象
	return config;
});

request.interceptors.response.use(
	(response) => {
		//成功回调
		//简化数据
		return response.data;
	},
	(error) => {
		// 失败回调，处理http网络错误
		let msg = '';
		// http状态码
		let status = error.response.status;
		switch (status) {
			case 401:
				msg = 'TOKEN已过期';
				break;
			case 403:
				msg = '无权访问';
				break;
			case 404:
				msg = '资源不存在';
				break;
			case 500:
				msg = '服务器出现错误';
				break;
			default:
				msg = '网络出现问题';
				break;
		}
		// 提示错误信息
		ElMessage({
			type: 'error',
			message: msg,
		});
		return Promise.reject(error);
	}
);

export default request;
