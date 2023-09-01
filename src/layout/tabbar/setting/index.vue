<template>
	<el-button size="small" icon="Refresh" circle @click="refresh"></el-button>
	<el-button
		size="small"
		icon="FullScreen"
		circle
		@click="fullScreen"></el-button>
	<el-popover placement="bottom" title="主题设置" :width="300" trigger="click">
		<template #default>
			<el-form>
				<el-form-item label="主题颜色">
					<el-color-picker
						v-model="color"
						show-alpha
						:predefine="predefineColors" />
				</el-form-item>
				<el-form-item label="暗黑模式">
					<el-switch
						v-model="darkMode"
						inline-prompt
						active-icon="MoonNight"
						inactive-icon="Sunny"
						@change="changeDark" />
				</el-form-item>
			</el-form>
		</template>
		<template #reference>
			<el-button size="small" icon="Setting" circle></el-button>
		</template>
	</el-popover>
	<img
		:src="userStore.user.avatar"
		alt=""
		style="height: 24px; width: 24px; margin: 0px 10px" />
	<!-- 下拉菜单 -->
	<el-dropdown>
		<span class="el-dropdown-link">
			{{ userStore.user.username }}
			<el-icon class="el-icon--right">
				<arrow-down />
			</el-icon>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="logout">退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
	import useUserStore from '@/store/modules/user';
	import useLayoutSettingStore from '@/store/modules/setting';
	import { useRouter, useRoute } from 'vue-router';
	import { ref } from 'vue';
	let layoutSettingStore = useLayoutSettingStore();
	// 刷新功能
	const refresh = () => {
		layoutSettingStore.refresh = !layoutSettingStore.refresh;
	};
	// 全屏功能
	const fullScreen = () => {
		let full = document.fullscreenElement;

		if (!full) {
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	};
	// 获取UserStore
	let userStore = useUserStore();
	// 获取路由对象
	let $router = useRouter();
	let $route = useRoute();
	// 退出登录
	const logout = async () => {
		// 清除仓库的用户信息
		await userStore.logout();
		$router.push({
			path: '/login',
			query: {
				redirect: $route.path,
			},
		});
	};
	const color = ref('rgba(255, 69, 0, 0.68)');
	const predefineColors = ref([
		'#ff4500',
		'#ff8c00',
		'#ffd700',
		'#90ee90',
		'#00ced1',
		'#1e90ff',
		'#c71585',
		'rgba(255, 69, 0, 0.68)',
		'rgb(255, 120, 0)',
		'hsv(51, 100, 98)',
		'hsva(120, 40, 94, 0.5)',
		'hsl(181, 100%, 37%)',
		'hsla(209, 100%, 56%, 0.73)',
		'#c7158577',
	]);
	let darkMode = ref(false);
	// 切换暗黑模式
	const changeDark = () => {
		let html = document.documentElement;
		if (darkMode.value) {
			html.classList.add('dark');
		} else {
			html.classList.remove('dark');
		}
	};
</script>
<script lang="ts">
	export default {
		name: 'Setting',
	};
</script>
<style lang="scss" scoped></style>
