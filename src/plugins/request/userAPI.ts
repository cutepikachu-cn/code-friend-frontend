import request from './request.ts'
import {Page, SelfInfo, User} from '@/modules/type'
import {getCurrentUserState} from "@/states/user.ts";
import {SearchUserParams, UserLoginParams} from "@/modules/requestParams";
import {BaseResponse} from "../../modules/type";
import {UpdateUserParams} from "../../modules/requestParams";

export function searchUsers(params: SearchUserParams): BaseResponse<Page<User>> {
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

export async function updateUser(params: UpdateUserParams): BaseResponse<SelfInfo> {
    const currentUser = await getCurrentUserState()
    return request.put('/user/update', {
        ...params,
        id: currentUser?.id
    })
}

export function getCurrentUser(): BaseResponse<SelfInfo> {
    return request.get(`/user/current`);
}

export function userLogin(params: UserLoginParams): BaseResponse<SelfInfo> {
    return request.post('/user/login', {
        ...params
    })
}

export function userLogout(): BaseResponse<string> {
    return request.post(`/user/logout`);
}
