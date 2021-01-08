import { SAVE_TOKEN, UPDATE_LOGIN_STAT, LOG_OUT } from "../actions/actionTypes";
import Cookies from "universal-cookie";
import { updateState } from '../utility'

const initialState = {
    token_string: "",
    isLoggedIn: false
}

/* Managing the token reducer (redux's global state)*/
const token_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            const cookies = new Cookies();
            cookies.set('tokenStr', action.value, { path: '/' });
            return updateState(state, { isLoggedIn: true, token_string: action.value });
        case UPDATE_LOGIN_STAT:
            if (action.value)
                return updateState(state, { isLoggedIn: true, token_string: action.value });
            return updateState(state, { isLoggedIn: false });
        case LOG_OUT:
            return updateState(state, { isLoggedIn: false })
        default:
            return state;
    }
}

export default token_reducer;