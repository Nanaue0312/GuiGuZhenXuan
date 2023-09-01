import SvgIcon from '@/components/SvgIcon/index.vue';
import Category from '@/components/category/index.vue';
// 引入element-plus/icon的全部图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 引入项目中全部的全局组件
const allGlobalComponent = {
	SvgIcon,
	Category,
};
export default {
	install(app: any) {
		// 注册项目中的所有全局组件
		Object.keys(allGlobalComponent).forEach((key: string) => {
			// 注册为全局组件
			// @ts-ignore
			app.component(key, allGlobalComponent[key]);
		});
		for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
			app.component(key, component);
		}
	},
};
