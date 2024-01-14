import type {SelfInfo} from '@/modules/type'
import {getCurrentUser} from "../plugins/request/userAPI.ts";

let currentUser: SelfInfo;

const setCurrentUserState = (user: SelfInfo) => {
    currentUser = user;
}

const getCurrentUserState = async (): SelfInfo => {
    if (!currentUser) {
        const res = await getCurrentUser()
        currentUser = res.data
        return currentUser
    }
    return currentUser;
}

export {
    setCurrentUserState,
    getCurrentUserState,
}
