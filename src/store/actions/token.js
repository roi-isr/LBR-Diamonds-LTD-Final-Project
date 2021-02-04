import { SAVE_TOKEN, UPDATE_LOGIN_STAT, LOG_OUT } from './actionTypes';
import { WebCookies } from '../../Entities/Cookies';
import { fetchAuthRequest } from '../../ApiEndpoints/Authentication';

// Verify token through server, making admin sessions possible, even after page refresh
const verify_token = (token) => {
    return new Promise((resolve, reject) => {
        fetch("http://127.0.0.1:5000/verify-token", {
            method: 'GET',
            headers: {
                'Authorization': `JWT ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.auth) {
                    resolve(true);
                } else {
                    reject(Error('Unverifies user'));
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

const tryToLoginAgain = () => {
    return new Promise(async (resolve, reject) => {
        const cookies = new WebCookies();
        const username = cookies.getCookies("username");
        const password = cookies.getCookies("password");

        if (!username || !password) {
            reject("User not authorized yet");
        }

        const httpRequest = {
            username,
            password
        }

        const onAuthSuccess = (token) => {
            if (token) {
                const cookie = new WebCookies();
                cookie.setAuth(token);
                cookie.saveUsernameAndPasswordCookie(httpRequest.username, httpRequest.password);
                console.log("Resigned successfully");
                return token;
            }
            else {
                return ("Error");
            }
        }

        const onAuthFail = (errorMsg) => {
            return (errorMsg);
        }
        try {
            const accessToken = await fetchAuthRequest(httpRequest, onAuthSuccess, onAuthFail)
            resolve(accessToken);
        }
        catch {
            reject("User not authorized yet")
        }
    })
}

export const update_login_stat = (val) => {
    return dispatch => {
        verify_token(val)
            .then((value) => {
                dispatch(update_login(value));
            })
            .catch(() => {
                tryToLoginAgain()
                    .then((access_token) =>
                        dispatch(update_login(access_token))
                    )
                    .catch((e) => console.log(e));
            });
    }
}

export const log_out = val => {
    return {
        type: LOG_OUT,
        value: val
    }
}