import type {SelfInfo} from '../modules/type'

let currentUser: SelfInfo;

const setCurrentUserState = (user: SelfInfo) => {
    currentUser = user;
}

const getCurrentUserState = () : SelfInfo => {
    return currentUser;
}

export {
    setCurrentUserState,
    getCurrentUserState,
}
