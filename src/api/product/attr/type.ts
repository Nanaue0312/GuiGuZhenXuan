// category相关数据通用ts类型
interface CommonResponseData {
	code: number;
	message: string;
	ok: boolean;
}
// category.data ts类型
export interface CategoryObj {
	id: number | string;
	name: string;
	createTime: string;
	updateTime: string;
	category1Id?: number;
	category2Id?: number;
}
export interface CategoryResponseData extends CommonResponseData {
	data: CategoryObj[];
}
// 属性值 ts类型
export interface AttrValue {
	id?: number;
	createTime?: string;
	updateTime?: string;
	valueName: string;
	attrId?: number;
	flag: boolean;
}

export interface AttrObj {
	id?: number;
	createTime: string;
	updateTime: string;
	attrName: string;
	categoryId: number | string;
	categoryLevel: number;
	attrValueList: AttrValue[];
}
// product attr 返回值 ts类型
export interface ProductAttrResponseData extends CommonResponseData {
	data: AttrObj[];
}
