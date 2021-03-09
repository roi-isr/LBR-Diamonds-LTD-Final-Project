import { ServerUrl } from './ServerUrl'
import { getValidToken } from './Authentication'

export default function fetchGet(path) {
    return new Promise(async (resolve, reject) => {
        const token = await getValidToken();
        fetch(`${ServerUrl}/${path}`,
            {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                resolve(data);
            }
            )
            .catch(() => {
                alert("Your submittion failed");
                reject();
            });
    })
}
