export interface CommonResponse {
	code: number;
	message: string;
	ok: boolean;
}
export interface Role {
	id?: number;
	createTime?: string;
	updateTime?: string;
	roleName?: string;
	remark?: null;
}
export type RoleList = Role[];
export interface RoleListResponse extends CommonResponse {
	data: {
		records: RoleList;
		total: number;
		size: number;
		current: number;
		orders: [];
		optimizeCountSql: boolean;
		hitCount: boolean;
		countId: null;
		maxLimit: null;
		searchCount: boolean;
		pages: number;
	};
}

export interface RolePermissionInfo {
	id?: number;
	createTime?: string;
	updateTime?: string;
	pid?: number;
	name?: '全部数据';
	code?: null;
	toCode?: null;
	type?: number;
	status?: null;
	level?: number;
	children?: RolePermissionInfo[];
	select?: boolean;
}

export interface RolePermissionInfoResponse extends CommonResponse {
	data: RolePermissionInfo[];
}
