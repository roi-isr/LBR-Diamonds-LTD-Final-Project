import { SAVE_TOKEN, UPDATE_LOGIN_STAT } from "../actions/actions";
import Cookies from "universal-cookie";

const initialState = {
    token_string: "",
    isLoggedIn: false
}

// Verify token through the server


const token_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            const cookies = new Cookies();
            cookies.set('tokenStr', action.value, { path: '/' });
            return { ...state, isLoggedIn: true, token_string: action.value }
        case UPDATE_LOGIN_STAT:
            // Server validation of sent token
            // const token = action.value;
            //     console.log(loginStat);
            //     if (loginStat)
            //        
            //     return { ...state, isLoggedIn: false };
            if (action.value)
                return { ...state, isLoggedIn: true, token_string: action.value };
            return { ...state, isLoggedIn: false };
        default:
            return state;
    }
}

export default token_reducer;