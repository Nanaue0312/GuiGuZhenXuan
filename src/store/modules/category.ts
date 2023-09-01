import {
	reqC1Info,
	reqC2Info,
	reqC3Info,
	reqProductAttr,
} from '@/api/product/attr';
import { defineStore } from 'pinia';
import type {
	CategoryResponseData,
	ProductAttrResponseData,
} from '@/api/product/attr/type';
import type { CategoryState } from '@/store/modules/types/types';
// @ts-ignore
import { ElMessage } from 'element-plus';
// 商品分类组件的仓库
export default defineStore('Category', {
	state(): CategoryState {
		return {
			// 收集一级分类数据
			c1Infos: [],
			c1Id: '',
			// 收集二级分类数据
			c2Infos: [],
			c2Id: '',
			// 收集三级分类数据
			c3Infos: [],
			c3Id: '',
			// 相应产品数据
			attrObjs: [],
		};
	},
	actions: {
		// 获取一级分类数据
		async getC1Info() {
			try {
				let result: CategoryResponseData = await reqC1Info();
				if (result.code === 200) {
					this.c1Infos = result.data;
				} else {
					// @ts-ignore
					ElMessage({
						type: 'error',
						message: '获取二级分类数据失败，请重试!',
					});
				}
			} catch (error) {
				// @ts-ignore
				ElMessage({
					type: 'error',
					message: '获取二级分类数据失败，请重试!',
				});
			}
		},
		// 获取二级分类数据
		async getC2Info() {
			try {
				let result: CategoryResponseData = await reqC2Info(this.c1Id);
				if (result.code === 200) {
					this.c2Infos = result.data;
				} else {
					// @ts-ignore
					ElMessage({
						type: 'error',
						message: '获取二级分类数据失败，请重试!',
					});
				}
			} catch (error) {
				// @ts-ignore
				ElMessage({
					type: 'error',
					message: '获取二级分类数据失败，请重试!',
				});
			}
		},
		// 获取三级分类数据
		async getC3Info() {
			try {
				let result: CategoryResponseData = await reqC3Info(this.c2Id);
				if (result.code === 200) {
					this.c3Infos = result.data;
				} else {
					// @ts-ignore
					ElMessage({
						type: 'error',
						message: '获取三级分类数据失败，请重试!',
					});
				}
			} catch (error) {
				// @ts-ignore
				ElMessage({
					type: 'error',
					message: '获取三级分类数据失败，请重试!',
				});
			}
		},
		// 获取相应产品属性列表数据
		async getProductAttrInfo() {
			try {
				let result: ProductAttrResponseData = await reqProductAttr(
					this.c1Id,
					this.c2Id,
					this.c3Id
				);
				if (result.code === 200) {
					this.attrObjs = result.data;
				} else {
					ElMessage({
						type: 'error',
						message: '获取品牌属性失败，请重试!',
					});
				}
			} catch (error) {
				ElMessage({
					type: 'error',
					message: '获取品牌属性失败，请重试!',
				});
			}
		},
	},
	getters: {},
});
