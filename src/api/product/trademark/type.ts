// 品牌基础类型
export interface ProductResponse {
	code: number;
	message: string;
	ok: boolean;
}
// 品牌类型
export interface Trademark {
	id?: number;
	createTime?: string;
	updateTime?: string;
	tmName: string;
	logoUrl: string;
}
// 品牌类型数组
export type Records = Trademark[];
export interface TrademarkResponseData extends ProductResponse {
	data: {
		records: Records;
		total: number;
		size: number;
		current: number;
		optimizeCountSql: boolean;
		hitCount: boolean;
		pages: number;
	};
}
