export interface CommonResponse {
	code: number;
	message: string;
	ok: boolean;
}
export interface User {
	id?: number;
	createTime?: string;
	updateTime?: string;
	username?: string;
	password?: string;
	name?: string;
	phone?: null;
	roleName?: string;
}
export type Users = User[];

export interface UserListResponse extends CommonResponse {
	data: {
		records: Users;
		total: number;
		size: number;
		current: number;
		pages: number;
	};
}
// 角色信息类型
export interface Role {
	id?: number;
	createTime?: string;
	updateTime?: string;
	roleName?: string;
	remark?: null;
}
// 角色列表
export type RoleList = Role[];

export interface RoleListResponse extends CommonResponse {
	data: {
		assignRoles: RoleList;
		allRolesList: RoleList;
	};
}

// 更新用户角色接口的形参类型
export interface UpdateUser {
	roleIdList: number[];
	userId: number;
}
