import { ServerUrl } from './ServerUrl'

export async function fetchAuthRequest(httpContent) {
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
                    reject(data.description);
                }
            })
            .catch((e) => reject(e.name));
    })
}