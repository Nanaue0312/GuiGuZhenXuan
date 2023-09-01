import { CategoryObj, AttrObj } from '@/api/product/attr/type';
import type {
	HasSaleAttr,
	SPUData,
	SPUImg,
	AllSaleAttr,
	Trademark,
} from '@/api/product/spu/type';
import type { RouteRecordRaw } from 'vue-router';
// 定义User小仓库数据的类型
export interface UserState {
	token: string | null;
	menuRoutes: RouteRecordRaw[];
	user: {
		username: string;
		avatar: string;
	};
}

// categoryStore.state对象类型
export interface CategoryState {
	c1Infos: CategoryObj[];
	c1Id: string | number;
	c2Infos: CategoryObj[];
	c2Id: string | number;
	c3Infos: CategoryObj[];
	c3Id: string | number;
	attrObjs: AttrObj[];
}
export interface SPUState {
	scene: number;
	allTrademark: Trademark[];
	SPUImgList: SPUImg[];
	SPUSaleAttr: HasSaleAttr[];
	allSaleAttr: AllSaleAttr[];
	spuData: SPUData;
}
