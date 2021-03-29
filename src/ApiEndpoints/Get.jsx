import { ServerUrl } from './ServerUrl'
import { getValidToken } from './Authentication'

export default function fetchGet(path, authRequired = true) {
    return new Promise(async (resolve, reject) => {
        const token = authRequired ? await getValidToken() : "";
        fetch(`${ServerUrl}/${path}`,
            {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else if (response.status == 404 && path === 'stocks-to-offers-counter') {
                    resolve({});
                }
                else {
                    alert("Unabled to fetch data from DB");
                    reject();
                }
            })
            .then(data => {
                resolve(data);
            })
            .catch(() => {
                alert("Unabled to fetch data from DB");
                reject();
            });
    })
}
