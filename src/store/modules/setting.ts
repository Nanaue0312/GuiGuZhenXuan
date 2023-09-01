import { defineStore } from 'pinia';

let useLayoutSettingStore = defineStore('SettingStore', {
	state() {
		return {
			// 控制菜单是否折叠
			fold: false,
			// 控制刷新按钮
			refresh: false,
		};
	},
});
export default useLayoutSettingStore;
