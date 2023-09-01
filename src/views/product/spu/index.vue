<template>
	<div>
		<Category :scene="SPUStore.scene"></Category>
		<el-card shadow="always" style="margin: 10px 0px">
			<!-- SPU列表组件 -->
			<SPUInfo v-show="SPUStore.scene === 0"></SPUInfo>
			<!-- 添加SPU子组件 -->
			<SPUForm v-show="SPUStore.scene === 1"></SPUForm>
			<!-- 添加SKU子组件 -->
			<SKUForm v-show="SPUStore.scene === 2"></SKUForm>
		</el-card>
	</div>
</template>

<script setup lang="ts">
	// 引入SPUStore
	import useSPUStore from '@/store/modules/SPU';

	// 引入相关子组件
	import SKUForm from '@/views/product/spu/SKUForm.vue';
	import SPUForm from '@/views/product/spu/SPUForm.vue';
	import SPUInfo from '@/views/product/spu/SPUInfo.vue';
	// 创建SPUStore
	let SPUStore = useSPUStore();
</script>

<style scoped></style>
