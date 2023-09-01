<template>
	<el-card>
		<div class="box">
			<img :src="user.avatar" alt="" class="avatar" />
			<div class="bottom">
				<h3 class="title">{{ userStore.getTime }} {{ user.username }}</h3>
				<p class="sub-title">硅谷甄选运营平台</p>
			</div>
		</div>
		<div class="footer">
			<svg-icon name="welcome" width="600px" height="500px"></svg-icon>
		</div>
	</el-card>
</template>

<script setup lang="ts">
	import useUserStore from '@/store/modules/user';

	let userStore = useUserStore();
	let user = userStore.user;
</script>

<style scoped lang="scss">
	.box {
		display: flex;
		.avatar {
			width: 100px;
			height: 100px;
			border-radius: 50%;
		}
		.title {
			font-size: 20px;
			margin-bottom: 20px;
			font-weight: bolder;
		}
		.bottom {
			margin-left: 20px;
		}
		.sub-title {
			font-style: italic;
			color: darkgray;
		}
	}
	.footer {
		display: flex;
		justify-content: center;
	}
</style>
