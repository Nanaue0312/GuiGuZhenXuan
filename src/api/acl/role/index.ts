import request from '@/utils/request';
import { Role, RoleListResponse, RolePermissionInfoResponse } from './type';

export enum Api {
	ROLE_LIST_URL = '/admin/acl/role',
	ADD_ROLE_URL = '/admin/acl/role/save',
	UPDATE_ROLE_URL = '/admin/acl/role/update',
	ALL_PERMISSION_URL = '/admin/acl/permission/toAssign/',
	UPDATE_ROLE_PERMISSION_URL = '/admin/acl/permission/doAssign',
	DELETE_ROLE_URL = '/admin/acl/role/remove/',
	BATCH_DELETE_ROLE_URL = '/admin/acl/role/batchRemove',
}
export const reqRoleList = (
	pageNo: number,
	pageSize: number,
	roleName?: string
) => {
	if (roleName) {
		return request.get<any, RoleListResponse>(
			`${Api.ROLE_LIST_URL}/${pageNo}/${pageSize}?roleName=${roleName}`
		);
	} else {
		return request.get<any, RoleListResponse>(
			`${Api.ROLE_LIST_URL}/${pageNo}/${pageSize}`
		);
	}
};

export const reqAddOrUpdateRole = (data: Role) => {
	if (data.id) {
		return request.put(Api.UPDATE_ROLE_URL, data);
	} else {
		return request.post(Api.ADD_ROLE_URL, data);
	}
};

export const reqAllPermissionByRoleId = (roleId: number) => {
	return request.get<any, RolePermissionInfoResponse>(
		Api.ALL_PERMISSION_URL + roleId
	);
};
export const reqUpdateRolePermission = (
	roleId: number,
	selectedPermissionId: number[]
) => {
	return request.post(
		`${Api.UPDATE_ROLE_PERMISSION_URL}?roleId=${roleId}&permissionId=${selectedPermissionId}`
	);
};

export const reqDeleteRole = (roleId: number) => {
	return request.delete(Api.DELETE_ROLE_URL + roleId);
};
export const reqBatchDeleteRole = (ids: number[]) => {
	return request.delete(Api.BATCH_DELETE_ROLE_URL, { data: ids });
};
