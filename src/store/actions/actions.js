/* Declaring global state actions (functions) */
/* Define the actions types for the reduces */
export const CHANGE_NAV = "CHANGE_NAV"
export const VIS_NAV = "VIS_NAV"
export const SAVE_TOKEN = "SAVE_TOKEN"
export const UPDATE_LOGIN_STAT = "UPDATE_LOGIN_STAT"
export const LOG_OUT = "log_out"

/* Verify token through server, making admin sessions possible, even after page refresh*/
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
                    console.log("Unverified token");
                    resolve(false);
                }
            })
            .catch((e) => reject(Error(e.name)))
    });
}
/* Change site navbar content */
export const change_content = (val) => {
    return {
        type: CHANGE_NAV,
        value: val
    }
}
/* Save tokens for continous admin sessions */
export const change_visiblity = (val) => {
    return {
        type: VIS_NAV,
        value: val
    }
}

/* Change site navbar visibility */
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
        verify_token(val).then((value) => {
            dispatch(update_login(value));
        }).catch(()=>{console.log("Unsuccessful verification")})
    }
}

export const log_out = val => {
    return {
        type: LOG_OUT,
        value: val
    }
}
