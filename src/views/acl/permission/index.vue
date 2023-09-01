<template>
	<div>
		<el-table
			:data="permissionList"
			style="width: 100%; margin-bottom: 20px"
			row-key="id"
			border>
			<el-table-column prop="name" label="名称" sortable width="200px" />
			<el-table-column prop="code" label="权限值" sortable width="200px" />
			<el-table-column prop="updateTime" label="修改时间" sortable />
			<el-table-column prop="address" label="操作" sortable>
				<template #="{ row }">
					<el-button
						type="primary"
						size="small"
						@click="addPermission(row)"
						:disabled="row.level === 4">
						添加菜单
					</el-button>
					<el-button
						type="primary"
						size="small"
						@click="updatePermission(row)"
						:disabled="row.level === 1">
						编辑
					</el-button>
					<el-popconfirm
						title="你确定要删除这个权限菜单吗？"
						@confirm="deletePermission(row.id)"
						width="260px">
						<template #reference>
							<el-button type="danger" size="small" :disabled="row.level === 1">
								删除
							</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		<!-- 添加和编辑角色菜单 -->
		<el-dialog v-model="dialogVisible" title="Tips" width="30%">
			<template #header>
				<h4 v-show="!menuParams.id">添加菜单</h4>
				<h4 v-show="menuParams.id">更新菜单</h4>
			</template>

			<el-form
				:model="menuParams"
				ref="form"
				label-width="80px"
				:inline="false"
				size="default">
				<el-form-item label="名称">
					<el-input
						placeholder="请输入菜单权限名称"
						v-model="menuParams.name"></el-input>
				</el-form-item>
				<el-form-item label="权限值">
					<el-input
						placeholder="请输入权限值"
						v-model="menuParams.code"></el-input>
				</el-form-item>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="save"> 确定 </el-button>
					<el-button @click="dialogVisible = false">取消</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
	import {
		reqGetAllPermission,
		reqAddOrUpdatePermission,
		reqDeletePermission,
	} from '@/api/acl/menu';
	import {
		Permission,
		PermissionResponse,
		MenuParams,
	} from '@/api/acl/menu/type';
	// @ts-ignore
	import { ElMessage } from 'element-plus';
	import { onMounted, reactive, ref } from 'vue';
	// 存储权限菜单列表
	let permissionList = ref<Permission[]>([]);
	// 获取权限菜单列表
	const getPermissionList = async () => {
		let result: PermissionResponse = await reqGetAllPermission();
		if (result.code === 200) {
			permissionList.value = result.data;
		}
	};
	onMounted(() => {
		getPermissionList();
	});

	// 控制dialog的显示与隐藏
	let dialogVisible = ref(false);
	// 收集permission
	let menuParams = reactive<MenuParams>({});
	// 新增菜单权限
	const addPermission = (row: Permission) => {
		Object.assign(menuParams, {
			pid: -1,
			id: 0,
			name: '',
			level: -1,
			code: '',
		});
		dialogVisible.value = true;
		menuParams.level = (row.level as number) + 1;
		menuParams.pid = row.pid;
	};
	const updatePermission = (row: MenuParams) => {
		dialogVisible.value = true;
		Object.assign(menuParams, row);
	};
	const save = async () => {
		let result: any = await reqAddOrUpdatePermission(menuParams);
		if (result.code === 200) {
			ElMessage({
				type: 'success',
				message: menuParams.id ? '更新权限菜单成功' : '添加权限菜单成功',
			});
			dialogVisible.value = false;
			getPermissionList();
		} else {
			ElMessage({
				type: 'error',
				message: '添加权限菜单失败，请重试',
			});
		}
	};
	const deletePermission = async (id: number) => {
		let result: any = await reqDeletePermission(id);
		if (result.code === 200) {
			ElMessage({
				type: 'success',
				message: '删除权限菜单成功',
			});
			getPermissionList();
		} else {
			ElMessage({
				type: 'error',
				message: '删除权限菜单失败',
			});
		}
	};
</script>

<style scoped></style>
