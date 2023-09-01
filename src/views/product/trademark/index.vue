<template>
	<el-card class="box-card">
		<!-- 添加记录按钮 -->
		<el-button type="primary" size="default" @click="addTrademark" icon="Plus">
			添加品牌
		</el-button>
		<!-- 内容展示表格 -->
		<el-table border style="width: 100%; margin: 10px 0px" :data="trademarks">
			<el-table-column label="序号" width="80" align="center" type="index" />
			<el-table-column label="品牌名称" prop="tmName" align="center" />
			<el-table-column label="品牌LOGO" align="center" width="90">
				<template #default="{ row }">
					<el-image style="width: 80px; height: 70px" :src="row.logoUrl" />
				</template>
			</el-table-column>
			<el-table-column label="操作" prop="" align="center">
				<template #="{ row, $index }">
					<el-button
						type="primary"
						size="default"
						icon="Edit"
						@click="updateTrademark(row)">
						编辑
					</el-button>
					<el-popconfirm
						:title="`您确定删除${row.tmName}吗?`"
						width="250px"
						icon="delete"
						@confirm="removeTrademark(row.id)">
						<template #reference>
							<el-button type="danger" size="default" icon="Delete">
								删除
							</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页栏 -->
		<el-pagination
			v-model:current-page="currentPage"
			v-model:page-size="pageSize"
			:page-sizes="[5, 10]"
			layout=" prev, pager, next, jumper,->,total, sizes,"
			:total="total" />
		<!-- 对话框 -->
		<el-dialog v-model="dialogFormVisible" title="添加品牌">
			<el-form
				style="width: 80%"
				:model="trademark"
				:rules="rules"
				ref="formRef">
				<el-form-item label="品牌名称" label-width="100px" prop="tmName">
					<el-input
						placeholder="请输入品牌名称"
						clearable
						@change=""
						v-model="trademark.tmName"></el-input>
				</el-form-item>
				<el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
					<el-upload
						class="avatar-uploader"
						action="/api/admin/product/fileUpload"
						:show-file-list="false"
						:on-success="handleLogoSuccess"
						:before-upload="beforeLogoUpload">
						<img
							v-if="trademark.logoUrl"
							:src="trademark.logoUrl"
							class="avatar" />
						<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
					</el-upload>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancel">取消</el-button>
					<el-button type="primary" @click="confirm"> 确定 </el-button>
				</span>
			</template>
		</el-dialog>
	</el-card>
</template>

