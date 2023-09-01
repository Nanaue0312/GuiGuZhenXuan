export interface CommonResponseData {
	code: number;
	message: string;
	ok: boolean;
}

// SPU数据的ts类型
export interface SPUData {
	id?: number;
	spuName: string;
	description: string;
	category3Id: number | string;
	tmId: number | string;
	SPUSaleAttrList: HasSaleAttr[] | null;
	SPUImageList: null | SPUImg[];
}
// records：SPU数据集合
export type Records = SPUData[];
// SPUResponse
export interface SPUResponseData extends CommonResponseData {
	data: {
		records: Records;
		total: number;
		size: number;
		current: number;
		searchCount: boolean;
		pages: number;
	};
}
// 品牌数据类型
export interface Trademark {
	id: number;
	tmName: string;
	logoUrl: string;
	createTime: string;
	updateTime: string;
}
// 品牌接口返回ts类型
export interface AllTrademarkResponseData extends CommonResponseData {
	data: Trademark[];
}

// SPU下的img类型
export interface SPUImg {
	id?: number;
	updateTime?: string;
	createTime?: string;
	spuId?: number;
	imgName?: string;
	imgUrl?: string;
	name?: string;
	url?: string;
}
// SPU下的img数据response类型
export interface SPUImgResponseData extends CommonResponseData {
	data: SPUImg[];
}

// SPU的销售属性值类型
export interface SPUSaleAttrValue {
	id?: number;
	createTime: string;
	updateTime: string;
	spuId: number;
	baseSaleAttrId: number;
	saleAttrValueName: string;
	saleAttrName: string;
	isChecked: null;
}

// 已有的销售属性值数组类型
export type spuSaleAttrValueList = SPUSaleAttrValue[];
// 销售属性对象类型
export interface HasSaleAttr {
	id?: number;
	createTime?: string;
	updateTime?: string;
	spuId?: number;
	baseSaleAttrId: number | string;
	saleAttrName: string;
	saleAttrValueList: spuSaleAttrValueList;
	flag: boolean;
}

// SPU销售属性接口response类型
export interface SPUHasSaleAttrResponseData extends CommonResponseData {
	data: HasSaleAttr[];
}

// 已有全部SPU的返回数据ts类型
export interface AllSaleAttr {
	id: number;
	name: string;
}
export interface AllSaleAttrResponse extends CommonResponseData {
	data: AllSaleAttr[];
}
