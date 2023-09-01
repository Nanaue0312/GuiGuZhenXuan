<template>
	<div>
		<el-card shadow="always" :body-style="{ padding: '20px' }">
			<el-form :inline="true" label-width="80px">
				<el-form-item label="职位搜索:">
					<el-input
						placeholder="请输入职位搜索的关键字"
						v-model="keyWord"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						size="default"
						@click="searchRoleByName"
						:disabled="!keyWord">
						搜索
					</el-button>
					<el-button type="primary" size="default" @click="reset">
						重置
					</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card
			shadow="always"
			:body-style="{ padding: '20px' }"
			style="margin: 10px 0px">
			<el-button type="primary" size="default" @click="addRole" icon="Plus">
				添加角色
			</el-button>
			<el-button
				type="danger"
				size="default"
				@click="batchDeleteRole"
				icon="Delete">
				批量删除
			</el-button>
			<el-table
				border
				stripe
				style="margin: 10px 0px"
				:data="roleList"
				@selection-change="collectSelectedRole">
				<el-table-column align="center" type="selection" width="50px" label="#">
				</el-table-column>
				<el-table-column align="center" type="index" width="50px" label="#">
				</el-table-column>
				<el-table-column align="center" label="ID" prop="id"> </el-table-column>
				<el-table-column
					align="center"
					label="角色名称"
					prop="roleName"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					align="center"
					label="创建时间"
					prop="createTime"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					align="center"
					label="更新时间"
					prop="updateTime"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column align="center" label="操作" width="280px">
					<template #="{ row }">
						<el-button
							type="primary"
							size="small"
							@click="setPermission(row)"
							icon="User">
							分配角色
						</el-button>
						<el-button
							type="primary"
							size="small"
							@click="editRole(row)"
							icon="Edit">
							编辑
						</el-button>
						<el-popconfirm
							title="你确定要删除这个用户吗？"
							@confirm="deleteRole(row)"
							width="260px">
							<template #reference>
								<el-button type="danger" size="small" icon="Delete">
									删除
								</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 分页器 -->
		<el-pagination
			v-model:current-page="pageNo"
			v-model:page-size="pageSize"
			:page-sizes="[10, 15, 20]"
			:background="true"
			layout="prev, pager, next, jumper,->, sizes,total"
			:total="total" />
		<el-dialog
			v-model="dialogVisible"
			width="30%"
			:before-close="handleBeforeClose">
			<template #header>
				<h4>{{ dialogTitle }}</h4>
			</template>
			<el-form label-width="90px" :inline="true" size="default">
				<el-form-item label="角色名称：">
					<el-input
						placeholder="请输入角色名称"
						v-model="role.roleName"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<el-button type="primary" size="default" @click="confirm">
					确认
				</el-button>
				<el-button size="default" @click="cancel">取消</el-button>
			</template>
		</el-dialog>
		<!-- 分配角色 -->
		<el-drawer v-model="drawerVisible" :show-close="false">
			<template #header>
				<h4>分配菜单与按钮的权限</h4>
			</template>
			<el-tree
				ref="permissionTree"
				:data="rolePermissionInfo"
				show-checkbox
				node-key="id"
				:default-expand-all="true"
				:default-checked-keys="selectedPermissionId"
				:props="defaultProps" />
			<template #footer>
				<div style="flex: auto">
					<el-button type="primary" @click="updateRolePermission">
						确定
					</el-button>
					<el-button @click="drawerVisible = false">取消</el-button>
				</div>
			</template>
		</el-drawer>
	</div>
</template>

