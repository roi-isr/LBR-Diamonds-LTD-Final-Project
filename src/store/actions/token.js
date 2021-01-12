import { SAVE_TOKEN, UPDATE_LOGIN_STAT, LOG_OUT } from './actionTypes';

// Verify token through server, making admin sessions possible, even after page refresh
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
                    resolve(true);
                }
                else {
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

export const update_login_stat = (val) => {
    return dispatch => {
        verify_token(val)
            .then((value) => {
                dispatch(update_login(value));
            })
            .catch((error) => { console.log(error) });
    }
}

export const log_out = val => {
    return {
        type: LOG_OUT,
        value: val
    }
}
