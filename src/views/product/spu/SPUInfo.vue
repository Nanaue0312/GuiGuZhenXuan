<template>
	<div>
		<el-button
			type="primary"
			size="default"
			@click="addSPU"
			icon="Plus"
			:disabled="!categoryStore.c3Id">
			添加SPU
		</el-button>
		<el-table border stripe :data="SPUInfo">
			<el-table-column
				label="序号"
				type="index"
				width="80"
				align="center"></el-table-column>
			<el-table-column label="SPU名称" prop="spuName"> </el-table-column>
			<el-table-column label="SPU描述" prop="description" show-overflow-tooltip>
			</el-table-column>
			<el-table-column label="SPU操作">
				<template #="{ row, $index }">
					<el-button
						type="primary"
						size="small"
						@click=""
						icon="Plus"
						title="添加SKU">
					</el-button>
					<el-button
						type="warning"
						size="small"
						@click="editSPU(row)"
						icon="Edit"
						title="修改已有的SPU">
					</el-button>
					<el-button
						type="info"
						size="small"
						@click=""
						icon="View"
						title="查看已有的SPU">
					</el-button>
					<el-button
						type="danger"
						size="small"
						@click=""
						icon="Delete"
						title="删除SPU">
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			v-model:current-page="pageNo"
			v-model:page-size="pageSize"
			:page-sizes="[3, 5, 10]"
			:background="true"
			:total="total"
			layout=" prev, pager, next, jumper,->,sizes,total, " />
	</div>
</template>

<script setup lang="ts">
	import { reqProductSPUInfo } from '@/api/product/spu';
	import type {
		Records,
		SPUData,
		SPUResponseData,
	} from '@/api/product/spu/type';
	import { ref, watch } from 'vue';
	// @ts-ignore
	import { ElMessage } from 'element-plus';
	import useCategoryStore from '@/store/modules/category';
	import useSPUStore from '@/store/modules/SPU';

	// 获取category仓库
	let categoryStore = useCategoryStore();
	// 获取SPU仓库
	let SPUStore = useSPUStore();
	// 当前页码
	let pageNo = ref<number>(1);
	let pageSize = ref<number>(5);
	// SPU数据列表
	let SPUInfo = ref<Records>([]);
	// 存储SPU记录的个数
	let total = ref<number>(0);
	// 监听c3Id，改变则获取SPU列表
	watch(
		() => categoryStore.c3Id,
		async () => {
			if (!categoryStore.c3Id) {
				return;
			}
			getSPUInfo(pageNo.value, pageSize.value, categoryStore.c3Id);
		}
	);
	// 监听pageNo的改变，获取SPU数据
	watch(
		() => pageNo.value,
		() => {
			getSPUInfo(pageNo.value, pageSize.value, categoryStore.c3Id);
		}
	);
	// 当pagesize改变时，获取SPU数据
	watch(
		() => pageSize.value,
		() => {
			pageNo.value = 1;
			getSPUInfo(pageNo.value, pageSize.value, categoryStore.c3Id);
		}
	);
	// 获取SPU数据
	async function getSPUInfo(
		pageNo: number,
		pageSize: number,
		c3Id: number | string
	) {
		try {
			let result: SPUResponseData = await reqProductSPUInfo(
				pageNo,
				pageSize,
				c3Id
			);
			if (result.code === 200) {
				SPUInfo.value = result.data.records;
				total.value = result.data.total;
			} else {
				ElMessage({
					type: 'error',
					message: '请求发生错误，请重试',
				});
			}
		} catch (error) {
			ElMessage({
				type: 'error',
				message: '请求发生错误，请重试',
			});
		}
	}
	// 新增SPU，切换场景
	const addSPU = () => {
		SPUStore.scene = 1;
	};
	// 修改SPU信息
	const editSPU = (row: SPUData) => {
		SPUStore.scene = 1;
		SPUStore.initHasSPUData(row);
	};
</script>

<style scoped></style>
