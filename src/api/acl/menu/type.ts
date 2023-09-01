export interface CommonResponse {
	code: number;
	message: string;
	ok: boolean;
}
// 菜单数据
export interface Permission {
	id?: number;
	createTime?: string;
	updateTime?: string;
	pid?: number;
	name?: string;
	code?: null;
	toCode?: null;
	type?: number;
	status?: null;
	level?: number;
	children?: Permission[];
	select?: boolean;
}
export interface PermissionResponse extends CommonResponse {
	data: Permission[];
}

export interface MenuParams {
	id?: number;
	pid?: number;
	name?: string;
	level?: number;
	code?: null;
}
