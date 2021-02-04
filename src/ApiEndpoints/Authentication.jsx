import {ServerUrl} from './ServerUrl'

export async function fetchAuthRequest(httpContent, onSuccess, onFailure) {
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
                if (data.access_token) {
                    resolve(onSuccess(data.access_token));
                }
                else {
                    reject(onFailure(data.description));
                }
            })
            .catch((e) => onFailure(e.name));
    })
}