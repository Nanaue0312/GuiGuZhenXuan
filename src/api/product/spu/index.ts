// SPU接口管理
import request from '@/utils/request';
import type {
	AllTrademarkResponseData,
	AllSaleAttrResponse,
	SPUImgResponseData,
	SPUResponseData,
	SPUHasSaleAttrResponseData,
	SPUData,
} from '@/api/product/spu/type';
enum Api {
	// 获取spu数据列表
	PRODUCT_SPU_INFO_URL = '/admin/product',
	// 获取全部SPU品牌数据
	ALL_TRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
	// 获取某个SPU的全部售卖商品图片
	Img_URL = '/admin/product/spuImageList/',
	// 获取某个SPU下的全部销售属性
	SPU_SALE_ATTR_URL = '/admin/product/spuSaleAttrList/',
	// 获取整个项目全部的销售属性[颜色，版本，尺码]
	ALL_SALE_ATTR_URL = '/admin/product/baseSaleAttrList',
	// 新增一个SPU
	ADD_SPU_URL = '/admin/product/saveSpuInfo',
	UPDATE_SPU_URL = '/admin/product/updateSpuInfo',
}
export const reqProductSPUInfo = (
	pageNo: number,
	pageSize: number,
	category3Id: number | string
) => {
	return request.get<any, SPUResponseData>(
		`${Api.PRODUCT_SPU_INFO_URL}/${pageNo}/${pageSize}?category3Id=${category3Id}`
	);
};
export const reqAllTrademark = () => {
	return request.get<any, AllTrademarkResponseData>(Api.ALL_TRADEMARK_URL);
};
export const reqSPUImgList = (spuId: number | undefined) => {
	return request.get<any, SPUImgResponseData>(Api.Img_URL + spuId);
};
// 获取某个SPU已有的销售属性
export const reqSPUHasSaleAttrInfo = (spuId: number | undefined) => {
	return request.get<any, SPUHasSaleAttrResponseData>(
		Api.SPU_SALE_ATTR_URL + spuId
	);
};

// 获取全部的销售属性
export const reqAllSaleAttrInfo = () => {
	return request.get<any, AllSaleAttrResponse>(Api.ALL_SALE_ATTR_URL);
};

/**
 * 添加或者更新一个SPU
 * @param data  新增或需要更新的SPU对象
 */
export const reqAddOrUpdateSPU = (data: SPUData) => {
	if (data.id) {
		return request.post<any, any>(Api.UPDATE_SPU_URL, data);
	} else {
		return request.post<any, any>(Api.ADD_SPU_URL, data);
	}
};
