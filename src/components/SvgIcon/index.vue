<template>
	<div>
		<svg :style="{ height, width }">
			<use :xlink:href="prefix + name" :fill="color"></use>
		</svg>
	</div>
</template>

<script setup lang="ts">
	defineProps({
		// xlink:href的前缀
		prefix: {
			type: String,
			default: '#icon-',
		},
		// 接受图标名字
		name: {
			type: String,
		},
		// 接受图标颜色
		color: {
			type: String,
			default: '',
		},
		// 接受图标宽度
		width: {
			type: String,
			default: '16px',
		},
		height: {
			type: String,
			default: '16px',
		},
	});
</script>

<style scoped></style>
