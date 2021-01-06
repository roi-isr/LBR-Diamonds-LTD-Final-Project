import { SAVE_TOKEN, UPDATE_LOGIN_STAT } from "../actions/actions";
import Cookies from "universal-cookie";

const initialState = {
    token_string: "",
    isLoggedIn: false
}

// Verify token through the server
const verify_token = (token) => {
    return new Promise((resolve, reject) => {
        fetch("http://127.0.0.1:5000/verify-token",
            {
                method: 'GET',
                headers:
                {
                    'Authorization': `JWT ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.auth) {
                    console.log(data.auth)
                    resolve(true);
                }
                else {
                    console.log("Unverified token");
                    resolve(false);
                }
            })
            .catch((e) => reject(Error(e.name)))
    });
}

const token_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            const cookies = new Cookies();
            cookies.set('tokenStr', action.value, { path: '/' })
            return { ...state, isLoggedIn: true, token_string: action.value }
        case UPDATE_LOGIN_STAT:
            // Server validation of sent token
            const token = action.value;
            verify_token(token).then(loginStat => {
                console.log(loginStat);
                if (loginStat)
                    return { ...state, isLoggedIn: true, token_string: action.value };
                return { ...state, isLoggedIn: true, token_string: action.value };
            });
            return null;
        default:
            return state;
    }
}

export default token_reducer;