<template>
	<div class="layout_container">
		<!-- 左侧菜单 -->
		<div class="layout_slider" :class="{ fold: layoutSettingStore.fold }">
			<Logo></Logo>
			<!-- 展示菜单 -->
			<!-- 滚动组件 -->
			<el-scrollbar class="scrollbar">
				<!-- 菜单组件 -->
				<el-menu
					:default-active="route.path"
					text-color="#303133"
					background-color="#ecf5ff"
					:collapse="layoutSettingStore.fold">
					<Menu :menus="userStore.menuRoutes"> </Menu>
				</el-menu>
			</el-scrollbar>
		</div>
		<!-- 顶部导航 -->
		<div class="layout_tabbar" :class="{ fold: layoutSettingStore.fold }">
			<Tabbar></Tabbar>
		</div>
		<!-- 内容展示区 -->
		<div class="layout_main" :class="{ fold: layoutSettingStore.fold }">
			<Main></Main>
		</div>
	</div>
</template>

<script setup lang="ts">
	// 获取路由组件
	import { useRoute } from 'vue-router';
	// Logo组件
	import Logo from '@/layout/logo/index.vue';
	// 菜单组件
	import Menu from '@/layout/menu/index.vue';
	// 内容展示组件
	import Main from '@/layout/main/index.vue';
	// 顶部tabbar组件
	import Tabbar from '@/layout/tabbar/index.vue';
	// 获取用户相关的小仓库
	import useUserStore from '@/store/modules/user';
	// 获取LayoutSettingStore
	import useLayoutSettingStore from '@/store/modules/setting';
	let userStore = useUserStore();

	let layoutSettingStore = useLayoutSettingStore();
	// 获取当前路由对象
	let route = useRoute();
</script>
<script lang="ts">
	export default {
		name: 'Layout',
	};
</script>
<style scoped lang="scss">
	.layout_container {
		width: 100%;
		height: 100vh;
		.layout_slider {
			width: $base-menu-width;
			height: 100vh;
			background-color: $base-menu-background;
			transition: all 0.3s;
			&.fold {
				width: $base-menu-min-width;
				left: 0px;
			}
			.scrollbar {
				width: 100%;
				height: calc(100vh - $base-menu-logo-height);
			}

			.el-menu {
				border-right: none;
			}
		}
		.layout_tabbar {
			position: fixed;
			top: 0px;
			left: $base-menu-width;
			width: calc(100% - $base-menu-width);
			height: $base-tabbar-height;
			background-color: white;
			transition: all 0.3s;
			&.fold {
				width: calc(100vw - $base-menu-min-width);
				left: $base-menu-min-width;
			}
		}
		.layout_main {
			position: absolute;
			width: calc(100% - $base-menu-width);
			height: calc(100vh - $base-tabbar-height);
			left: $base-menu-width;
			top: $base-tabbar-height;
			padding: 20px;
			overflow: auto;
			transition: all 0.3s;
			&.fold {
				width: calc(100vw - $base-menu-min-width);
				left: $base-menu-min-width;
			}
		}
	}
</style>
