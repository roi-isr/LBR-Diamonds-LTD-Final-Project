import { WebCookies } from '../Entities/Cookies';
import { ServerUrl } from './ServerUrl'


export default async function fetchGet(path) {
    return new Promise((resolve, reject) => {
        const token = (new WebCookies()).getCookies("tokenStr");
        fetch(`${ServerUrl}/${path}`,
            {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `BEARER ${token}`,
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
