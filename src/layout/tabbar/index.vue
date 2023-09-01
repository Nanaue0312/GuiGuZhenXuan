<template>
	<div class="tabbar">
		<div class="tabbar-left">
			<bread-crumb></bread-crumb>
		</div>
		<div class="tabbar-right">
			<Setting></Setting>
		</div>
	</div>
</template>

<script setup lang="ts">
	// 左侧组件
	import BreadCrumb from '@/layout/tabbar/breadcrumb/index.vue';
	// @ts-ignore
	import Setting from '@/layout/tabbar/setting/index.vue';
</script>
<script lang="ts">
	export default {
		name: 'Tabbar',
	};
</script>
<style scoped lang="scss">
	.tabbar {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		// background-image: linear-gradient(to right, #ecf5ff, #d9ecff, #c6e2ff);
		.tabbar-left {
			display: flex;
			align-items: center;
			margin: 20px;
		}
		.tabbar-right {
			display: flex;
			align-items: center;
		}
	}
</style>
