import { SAVE_TOKEN, UPDATE_LOGIN_STAT, LOG_OUT } from "../actions/actions";
import Cookies from "universal-cookie";

const initialState = {
    token_string: "",
    isLoggedIn: false
}

const token_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            const cookies = new Cookies();
            cookies.set('tokenStr', action.value, { path: '/' });
            return { ...state, isLoggedIn: true, token_string: action.value }
        case UPDATE_LOGIN_STAT:
            if (action.value)
                return { ...state, isLoggedIn: true, token_string: action.value };
            return { ...state, isLoggedIn: false };
        case LOG_OUT:
            return { ...state, isLoggedIn: false }
        default:
            return state;
    }
}

export default token_reducer;