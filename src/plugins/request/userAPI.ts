import request from './request.ts'
import {Page, SelfInfo, User} from '../../modules/type'
import {getCurrentUserState} from "../../states/user.ts";
import {SearchUserParams, UserLoginParams} from "../../modules/requestParams";

export function searchUsers(params: SearchUserParams): Promise<Page<User>> {
    const {current= 1, size= 5} = params
    return request.get(`/user/search`, {
        params: {
            ...params,
            current,
            size,
            tags: params.tags?.join(',')
        }
    });
}

export function updateUser(editKey: string, keyValue: any): Promise<SelfInfo> {
    const currentUser = getCurrentUserState()
    return request.put('/user/update', {
        id: currentUser?.id,
        [editKey]: keyValue
    })
}

export function getCurrentUser(): Promise<SelfInfo> {
    return request.get(`/user/current`);
}

export function userLogin(params: UserLoginParams): Promise<SelfInfo> {
    return request.post('/user/login', {
        ...params
    })
}

export function userLogout(): Promise<string> {
    return request.post(`/user/logout`);
}
