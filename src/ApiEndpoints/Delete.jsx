import { ServerUrl } from './ServerUrl';
import { getValidToken } from './Authentication';

export default function fetchDelete(path) {
    return new Promise(async (resolve, reject) => {
        const token = await getValidToken();
        fetch(`${ServerUrl}/${path}`,
            {
                method: 'DELETE',
                headers:
                {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.message && (data.message.includes("Success") || data.message.includes("success"))) {
                    resolve();
                }
                else {
                    alert("Your deletion failed");
                    reject();
                }
            })

    })
}