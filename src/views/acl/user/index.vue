<template>
	<div>
		<el-card shadow="always" :body-style="{ padding: '20px' }">
			<el-form label-width="80px" :inline="true" size="default">
				<el-form-item label="用户名:">
					<el-input
						v-model="keyWord"
						placeholder="请输入搜索的用户名"
						size="default"
						clearable
						@change=""></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						:disabled="!keyWord"
						type="primary"
						size="default"
						@click="searchUserByUsername">
						搜索
					</el-button>
					<el-button type="primary" size="default" @click="reset">
						重置
					</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card shadow="always" style="margin: 10px 0px">
			<el-button type="primary" size="default" @click="addUser">
				添加用户
			</el-button>
			<el-button
				type="primary"
				size="default"
				@click="handleBatchDeleteUsers"
				:disabled="!batchDeleteUsers.length">
				批量删除
			</el-button>
			<!-- 展示用户信息 -->
			<el-table
				border
				stripe
				style="margin: 10px 0px"
				:data="userList"
				@selection-change="getBatchDeleteUser">
				<el-table-column type="selection" width="50" />
				<el-table-column label="#" type="index" align="center" width="50" />
				<el-table-column label="id" align="center" prop="id"> </el-table-column>
				<el-table-column label="用户名字" align="center" prop="username">
				</el-table-column>
				<el-table-column label="用户名称" align="center" prop="name">
				</el-table-column>
				<el-table-column
					label="用户角色"
					align="center"
					prop="roleName"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					label="创建时间"
					align="center"
					prop="createTime"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					label="更新时间"
					align="center"
					prop="updateTime"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="操作" width="300px" align="center">
					<template #="{ row }">
						<el-button
							type="primary"
							size="small"
							@click="setUserRole(row)"
							icon="User">
							分配角色
						</el-button>
						<el-button size="small" @click="editUser(row)" icon="User">
							编辑
						</el-button>
						<el-popconfirm
							:title="`确定要删除${row.username}吗？`"
							@confirm="deleteUser(row)">
							<template #reference>
								<el-button type="danger" size="small" @click="" icon="User">
									删除
								</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页器 -->
			<el-pagination
				v-model:current-page="pageNo"
				v-model:page-size="pageSize"
				:page-sizes="[5, 7, 9]"
				:background="true"
				layout="prev, pager, next, jumper,->, sizes,total"
				:total="total" />
		</el-card>
		<!-- 添加或编辑用户抽屉 -->
		<el-drawer v-model="drawerUserVisible" :show-close="false">
			<template #header>
				<h4>{{ drawerTitle }}</h4>
			</template>
			<el-form
				label-width="90px"
				:inline="false"
				size="default"
				:model="user"
				:rules="rules"
				ref="formRef">
				<el-form-item label="用户姓名:" prop="name">
					<el-input placeholder="请输入用户名" v-model="user.name"> </el-input>
				</el-form-item>
				<el-form-item label="用户昵称:" prop="username">
					<el-input placeholder="请输入用户昵称" v-model="user.username">
					</el-input>
				</el-form-item>
				<el-form-item label="用户密码:" prop="password">
					<el-input placeholder="请输入密码" v-model="user.password">
					</el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button type="primary" size="default" @click="confirm">
					确定
				</el-button>
				<el-button size="default" @click="cancel">取消</el-button>
			</template>
		</el-drawer>
		<!-- 分配用户权限抽屉 -->
		<el-drawer v-model="drawerRoleVisible" :show-close="false">
			<template #header>
				<h4>分配角色</h4>
			</template>
			<el-form :model="user" ref="form" label-width="80px" :inline="false">
				<el-form-item label="用户姓名">
					<el-input
						v-model="user.username"
						prop="username"
						:disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="职位列表">
					<el-checkbox
						v-model="checkAll"
						:indeterminate="isIndeterminate"
						@change="checkAllBox">
						全选
					</el-checkbox>
					<el-checkbox-group v-model="userRoleList" @change="checkBox">
						<el-checkbox
							v-for="(role, index) in allRoleList"
							:key="index"
							:label="role">
							{{ role.roleName }}
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button type="primary" size="default" @click="updateUserRole">
					确定
				</el-button>
				<el-button size="default" @click="cancel">取消</el-button>
			</template>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
	import { nextTick, onMounted, reactive, ref, watch } from 'vue';
	import {
		reqAddOrUpdateUser,
		reqRoleList,
		reqUserList,
		reqUpdateUserRole,
		reqDeleteUser,
		reqBatchDeleteUsers,
	} from '@/api/acl/user';
	import {
		RoleList,
		RoleListResponse,
		User,
		UserListResponse,
		Users,
		UpdateUser,
	} from '@/api/acl/user/type';
	// @ts-ignore
	import { ElMessage } from 'element-plus';
	import useSettingStore from '@/store/modules/setting';
	// 获取settingStore
	let settingStore = useSettingStore();
	let pageNo = ref<number>(1);
	// 页面大小
	let pageSize = ref<number>(5);
	// 存储用户列表信息
	let total = ref<number>(0);
	let userList = ref<Users>([]);
	// 控制抽屉的显示与隐藏
	let drawerUserVisible = ref<boolean>(false);
	// 抽屉的标题
	let drawerTitle = ref<string>('');
	// 保存用户数据
	let user: User = reactive<User>({
		username: '',
		name: '',
		password: '',
	});
	// 获取用户列表
	const getUserList = async (
		pageNo: number,
		pageSize: number,
		// @ts-ignore
		username?: string
	) => {
		let result: UserListResponse = await reqUserList(pageNo, pageSize);
		if (result.code === 200) {
			total.value = result.data.total;
			userList.value = result.data.records;
		}
	};
	onMounted(() => {
		getUserList(pageNo.value, pageSize.value);
	});
	// 监听pageNo和pageSize的改变
	watch(
		() => pageNo.value,
		() => {
			getUserList(pageNo.value, pageSize.value);
		}
	);
	watch(
		() => pageSize.value,
		() => {
			getUserList(1, pageSize.value);
		}
	);
	// 新增用户
	const addUser = () => {
		drawerUserVisible.value = true;
		drawerTitle.value = '新增用户';
		// 重置user数据
		Object.assign(user, {
			username: '',
			name: '',
			password: '',
			id: 0,
		});
		// 清除上一次错误提示信息
		nextTick(() => {
			formRef.value.clearValidate();
		});
	};
	// 编辑用户信息
	const editUser = (row: User) => {
		drawerUserVisible.value = true;
		drawerTitle.value = '修改用户';
		// 重置user数据
		Object.assign(user, row);
		// 清除上一次错误提示信息
		nextTick(() => {
			formRef.value.clearValidate();
		});
	};
	// 确认按钮的回调,添加或更新用户
	const confirm = async () => {
		try {
			await formRef.value.validate();
		} catch (error) {
			return ElMessage({
				type: 'error',
				message: '输入的表单数据不合法，请检查后重试',
			});
		}
		let result: any = await reqAddOrUpdateUser(user);
		if (result.code === 200) {
			drawerUserVisible.value = false;
			ElMessage({
				type: 'success',
				message:
					drawerTitle.value === '新增用户' ? '添加用户成功' : '修改用户成功',
			});
			window.location.reload();
		} else {
			drawerUserVisible.value = false;
			ElMessage({
				type: 'error',
				message:
					drawerTitle.value === '新增用户' ? '添加用户失败' : '修改用户失败',
			});
		}
	};
	// 关闭drawer
	const cancel = () => {
		drawerUserVisible.value = false;
		drawerRoleVisible.value = false;
	};
	// 校验username函数
	// @ts-ignore
	const validateUsername = (rule: any, value: any, callback: any) => {
		if (value.trim().length >= 5) {
			callback();
		} else {
			callback(new Error('用户名长度必须大于5位'));
		}
	};
	// 校验username函数
	// @ts-ignore
	const validateName = (rule: any, value: any, callback: any) => {
		if (value.trim().length >= 5) {
			callback();
		} else {
			callback(new Error('用户昵称长度必须大于5位'));
		}
	};
	// 校验password函数
	// @ts-ignore
	const validatePassword = (rule: any, value: any, callback: any) => {
		if (value.trim().length >= 6) {
			callback();
		} else {
			callback(new Error('密码长度必须大于6位'));
		}
	};
	// 获取form组件实例
	let formRef = ref();
	// 表单校验规则
	const rules = {
		username: [
			{
				required: true,
				trigger: 'blur',
				validator: validateUsername,
			},
		],
		name: [
			{
				required: true,
				trigger: 'blur',
				validator: validateName,
			},
		],
		password: [
			{
				required: true,
				trigger: 'blur',
				validator: validatePassword,
			},
		],
	};

	// 定义已拥有的和所有的角色信息
	let allRoleList = ref<RoleList>([]);
	let userRoleList = ref<RoleList>([]);
	// 定义roleDrawer
	let drawerRoleVisible = ref<boolean>(false);
	const setUserRole = async (row: User) => {
		drawerRoleVisible.value = true;
		Object.assign(user, row);
		// 获取全部职位信息
		let result: RoleListResponse = await reqRoleList(user.id as number);
		// 存储已拥有的和所有的角色信息
		if (result.code === 200) {
			allRoleList.value = result.data.allRolesList;
			userRoleList.value = result.data.assignRoles;
		} else {
			ElMessage({
				type: 'error',
				message: '获取角色列表失败，请重试！',
			});
		}
		isIndeterminate.value =
			userRoleList.value.length > 0 &&
			userRoleList.value.length < allRoleList.value.length;
	};
	let checkAll = ref<boolean>(false);
	// 控制不确定状态
	let isIndeterminate = ref<boolean>(false);
	// 全选box，点击后选中所有子box
	const checkAllBox = (val: boolean) => {
		userRoleList.value = val ? allRoleList.value : [];
		isIndeterminate.value = false;
	};
	// checkbox-group选中的盒子
	const checkBox = (val: number[]) => {
		isIndeterminate.value =
			val.length > 0 && val.length < allRoleList.value.length;
		checkAll.value = val.length === allRoleList.value.length;
	};
	// 提交用户更新
	const updateUserRole = async () => {
		let data: UpdateUser = {
			userId: user.id as number,
			roleIdList: userRoleList.value.map((role) => role.id) as number[],
		};
		let result: any = await reqUpdateUserRole(data);
		if (result.code === 200) {
			ElMessage({
				type: 'success',
				message: '分配角色成功',
			});
		}
		drawerRoleVisible.value = false;
		getUserList(pageNo.value, pageSize.value);
	};
	// 删除用户
	const deleteUser = async (row: User) => {
		let result: any = await reqDeleteUser(row.id as number);
		if (result.code === 200) {
			ElMessage({
				type: 'success',
				message: `删除${row.username}成功`,
			});
			getUserList(pageNo.value, pageSize.value);
		} else {
			ElMessage({
				type: 'error',
				message: `删除${row.username}失败，请重试`,
			});
		}
	};
	// 存储table中选中的行
	let batchDeleteUsers = ref<number[]>([]);
	const getBatchDeleteUser = (selection: User[]) => {
		batchDeleteUsers.value = selection.map((user) => user.id) as number[];
	};
	const handleBatchDeleteUsers = async () => {
		let result: any = await reqBatchDeleteUsers(batchDeleteUsers.value);
		if (result.code === 200) {
			ElMessage({
				type: 'success',
				message: '批量删除成功',
			});
			getUserList(pageNo.value, pageSize.value);
		} else {
			ElMessage({
				type: 'error',
				message: '批量删除失败，请重试',
			});
		}
	};
	let keyWord = ref<string>('');
	// 搜索用户
	const searchUserByUsername = async () => {
		let result: UserListResponse = await reqUserList(
			1,
			pageSize.value,
			keyWord.value
		);
		if (result.code === 200) {
			userList.value = result.data.records;
			total.value = result.data.total;
			keyWord.value = '';
		} else {
			ElMessage({
				type: 'error',
				message: '搜索失败，请重试！',
			});
		}
	};
	// 重置按钮
	const reset = () => {
		settingStore.refresh = !settingStore.refresh;
	};
</script>

<style scoped></style>
