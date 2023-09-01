<template>
	<el-card shadow="always">
		<el-form :inline="true" size="default">
			<el-form-item label="一级分类">
				<!-- value即为select下拉菜单收集的数据 -->
				<el-select
					v-model="categoryStore.c1Id"
					@change="getC2Info"
					:disabled="scene !== 0">
					<el-option
						v-for="item in categoryStore.c1Infos"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="二级分类">
				<el-select
					v-model="categoryStore.c2Id"
					@change="getC3Info"
					:disabled="scene !== 0">
					<el-option
						v-for="item in categoryStore.c2Infos"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="三级分类">
				<el-select v-model="categoryStore.c3Id" :disabled="scene !== 0">
					<el-option
						v-for="item in categoryStore.c3Infos"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script setup lang="ts">
	import { onMounted } from 'vue';
	// @ts-ignore
	import useCategoryStore from '@/store/modules/category.ts';
	let categoryStore = useCategoryStore();
	// 通知仓库发送请求
	const getC1Info = () => {
		categoryStore.getC1Info();
	};
	// 通过仓库获取c1数据
	onMounted(() => {
		getC1Info();
		if (categoryStore.c3Id) {
			categoryStore.getProductAttrInfo();
		}
	});
	// 收集二级分类数据
	const getC2Info = () => {
		categoryStore.c2Infos = [];
		categoryStore.c2Id = '';
		categoryStore.c3Infos = [];
		categoryStore.c3Id = '';

		categoryStore.getC2Info();
	};
	// 收集三级分类数据
	const getC3Info = () => {
		categoryStore.c3Infos = [];
		categoryStore.c3Id = '';
		categoryStore.getC3Info();
	};

	// 获取父组件传递的props
	let { scene } = defineProps(['scene']);
</script>

<style scoped></style>
