import { ServerUrl } from './ServerUrl'
import { getValidToken } from './Authentication'

export default function fetchGet(path) {
    return new Promise(async (resolve, reject) => {
        const token = path === "store-items" ? "" : await getValidToken();
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
