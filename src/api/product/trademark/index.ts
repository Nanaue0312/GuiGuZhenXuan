// 品牌管理接口
import request from '@/utils/request';
import type {
	Trademark,
	TrademarkResponseData,
} from '@/api/product/trademark/type';
enum Api {
	// 获取品牌信息
	TRADEMARK_URL = `/admin/product/baseTrademark`,
	// 新增品牌数据
	ADD_TRADEMARK_URL = `/admin/product/baseTrademark/save`,
	// 更新品牌数据
	UPDATE_TRADEMARK_URL = `/admin/product/baseTrademark/update`,
	DELETE_TRADEMARK_URL = `/admin/product/baseTrademark/remove`,
}
export const reqTrademarkInfo = (currentPage: number, pageSize: number) => {
	return request.get<any, TrademarkResponseData>(
		`${Api.TRADEMARK_URL}/${currentPage}/${pageSize}`
	);
};
export const reqAddOrUpdateTrademark = (trademark: Trademark) => {
	if (trademark.id) {
		// 更新trademark
		return request.put(Api.UPDATE_TRADEMARK_URL, trademark);
	} else {
		// 新增trademark
		return request.post(Api.ADD_TRADEMARK_URL, trademark);
	}
};
// 删除一条trademark
export const reqDeleteTrademark = (id: number) => {
	return request.delete<any, any>(`${Api.DELETE_TRADEMARK_URL}/${id}`);
};
