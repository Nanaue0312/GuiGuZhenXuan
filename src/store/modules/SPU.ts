import { defineStore } from 'pinia';
import type { SPUState } from '@/store/modules/types/types';
import type {
	AllSaleAttrResponse,
	AllTrademarkResponseData,
	SPUData,
	SPUHasSaleAttrResponseData,
	SPUImgResponseData,
} from '@/api/product/spu/type';
import {
	reqAllTrademark,
	reqSPUImgList,
	reqSPUHasSaleAttrInfo,
	reqAllSaleAttrInfo,
} from '@/api/product/spu';
// @ts-ignore
import { ElMessage } from 'element-plus';
export default defineStore('SPU', {
	state(): SPUState {
		return {
			// SPU场景切换控制器
			scene: 0,
			allTrademark: [],
			SPUImgList: [],
			SPUSaleAttr: [],
			allSaleAttr: [],
			spuData: {
				spuName: '',
				description: '',
				category3Id: '',
				tmId: '',
				SPUSaleAttrList: null,
				SPUImageList: null,
			},
		};
	},
	actions: {
		async initHasSPUData(row: SPUData) {
			// 获取全部品牌数据
			let allTrademarkRes: AllTrademarkResponseData = await reqAllTrademark();
			// 获取某一个品牌旗下的全部售卖商品的图片
			let SPUImgListRes: SPUImgResponseData = await reqSPUImgList(row.id);
			let SPUSaleAttrRes: SPUHasSaleAttrResponseData =
				await reqSPUHasSaleAttrInfo(
					// 获取已有的SPU销售属性的数据
					row.id
				);
			let allSaleAttrRes: AllSaleAttrResponse = await reqAllSaleAttrInfo();
			// 存储获取到的数据
			this.allTrademark = allTrademarkRes.data;
			this.SPUImgList = SPUImgListRes.data.map((img) => {
				return {
					name: img.imgName,
					url: img.imgUrl,
				};
			});
			this.SPUSaleAttr = SPUSaleAttrRes.data;
			this.allSaleAttr = allSaleAttrRes.data;
			this.spuData = row;
		},
	},
	getters: {
		// 计算当前spu还未拥有的销售属性
		unSelectedSaleAttr(): any {
			return this.allSaleAttr.filter((saleAttr) =>
				this.SPUSaleAttr.every((item) => {
					return item.saleAttrName !== saleAttr.name;
				})
			);
		},
	},
});
