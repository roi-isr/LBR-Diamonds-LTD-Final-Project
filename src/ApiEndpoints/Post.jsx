import { WebCookies } from '../Entities/Cookies';
import { ServerUrl } from './ServerUrl'


export default async function fetchPost(path, data) {
    return new Promise((resolve, reject) => {
        console.log(data);
        const token = (new WebCookies()).getCookies("tokenStr");
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
                if (data.message.includes("Success") || data.message.includes("success")) {
                    alert("Data added successfully")
                    resolve();
                }
                else {
                    alert("Your submittion failed")
                    reject()
                }
            })
        .catch(() => alert("Your submittion failed"));
    })
}