<script setup lang="ts">
	import {
		reqRoleList,
		reqAddOrUpdateRole,
		reqAllPermissionByRoleId,
		reqUpdateRolePermission,
		reqDeleteRole,
		reqBatchDeleteRole,
	} from '@/api/acl/role';
	import { onMounted, reactive, ref, watch } from 'vue';
	import {
		RoleListResponse,
		RoleList,
		RolePermissionInfo,
		RolePermissionInfoResponse,
	} from '@/api/acl/role/type';
	// @ts-ignore
	import { ElMessage } from 'element-plus';
	import useSettingStore from '@/store/modules/setting';
	import { Role } from '@/api/acl/user/type';
	// 获取settingStore
	let settingStore = useSettingStore();
	// 当前页码和页面大小
	let pageNo = ref(1);
	let pageSize = ref(10);
	let total = ref(400);
	let roleList = ref<RoleList>();
	let keyWord = ref('');
	async function getRoleLst(pageNo: number, pageSize: number) {
		let result: RoleListResponse = await reqRoleList(pageNo, pageSize);
		if (result.code === 200) {
			roleList.value = result.data.records;
			total.value = result.data.total;
		} else {
			ElMessage({
				type: 'error',
				message: '获取角色列表失败请重试',
			});
		}
	}
	onMounted(() => {
		getRoleLst(pageNo.value, pageSize.value);
	});
	watch(
		() => pageNo.value,
		() => {
			getRoleLst(pageNo.value, pageSize.value);
		}
	);
	watch(
		() => pageSize.value,
		() => {
			getRoleLst(1, pageSize.value);
		}
	);
	const searchRoleByName = async () => {
		let result: RoleListResponse = await reqRoleList(
			1,
			pageSize.value,
			keyWord.value
		);
		if (result.code === 200) {
			roleList.value = result.data.records;
			total.value = result.data.total;
			keyWord.value = '';
		} else {
			ElMessage({
				type: 'error',
				message: '搜索失败，请重试！',
			});
		}
	};
	const reset = () => {
		settingStore.refresh = !settingStore.refresh;
	};
	// 对话框的展示与隐藏
	let dialogVisible = ref(false);
	// 对话框的标题
	let dialogTitle = ref('新增角色');
	// 收集role信息
	let role = reactive<Role>({});
	// 显示对话框
	const addRole = () => {
		dialogVisible.value = true;
		dialogTitle.value = '新增角色';
	};
	const editRole = (row: Role) => {
		dialogVisible.value = true;
		dialogTitle.value = '更新角色';
		role.roleName = row.roleName;
	};
	// 关闭前清空数据
	const handleBeforeClose = () => {};
	// 确认按钮
	const confirm = async () => {
		let result: any = await reqAddOrUpdateRole(role);
		if (result.code === 200) {
			ElMessage({
				type: 'success',
				message: '更新角色成功',
			});
			getRoleLst(1, pageSize.value);
		} else {
			ElMessage({
				type: 'success',
				message: '更新角色失败，请重试',
			});
		}
		dialogVisible.value = false;
	};
	// 取消按钮
	const cancel = () => {
		dialogVisible.value = false;
	};
	// 抽屉的显示与隐藏
	let drawerVisible = ref(false);
	// 存储角色信息
	let rolePermission = reactive<RolePermissionInfo>({});
	// 存储当前角色的权限信息
	let rolePermissionInfo = ref<RolePermissionInfo[]>([]);
	// 存储已选择的permissionId
	let selectedPermissionId = ref<number[]>([]);
	// 获取角色的权限列表
	const setPermission = async (row: RolePermissionInfo) => {
		drawerVisible.value = true;
		Object.assign(rolePermission, row);
		// 更具角色id获取数据
		let result: RolePermissionInfoResponse = await reqAllPermissionByRoleId(
			rolePermission.id as number
		);
		if (result.code === 200) {
			rolePermissionInfo.value = result.data;
			// 筛选selected的权限节点
			selectedPermissionId.value = filterSelectedPermissionId(
				rolePermissionInfo.value,
				[]
			);
		}
	};
	const defaultProps = {
		children: 'children',
		label: 'name',
	};
	const filterSelectedPermissionId = (
		permissionArr: RolePermissionInfo[],
		selectedArr: any
	) => {
		permissionArr.forEach((item) => {
			if (item.select && item.level === 4) {
				selectedArr.push(item.id as number);
			}
			if (item.children && item.children.length > 0) {
				filterSelectedPermissionId(item.children, selectedArr);
			}
		});
		return selectedArr;
	};
	// 获取tree组件实例
	let permissionTree = ref();
	// 更新角色权限
	const updateRolePermission = async () => {
		let halfCheckedKeys = permissionTree.value.getHalfCheckedKeys();
		let checkedKeys = permissionTree.value.getCheckedKeys();
		let permissionId = halfCheckedKeys.concat(checkedKeys);
		let result: any = await reqUpdateRolePermission(
			rolePermission.id as number,
			permissionId
		);
		if (result.code === 200) {
			ElMessage({
				type: 'success',
				message: '修改权限成功',
			});
			drawerVisible.value = false;
			reset();
		} else {
			ElMessage({
				type: 'error',
				message: '修改权限失败',
			});
		}
	};
	// 删除角色
	const deleteRole = async (row: Role) => {
		let result: any = await reqDeleteRole(row.id as number);
		if (result.code === 200) {
			ElMessage({
				type: 'success',
				message: '删除角色成功',
			});
			getRoleLst(1, pageSize.value);
		} else {
			ElMessage({
				type: 'error',
				message: '删除角色失败',
			});
		}
	};
	// 收集要删除的角色
	let selectedRoleId = ref<number[]>([]);
	const collectSelectedRole = async (value: any) => {
		selectedRoleId.value = value.map((item: any) => item.id);
	};
	const batchDeleteRole = async () => {
		let result: any = await reqBatchDeleteRole(selectedRoleId.value);
		if (result.code === 200) {
			ElMessage({
				type: 'success',
				message: '批量删除成功',
			});
			getRoleLst(1, pageSize.value);
		} else {
			ElMessage({
				type: 'error',
				message: '批量删除角色失败',
			});
		}
	};
</script>

<style scoped></style>
