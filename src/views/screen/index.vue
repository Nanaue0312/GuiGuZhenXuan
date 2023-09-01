<template>
	<div class="container">
		<div class="content" ref="content">
			<div class="top">
				<Top></Top>
			</div>
			<div class="bottom">
				<div class="left">
					<Tourist class="tourist"></Tourist>
					<Sex class="sex"></Sex>
					<Age class="age"></Age>
				</div>
				<div class="center">中间</div>
				<div class="right">右侧</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	// @ts-ignore
	import Top from '@/views/screen/components/top/index.vue';
	import Tourist from '@/views/screen/components/tourist.vue';
	import Sex from '@/views/screen/components/sex.vue';
	import Age from '@/views/screen/components/age.vue';
	import { onMounted, ref } from 'vue';

	let content = ref();
	onMounted(() => {
		content.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
	});
	// 定义大屏缩放比例
	const getScale = (w = 1920, h = 1080) => {
		const ww = window.innerWidth / w;
		const wh = window.innerHeight / h;
		return ww < wh ? ww : wh;
	};
	// 监听窗口变化
	window.onresize = () => {
		content.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
	};
</script>

<style scoped lang="scss">
	.container {
		width: 100vw;
		height: 100vh;
		background: url(./images/bg.png) no-repeat;
		background-size: cover;
		.content {
			position: fixed;
			width: 1920px;
			height: 1080px;
			transform-origin: left top;
			left: 50%;
			top: 50%;
			.top {
				width: 100%;
				height: 40px;
			}
			.bottom {
				display: flex;
				.left {
					flex: 1;
					height: 1040px;
					display: flex;
					flex-direction: column;
					.tourist {
						flex: 1.5;
					}
					.sex {
						flex: 1;
					}
					.age {
						flex: 1;
					}
				}
				.center {
					flex: 2;
				}
				.right {
					flex: 1;
				}
			}
		}
	}
</style>
