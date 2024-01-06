import {setCurrentUserState} from "../states/user.ts";
import {getCurrentUser} from "./request/userAPI.ts";

export const init = () => {
    getCurrentUser().then(res => {
        setCurrentUserState(res)
    })
}
