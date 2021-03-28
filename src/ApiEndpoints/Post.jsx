import { ServerUrl } from './ServerUrl'
import { getValidToken } from './Authentication'


export default function fetchPost(path, data, authRequired=true) {
    return new Promise(async (resolve, reject) => {
        const token = authRequired ? await getValidToken():"";
        fetch(`${ServerUrl}/${path}`,
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.message && (data.message.includes("Success") || data.message.includes("success"))) {
                    resolve(data._id);
                }
                else {
                    alert("Your submittion failed");
                    reject();
                }
            })
            .catch(() => {
                alert("Your submittion failed");
                reject();

            });
    })
}
