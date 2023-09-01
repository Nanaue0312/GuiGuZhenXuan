<template>
	<div class="box">
		<div class="top">
			<p class="title">实时游客统计</p>
			<p class="bg"></p>
			<p class="right">可预约总量<span>99999</span></p>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
	.box {
		background: url(../images/dataScreen-main-lb.png) no-repeat;
		background-size: cover;
		.top {
			margin-left: 20px;
			.title {
				color: white;
				font-size: 20px;
			}
			.bg {
				width: 68px;
				height: 7px;
				background: url(../images/dataScreen-title.png) no-repeat;
				background-size: cover;
				margin-top: 10px;
			}
			.right {
				float: right;
				color: white;
				font-size: 20px;
				span {
					color: yellowgreen;
				}
			}
		}
	}
</style>
