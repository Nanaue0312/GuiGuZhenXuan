<template>
	<div>
		<Category :scene="scene"></Category>
		<el-card shadow="always" style="margin: 10px 0px">
			<!-- 属性列表展示 -->
			<template v-if="scene === 0">
				<el-button
					type="primary"
					size="default"
					@click="addAttr"
					icon="Plus"
					:disabled="categoryStore.c3Id === ''">
					添加平台属性
				</el-button>
				<el-table
					:data="categoryStore.attrObjs"
					stripe
					border
					style="margin: 5px 0px">
					<el-table-column
						label="序号"
						type="index"
						align="center"
						width="80px">
					</el-table-column>
					<el-table-column
						label="属性名称"
						prop="attrName"
						align="center"
						width="120px">
					</el-table-column>
					<el-table-column label="属性值名称" align="center">
						<template #default="{ row, $index }">
							<el-tag
								v-for="attr in row.attrValueList"
								:key="$index"
								style="margin: 5px">
								{{ attr.valueName }}
							</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="120px">
						<template #default="{ row }">
							<el-button
								type="primary"
								size="small"
								@click="updateAttr(row)"
								icon="Edit">
							</el-button>
							<el-popconfirm
								title="您确定要删除这条属性吗?"
								@confirm="deleteAttr(row.id)"
								width="220px">
								<template #reference>
									<el-button type="danger" size="small" icon="Delete">
									</el-button>
								</template>
							</el-popconfirm>
						</template>
					</el-table-column>
				</el-table>
			</template>
			<!-- 展示添加属性及修改属性结构 -->
			<template v-else>
				<el-form :inline="true">
					<el-form-item label="属性名称">
						<el-input
							placeholder="请输入属性名称"
							clearable
							v-model="attrParams.attrName"></el-input>
					</el-form-item>
				</el-form>
				<el-button
					type="primary"
					size="default"
					@click="addAttrValue"
					icon="Plus"
					:disabled="!attrParams.attrName">
					添加属性值
				</el-button>
				<el-table
					border
					style="margin: 5px 0px"
					:data="attrParams.attrValueList">
					<el-table-column
						label="序号"
						width="80px"
						align="center"
						type="index">
					</el-table-column>
					<el-table-column label="属性值名称">
						<template #="{ row, $index }">
							<el-input
								v-if="row.flag"
								placeholder="请输入属性值名称"
								v-model="row.valueName"
								clearable
								:ref="(vc:any)=>inputArr[$index] = vc"
								@blur="toViewMode(row, $index)"></el-input>
							<div v-if="!row.flag" @click="toEditMode(row, $index)">
								{{ row.valueName }}
							</div>
						</template>
					</el-table-column>
					<el-table-column label="属性值操作">
						<template #="{ row, $index }">
							<el-button
								type="danger"
								size="small"
								@click="() => attrParams.attrValueList.splice($index, 1)"
								icon="Delete"
								:disabled="row.flag"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-button
					type="primary"
					size="default"
					icon="Plus"
					@click="saveAttrValue">
					保存
				</el-button>
				<el-button type="default" size="default" @click="cancel"
					>取消</el-button
				>
			</template>
		</el-card>
	</div>
</template>

<script setup lang="ts">
	import type { AttrObj, AttrValue } from '@/api/product/attr/type';
	import useCategoryStore from '@/store/modules/category';
	import { reqSaveProduct } from '@/api/product/attr';
	import { nextTick, onUnmounted, reactive, ref, watch } from 'vue';
	// @ts-ignore
	import { ElMessage } from 'element-plus';
	import { reqDeleteAttr } from '@/api/product/attr';
	let categoryStore = useCategoryStore();

	// 定义card组件内容切换变量，true=显示table数据，false显示新增操作表单
	let scene = ref<number>(0);

	// 保存新增的属性对象
	let attrParams = reactive<AttrObj>({
		attrName: '', // 新增属性名
		attrValueList: [], //新增属性值数组
		categoryId: '', // 添加属性的对应分类
		categoryLevel: 3, // 分类的等级
		createTime: '',
		updateTime: '',
	});
	// 收集el-input组件实例
	let inputArr = ref<any>([]);
	// 监听3级分类，发送获取属性信息请求
	watch(
		() => categoryStore.c3Id,
		() => {
			if (categoryStore.c3Id !== '') {
				categoryStore.getProductAttrInfo();
			}
		}
	);
	// 添加属性按钮的回调
	const addAttr = () => {
		scene.value = 1;
		// 每次新增数据前清空数据
		Object.assign(attrParams, {
			attrName: '', // 新增属性名
			attrValueList: [], //新增属性值数组
			// 收集三级分类的id
			categoryId: categoryStore.c3Id, // 添加属性的对应分类,
			categoryLevel: 3, // 分类的等级
			createTime: '',
			updateTime: '',
		});
	};
	// 修改属性回调
	const updateAttr = (row: AttrObj) => {
		scene.value = 1;
		Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
	};
	// 取消按钮的回调
	const cancel = () => {
		scene.value = 0;
	};
	// 添加属性值
	const addAttrValue = () => {
		attrParams.attrValueList.push({
			valueName: '',
			createTime: new Date().toISOString(),
			updateTime: new Date().toISOString(),
			// 控制属性值中的编辑模式或查看模式的切换
			flag: true,
		});
		focusInput(attrParams.attrValueList.length - 1);
	};
	// 保存新增的属性
	const saveAttrValue = async () => {
		let result: any = await reqSaveProduct(attrParams);
		if (result.code === 200) {
			// 添加成功，切换场景
			scene.value = 0;
			ElMessage({
				type: 'success',
				message: attrParams.id ? '修改属性成功' : '新增属性成功',
			});
			categoryStore.getProductAttrInfo();
		} else {
			ElMessage({
				type: 'error',
				message: attrParams.id ? '修改属性失败' : '新增属性失败',
			});
		}
	};
	// 切换为查看模式
	const toViewMode = (target: AttrValue, $index: number) => {
		if (target.valueName === '') {
			ElMessage({
				type: 'warning',
				message: '属性值不能为空',
			});
			attrParams.attrValueList.splice($index, 1);
			return;
		}
		const repeat = attrParams.attrValueList.find((attrValue) => {
			if (attrValue !== target) {
				return attrValue.valueName === target.valueName;
			}
		});
		if (repeat) {
			ElMessage({
				type: 'warning',
				message: '属性值不能重复',
			});
			attrParams.attrValueList.splice($index, 1);
			return;
		}
		target.flag = false;
	};
	const toEditMode = (target: AttrValue, $index: number) => {
		target.flag = true;
		focusInput($index);
	};
	/**
	 * 聚焦el-input
	 * @param $index 需要聚焦的el-input在inputArr的下标
	 */
	const focusInput = ($index: number) => {
		nextTick(() => {
			inputArr.value[$index].focus();
		});
	};
	const deleteAttr = async (attrId: number) => {
		try {
			let result: any = await reqDeleteAttr(attrId);
			if (result.code === 200) {
				ElMessage({
					type: 'success',
					message: '删除成功',
				});
				categoryStore.getProductAttrInfo();
			} else {
				ElMessage({
					type: 'error',
					message: '删除失败',
				});
			}
		} catch (error) {
			ElMessage({
				type: 'error',
				message: '删除失败',
			});
		}
	};
	onUnmounted(() => {
		categoryStore.$reset();
	});
</script>

<style scoped></style>
