import { SAVE_TOKEN, UPDATE_LOGIN_STAT, LOG_OUT } from "../actions/actionTypes";
import { WebCookies } from '../../Entities/Cookies';
import { updateState } from '../utility';

const initialState = {
    isLoggedIn: false
}

const createCookies = (tokens) => {
    const cookies = new WebCookies();
    const { accessToken, refreshToken } = tokens;
    cookies.setAccessToken(accessToken);
    cookies.setRefreshToken(refreshToken);
}

const updateAccessTokenCookie = (token) => {
    const cookies = new WebCookies();
    cookies.setAccessToken(token);
}

const deleteCookies = () => {
    const cookies = new WebCookies();
    cookies.removeCookies();
}

/* Managing the token reducer (redux's global state)*/
const token_reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TOKEN:
            createCookies(action.value);
            return updateState(state, { isLoggedIn: true });
        case UPDATE_LOGIN_STAT:
            if (action.value) {
                updateAccessTokenCookie(action.value);
                return updateState(state, { isLoggedIn: true });
            }
            return updateState(state, { isLoggedIn: false });
        case LOG_OUT:
            deleteCookies();
            return updateState(state, { isLoggedIn: false })
        default:
            return state;
    }
}

export default token_reducer;