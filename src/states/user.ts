import type {SelfInfo} from '@/modules/type'
import {useRouter} from "vue-router";
import {getCurrentUser} from "../plugins/request/userAPI.ts";

let currentUser: SelfInfo;

const setCurrentUserState = (user: SelfInfo) => {
    currentUser = user;
}

const getCurrentUserState = async (): SelfInfo => {
    if (!currentUser) {
        const res = await getCurrentUser()
        if (res.code !== 0) {
            const router = useRouter()
            router.replace('/user/login')
            return
        }
        currentUser = res.data
        return currentUser
    }
    return currentUser;
}

export {
    setCurrentUserState,
    getCurrentUserState,
}
