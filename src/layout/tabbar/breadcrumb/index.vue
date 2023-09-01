<template>
	<div>
		<!-- 顶部左侧静态 -->
		<el-icon style="margin: 10px" @click="changeIcon">
			<component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
		</el-icon>

		<!-- 左侧面包屑 -->
		<el-breadcrumb separator-icon="ArrowRight">
			<el-breadcrumb-item
				v-for="(item, index) in $route.matched"
				:key="index"
				v-show="item.meta.title"
				:to="item.path">
				<el-icon>
					<component :is="item.meta.icon"></component>
				</el-icon>
				<span>{{ item.meta.title }}</span>
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script setup lang="ts">
	import useLayoutSettingStore from '@/store/modules/setting';
	// 引入route
	import { useRoute } from 'vue-router';
	let layoutSettingStore = useLayoutSettingStore();
	// 控制菜单是否折叠
	const changeIcon = () => {
		layoutSettingStore.fold = !layoutSettingStore.fold;
	};

	let $route = useRoute();
</script>
<script lang="ts">
	export default {
		name: 'Breadcrumb',
	};
</script>
<style scoped></style>
