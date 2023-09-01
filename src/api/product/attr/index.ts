import request from '@/utils/request';
import {
	AttrObj,
	CategoryResponseData,
	ProductAttrResponseData,
} from '@/api/product/attr/type';

// 属性管理接口
export enum Api {
	// 获取各级分类数据接口
	C1_URL = '/admin/product/getCategory1',
	C2_URl = '/admin/product/getCategory2/',
	C3_URL = '/admin/product/getCategory3/',
	// 对应商品的属性接口
	PRODUCT_ATTR_URL = '/admin/product/attrInfoList/',
	// 新增或更新商品属性接口
	SAVE_PRODUCT_URL = '/admin/product/saveAttrInfo',
	DELETE_ATTR_URL = '/admin/product/deleteAttr/',
}
// 获取各级分类信息
export const reqC1Info = () => {
	return request.get<any, CategoryResponseData>(Api.C1_URL);
};
export const reqC2Info = (c1Id: number | string) => {
	return request.get<any, CategoryResponseData>(Api.C2_URl + c1Id);
};
export const reqC3Info = (c2Id: number | string) => {
	return request.get<any, CategoryResponseData>(Api.C3_URL + c2Id);
};

// 获取对应分类下的属性和属性值
export const reqProductAttr = (
	category1Id: string | number,
	category2Id: string | number,
	category3Id: string | number
) => {
	return request.get<any, ProductAttrResponseData>(
		`${Api.PRODUCT_ATTR_URL}${category1Id}/${category2Id}/${category3Id}`
	);
};

// 新增或更新商品属性
export const reqSaveProduct = (data: AttrObj) => {
	return request.post<any, any>(Api.SAVE_PRODUCT_URL, data);
};
export const reqDeleteAttr = (attrId: number) => {
	return request.delete<any, any>(Api.DELETE_ATTR_URL + attrId);
};
