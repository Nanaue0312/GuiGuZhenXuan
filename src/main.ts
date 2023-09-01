import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from '@/App.vue';
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'virtual:svg-icons-register';
import '@/styles/index.scss';
// 引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components/';
// 引入路由组件
import { router } from '@/router';
// 引入pinia仓库
import Pinia from '@/store';
// 引入路由鉴权
import '@/permission';
import 'element-plus/theme-chalk/dark/css-vars.css';
const app = createApp(App);

app.use(ElementPlus, {
	// element国际化
	locale: zhCn,
});

// 注册自定义插件
app.use(globalComponent);
// 注册路由
app.use(router);
// 注册pinia
app.use(Pinia);
app.mount('#app');
