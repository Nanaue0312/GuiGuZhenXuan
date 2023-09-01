import request from '@/utils/request';
import { MenuParams, PermissionResponse } from './type';

export enum Api {
	GET_PERMISSION_URL = '/admin/acl/permission',
	ADD_PERMISSION_URL = '/admin/acl/permission/save',
	UPDATE_PERMISSION_URL = '/admin/acl/permission/update',
	DELETE_PERMISSION_URL = '/admin/acl/permission/remove/',
}

export const reqGetAllPermission = () => {
	return request.get<any, PermissionResponse>(Api.GET_PERMISSION_URL);
};

export const reqAddOrUpdatePermission = (data: MenuParams) => {
	if (data.id) {
		return request.put(Api.UPDATE_PERMISSION_URL, data);
	} else {
		return request.post(Api.ADD_PERMISSION_URL, data);
	}
};
export const reqDeletePermission = (id: number) => {
	return request.delete(Api.DELETE_PERMISSION_URL + id);
};
