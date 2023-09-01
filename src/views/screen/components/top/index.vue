<template>
	<div class="top">
		<div class="left">
			<span class="lBtn" @click="goHome">首页</span>
		</div>
		<div class="center">
			<div class="title">智慧旅游可视化大数据平台</div>
		</div>
		<div class="right">
			<span class="rBtn">统计报告</span>
			<span class="time">当前时间: {{ formattedDate }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, onUnmounted, ref } from 'vue';
	import { useRouter } from 'vue-router';
	let $router = useRouter();
	const goHome = () => {
		$router.push('/home');
	};
	function formatDate(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');

		const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

		return formattedDate;
	}

	let formattedDate = ref('');
	let timer: any;
	onMounted(() => {
		timer = setInterval(() => {
			formattedDate.value = formatDate(new Date());
		}, 1000);
	});
	onUnmounted(() => {
		clearInterval(timer);
	});
</script>

<style scoped lang="scss">
	.top {
		width: 100%;
		height: 40px;
		display: flex;
		.left {
			flex: 1;
			background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
			background-size: cover;
			.lBtn {
				width: 150px;
				height: 40px;
				float: right;
				background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
				background-size: cover;
				text-align: center;
				line-height: 40px;
				color: #29fcff;
				font-size: 20px;
			}
		}
		.center {
			flex: 2;
			.title {
			}
			width: 100%;
			height: 74px;
			background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
			background-size: cover;
			text-align: center;
			line-height: 74px;
			color: #29fcff;
			font-size: 30px;
		}
		.right {
			flex: 1;
			background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
			background-size: cover;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.rBtn {
				width: 150px;
				height: 40px;
				background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
				background-size: cover;
				text-align: center;
				line-height: 40px;
				color: #29fcff;
				font-size: 20px;
			}
			.time {
				color: #29fcff;
				margin-right: 10px;
			}
		}
	}
</style>