<script setup lang="ts">
	import { nextTick, onMounted, reactive, ref, watch } from 'vue';
	import {
		reqAddOrUpdateTrademark,
		reqTrademarkInfo,
		reqDeleteTrademark,
	} from '@/api/product/trademark';
	import type {
		TrademarkResponseData,
		Records,
		Trademark,
	} from '@/api/product/trademark/type';
	// @ts-ignore
	import type { UploadProps, UploadRawFile } from 'element-plus';
	// @ts-ignore
	import { ElMessage } from 'element-plus';

	const currentPage = ref(1);
	const pageSize = ref(5);
	// 总页数
	let total = ref(0);
	// 品牌数组
	let trademarks = reactive<Records>([]);
	// 控制对话框的显示与隐藏
	let dialogFormVisible = ref(false);
	let trademark = reactive<Trademark>({
		tmName: '',
		logoUrl: '',
	});
	// 获取el-form的组件实例
	let formRef = ref();
	// 获取商品信息
	const getTrademarkInfo = async () => {
		let trademarkInfo: TrademarkResponseData = await reqTrademarkInfo(
			currentPage.value,
			pageSize.value
		);
		total.value = trademarkInfo.data.total;
		trademarks.splice(0, trademarks.length, ...trademarkInfo.data.records);
	};

	onMounted(() => {
		getTrademarkInfo();
	});

	// 监听页码和页面数据大小
	watch(
		() => currentPage.value,
		() => {
			getTrademarkInfo();
		}
	);
	watch(
		() => pageSize.value,
		() => {
			currentPage.value = 1;
			getTrademarkInfo();
		}
	);
	const addTrademark = () => {
		Object.keys(trademark).forEach((key) => {
			// @ts-ignore
			trademark[key] = '';
		});
		dialogFormVisible.value = true;
	};
	const updateTrademark = (row: Trademark) => {
		// 点击编辑时，展示数据内容
		Object.assign(trademark, row);
		dialogFormVisible.value = true;
	};
	const cancel = () => {
		dialogFormVisible.value = false;
		// 清空表单验证错误信息
		// formRef.value?.clearValidate('logoUrl');
		// formRef.value?.clearValidate('tmName');
		nextTick(() => {
			formRef.value.clearValidate('tmName');
			formRef.value.clearValidate('logoUrl');
		});
	};
	const confirm = async () => {
		try {
			// 发送请求前，对表单进行校验
			await formRef.value.validate();
		} catch (error) {
			ElMessage({
				type: 'error',
				message: '请检查表单是否合法',
			});
			return;
		}

		try {
			let result: any = await reqAddOrUpdateTrademark(trademark);
			if (result.code == 200) {
				ElMessage({
					type: 'success',
					message: trademark.id ? '更新品牌成功' : '新增品牌成功',
				});
			} else {
				ElMessage({
					type: 'error',
					message: trademark.id
						? '更新品牌失败，请重试'
						: '新增品牌失败，请重试',
				});
			}
			dialogFormVisible.value = false;
			getTrademarkInfo();
		} catch (error) {
			ElMessage({
				type: 'error',
				message: trademark.id ? '更新品牌失败，请重试' : '新增品牌失败，请重试',
			});
		}
	};
	// 图片上传前的校验钩子
	// 在图片上传成功之前触发
	const fileTypes = ['image/jpeg', 'image/png'];
	const beforeLogoUpload: UploadProps['beforeUpload'] = (
		rawFile: UploadRawFile
	) => {
		// 判断文件格式是否正确
		if (!fileTypes.includes(rawFile.type)) {
			ElMessage({
				type: 'error',
				message: '请上传 jpg | png 类型的图片',
			});
			return false;
		}
		// 判断文件大小是否<4MB
		if (!(rawFile.size / 1024 / 1024 <= 4)) {
			ElMessage({
				type: 'error',
				message: '文件大小必须小于或等于4MB',
			});
			return false;
		}
		return true;
	};
	const handleLogoSuccess = (response: any) => {
		trademark.logoUrl = response.data;
		// 图片上传成功后，清除logo表单验证的错误信息
		formRef.value.clearValidate('logoUrl');
	};
	// 校验tmName的规则
	const validateTmName = (rule: any, value: any, callback: any) => {
		if (value.trim().length < 2) {
			callback(new Error('品牌名称必须大于等于两位'));
		}
		callback();
	};
	// 校验logoUrl的规则
	const validateLogoUrl = (rule: any, value: any, callback: any) => {
		if (!value) {
			callback(new Error('请上传logo图片'));
		}
		callback();
	};
	// 表单校验规则
	const rules = {
		tmName: [{ required: true, trigger: 'blur', validator: validateTmName }],
		logoUrl: [{ required: true, validator: validateLogoUrl }],
	};
	// 气泡确认框的回调，删除trademark
	const removeTrademark = async (trademarkId: number) => {
		try {
			let result = await reqDeleteTrademark(trademarkId);
			if (result.code === 200) {
				currentPage.value = 1;
				ElMessage({
					type: 'success',
					message: '删除品牌成功',
				});
			} else {
				ElMessage({
					type: 'error',
					message: '删除品牌失败',
				});
			}
			getTrademarkInfo();
		} catch (error) {
			ElMessage({
				type: 'error',
				message: '删除品牌失败',
			});
		}
	};
</script>

<style scoped>
	.avatar-uploader .avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed var(--el-border-color);
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
	}

	.avatar-uploader .el-upload:hover {
		border-color: var(--el-color-primary);
	}

	.el-icon.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		text-align: center;
	}
</style>
