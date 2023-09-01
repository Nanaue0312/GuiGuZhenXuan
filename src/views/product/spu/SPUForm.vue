<template>
	<el-form label-width="100px">
		<el-form-item label="SPU名称">
			<el-input
				placeholder="请你输入SPU的名称"
				size="default"
				clearable
				v-model="SPUStore.spuData.spuName"></el-input>
		</el-form-item>
		<el-form-item label="SPU品牌">
			<el-select v-model="value">
				<el-option
					v-for="trademark in SPUStore.allTrademark"
					:key="trademark.id"
					:label="trademark.tmName"
					:value="trademark.id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="SPU描述">
			<el-input
				type="textarea"
				placeholder="请你输入SPU的描述"
				size="default"
				clearable
				v-model="SPUStore.spuData.description"></el-input>
		</el-form-item>
		<el-form-item label="SPU图片">
			<el-upload
				v-model:file-list="SPUStore.SPUImgList"
				action="/api/admin/product/fileUpload"
				list-type="picture-card"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:before-upload="handleBeforeUpload">
				<el-icon><Plus /></el-icon>
			</el-upload>
			<el-dialog v-model="dialogVisible">
				<img
					w-full
					:src="dialogImageUrl"
					alt="Preview Image"
					style="width: 100%; height: 100%" />
			</el-dialog>
		</el-form-item>
		<el-form-item label="SPU销售属性">
			<!-- 展示销售属性的下拉菜单那 -->
			<el-select
				v-model="unSelectedAttr"
				:placeholder="
					SPUStore.unSelectedSaleAttr.length
						? `还有${SPUStore.unSelectedSaleAttr.length}个未选择`
						: '无可选属性'
				">
				<el-option
					v-for="saleAttr in SPUStore.unSelectedSaleAttr"
					:key="saleAttr.id"
					:label="saleAttr.name"
					:value="`${saleAttr.id}:${saleAttr.name}`"></el-option>
			</el-select>
			<el-button
				:disabled="!unSelectedAttr"
				type="primary"
				size="default"
				@click="addSaleAttr"
				icon="Plus"
				style="margin-left: 10px">
				添加属性值
			</el-button>
			<el-table style="margin: 10px 0px" :data="SPUSaleAttr">
				<el-table-column
					label="序号"
					type="index"
					align="center"
					width="80px"></el-table-column>
				<el-table-column
					label="销售属性名"
					align="center"
					width="100px"
					prop="saleAttrName"></el-table-column>
				<el-table-column label="销售属性值" align="center">
					<template #="{ row }">
						<el-tag
							style="margin: 0px 5px"
							v-for="saleAttrValue in row.spuSaleAttrValueList"
							:key="saleAttrValue.id"
							closable>
							{{ saleAttrValue.saleAttrValueName }}
						</el-tag>
						<el-input
							v-if="row.flag == true"
							placeholder="请输入属性值"
							size="small"
							clearable
							@change=""></el-input>
						<el-button v-else size="small" @click="toEdit">
							+ New Tag
						</el-button>
					</template>
				</el-table-column>
				<el-table-column
					border
					stripe
					label="操作"
					align="center"
					width="140px">
					<template #="{ row, $index }">
						<el-button
							type="danger"
							size="small"
							@click="SPUStore.SPUSaleAttr.splice($index, 1)">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" size="default" @click="">保存</el-button>
			<el-button type="default" size="default" @click="cancel">取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang="ts">
	import useSPUStore from '@/store/modules/SPU';
	import { ref } from 'vue';
	// @ts-ignore
	import type { UploadRawFile } from 'element-plus';
	// @ts-ignore
	import { ElMessage } from 'element-plus';
	import type { HasSaleAttr } from '@/api/product/spu/type';
	// 获取SPU仓库
	let SPUStore = useSPUStore();
	// 切换SPU场景
	const cancel = () => {
		SPUStore.scene = 0;
	};
	// select默认选中的值
	let value = ref('');
	// 第二个select默认选中的值
	let unSelectedAttr = ref('');
	// 预览对话框的数据
	const dialogImageUrl = ref<string>('');
	const dialogVisible = ref<boolean>(false);
	let SPUSaleAttr = SPUStore.SPUSaleAttr;

	// 照片墙预览按钮的函数
	const handlePreview = (img: any) => {
		// 弹出对话框
		dialogVisible.value = true;
		dialogImageUrl.value = img.url;
	};
	// 照片墙删除照片的函数
	const handleRemove = (img: any) => {
		console.log(img);
	};
	// 照片墙上传前的钩子
	const handleBeforeUpload = (rawFile: any) => {
		if (['image/png', 'image/jpeg'].includes(rawFile.type)) {
			if (rawFile.size / 1024 / 1024 <= 3) {
				return true;
			} else {
				ElMessage({
					type: 'error',
					message: '上传文件大小超过3MB',
				});
				return false;
			}
		} else {
			ElMessage({
				type: 'error',
				message: '上传类型错误，请上传jpg或者png类型的文件',
			});
			return false;
		}
	};
	// 添加销售属性
	const addSaleAttr = () => {
		let [baseSaleAttrId, saleAttrName] = unSelectedAttr.value.split(':');
		let saleAttrObj: HasSaleAttr = {
			baseSaleAttrId,
			saleAttrName,
			saleAttrValueList: [],
			flag: false,
		};
		SPUStore.SPUSaleAttr.push(saleAttrObj);
		unSelectedAttr.value = '';
	};
	const toEdit = (row: HasSaleAttr) => {
		console.log(123);

		row.flag = true;
		console.log(row.flag);
	};
</script>

<style scoped></style>
