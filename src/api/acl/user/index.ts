import request from '@/utils/request';
import { RoleListResponse, UpdateUser, User, UserListResponse } from './type';

export enum Api {
	USER_LIST_URL = '/admin/acl/user/',
	ADD_USER_URL = '/admin/acl/user/save',
	UPDATE_USER_URL = '/admin/acl/user/update',
	// 获取角色信息
	ALL_ROLE_URL = '/admin/acl/user/toAssign/',
	// 更新用户角色信息
	UPDATE_USER_ROLE_LIST = '/admin/acl/user/doAssignRole',
	//  删除某个用户
	DELETE_USER_URL = '/admin/acl/user/remove/',
	BATCH_DELETE_USER_URL = '/admin/acl/user/batchRemove',
}

export const reqUserList = (
	pageNo: number,
	pageSize: number,
	username?: string
) => {
	if (username) {
		return request.get<any, UserListResponse>(
			`${Api.USER_LIST_URL}${pageNo}/${pageSize}?username=${username}`
		);
	} else {
		return request.get<any, UserListResponse>(
			`${Api.USER_LIST_URL}${pageNo}/${pageSize}`
		);
	}
};
export const reqAddOrUpdateUser = (data: User) => {
	if (data.id) {
		return request.put<any, any>(Api.UPDATE_USER_URL, data);
	} else {
		return request.post<any, any>(Api.ADD_USER_URL, data);
	}
};

export const reqRoleList = (userId: number) => {
	return request.get<any, RoleListResponse>(Api.ALL_ROLE_URL + userId);
};

export const reqUpdateUserRole = (data: UpdateUser) => {
	return request.post(Api.UPDATE_USER_ROLE_LIST, data);
};
export const reqDeleteUser = (userId: number) => {
	return request.delete(Api.DELETE_USER_URL + userId);
};
export const reqBatchDeleteUsers = (data: number[]) => {
	return request.delete(Api.BATCH_DELETE_USER_URL, { data: data });
};
