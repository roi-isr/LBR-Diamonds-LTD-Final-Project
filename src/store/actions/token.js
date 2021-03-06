import { SAVE_TOKEN, UPDATE_LOGIN_STAT, LOG_OUT } from './actionTypes';
import { WebCookies } from '../../Entities/Cookies';
import { fetchAuthRequest } from '../../ApiEndpoints/Authentication';

// Verify token through server, making admin sessions possible, even after page refresh
const refreshToken = (token) => {
    return new Promise((resolve, reject) => {
        fetch("http://127.0.0.1:5000/refresh", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(data => {
                if (data.access_token) {
                    resolve(data.access_token);
                } else {
                    console.log(data)
                    reject(Error('Unverified user'));
                }
            })
            .catch((e) => reject(Error(e.name)))
    });
}

// Change site navbar visibility
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