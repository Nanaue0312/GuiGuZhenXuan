<template>
	<div class="login_container">
		<el-row>
			<el-col :span="12" :xs="0"></el-col>
			<el-col :span="12" :xs="24">
				<el-form
					class="login_form"
					@submit.prevent
					:model="loginForm"
					:rules="rules"
					ref="loginForms">
					<h1>Hello</h1>
					<h2>欢迎来到硅谷甄选</h2>
					<el-form-item prop="username">
						<el-input
							:prefix-icon="User"
							v-model="loginForm.username"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							type="password"
							:prefix-icon="Lock"
							v-model="loginForm.password"
							show-password></el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							class="login_btn"
							:loading="loading"
							type="primary"
							size="default"
							@click="login">
							登录
						</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
	// 引入user仓库
	import useUserStore from '@/store/modules/user';
	import { User, Lock } from '@element-plus/icons-vue';
	import { reactive, ref } from 'vue';
	import { useRouter, useRoute } from 'vue-router';
	// @ts-ignore
	import { ElNotification, ElMessage } from 'element-plus';
	// 获取vc实例
	let loginForms = ref();

	// 获取路由器
	let $router = useRouter();
	let loginForm = reactive({
		username: 'admin',
		password: 'atguigu123',
	});
	let loading = ref(false);
	let userStore = useUserStore();
	let $route = useRoute();
	const login = async () => {
		// 校验表单是否合法，如果不合法则不发送请求
		await loginForms.value.validate();

		// 通知仓库发送登录请求
		// 成功 -> 首页
		// 失败 -> 弹出错误信息
		loading.value = true;
		try {
			// 可以使用.then()的方式
			await userStore.userLogin(loginForm);
			// 编程式跳转到首页
			let redirect: any = $route.query.redirect;
			$router.push({
				path: redirect || '/',
			});
			ElNotification({
				title: `Hi,${userStore.getTime}`,
				type: 'success',
				message: '登录成功',
			});
		} catch (error: any) {
			ElNotification({
				type: 'error',
				message: error.message,
			});
		} finally {
			loading.value = false;
		}
	};
	// 自定义校验规则
	/**
	 * 校验用户名长度
	 * @param rule 对应的校验对象
	 * @param value 对应form表单的内容
	 * @param callback 校验回调函数
	 */
	// @ts-ignore
	const validateUsername = (rule: any, value: any, callback: any) => {
		if (/^[a-zA-Z0-9]{5,10}$/.test(value)) {
			callback();
		} else {
			callback(new Error('用户名长度为5-10位，且由字母、数字组成'));
		}
	};
	// @ts-ignore
	const validatePassword = (rule: any, value: any, callback: any) => {
		if (/^[\u4E00-\u9FA5A-Za-z0-9_]{6,10}$/.test(value)) {
			callback();
		} else {
			callback(new Error('密码长度为6-10位，且由字母、数字、_组成'));
		}
	};
	const rules = reactive({
		username: [
			{ validator: validateUsername, trigger: 'change' },
			/* 	{
				required: true,
				message: '用户名不能为空',
				trigger: 'blur',
			},
			{
				min: 3,
				max: 8,
				message: '用户名长度为3-8位',
				trigger: 'blur',
			}, */
		],
		password: [
			{ validator: validatePassword, trigger: 'change' },
			/* 			{
				required: true,
				message: '密码不能为空',
				trigger: 'blur',
			},
			{
				min: 6,
				max: 15,
				message: '密码长度为6-15位',
				trigger: 'blur',
			}, */
		],
	});
</script>

<style lang="scss" scoped>
	.login_container {
		width: 100%;
		height: 100vh;
		background: url('@/assets/images/background.jpg') no-repeat;
		background-size: cover;
		.login_form {
			width: 80%;
			top: 30vh;
			position: relative;
			background: url('@/assets/images/login_form.png') no-repeat;
			background-size: cover;
			padding: 40px;
			h1 {
				color: white;
				font-size: 40px;
			}
			h2 {
				margin: 20px 0px;
				color: white;
				font-size: 20px;
			}
			.login_btn {
				width: 100%;
			}
		}
	}
</style>
