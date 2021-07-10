import { SAVE_TOKEN, UPDATE_LOGIN_STAT, LOG_OUT } from './actionTypes';
import { refreshToken } from '../../ApiEndpoints/Authentication'

// Save a token
export const save_token = (val) => {
    return {
        type: SAVE_TOKEN,
        value: val
    }
}

const update_login = val => {
    return {
        type: UPDATE_LOGIN_STAT,
        value: val
    }
}

export const update_login_stat = (token) => {
    return dispatch => {
        refreshToken(token)
            .then((value) => {
                dispatch(update_login(value));
            })
            .catch((e) => console.log(e));
    }
}

export const log_out = val => {
    return {
        type: LOG_OUT,
        value: val
    }
}