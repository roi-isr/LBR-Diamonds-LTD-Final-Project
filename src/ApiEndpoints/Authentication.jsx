import { ServerUrl } from './ServerUrl'
import { WebCookies } from '../Entities/Cookies';

export function fetchAuthRequest(httpContent) {
    return new Promise((resolve, reject) => {
        fetch(`${ServerUrl}/auth`,
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(httpContent)
            })
            .then(response => response.json())
            .then(data => {
                if (data.access_token || data.refresh_token) {
                    resolve({
                        'accessToken': data.access_token,
                        'refreshToken': data.refresh_token
                    });
                }
                else {
                    console.log(data.message)
                    reject(data.message || "לא ניתן להתחבר למערכת כרגע. אנא נסה שנית מאוחר יותר.");
                }
            })
            .catch((e) => reject( "לא ניתן להתחבר למערכת כרגע. אנא נסה שנית מאוחר יותר."));
    })
}

// Refresh the current access token
export function refreshToken(token) {
    return new Promise((resolve, reject) => {
        fetch(`${ServerUrl}/refresh`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
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

export async function getValidToken() {
    const cookie = new WebCookies();
    let token;
    if (cookie.isAccessTokenExpired()) {
        token = await refreshToken(cookie.getRefreshToken());
        cookie.setAccessToken(token);
    } else {
        token = cookie.getAccessToken();
    }
    return token;
}