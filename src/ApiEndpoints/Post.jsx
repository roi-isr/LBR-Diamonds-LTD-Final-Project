import { WebCookies } from '../Entities/Cookies';
import { ServerUrl } from './ServerUrl'


export default async function fetchPost(path, data) {
    return new Promise((resolve, reject) => {
        console.log(data);
        const token = (new WebCookies()).getCookies("tokenStr");
        fetch(`${ServerUrl}/${path}`,
            {
                mode: 'cors',
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`,
                },
                body: JSON.stringify(data)
            })
            // .then(response => response.json())
            // .then(data => {
            //     if ("Success" in data.message || "success" in data.message) {
            //         alert("Data added successfully")
            //         resolve();
            //     }
            //     else {
            //         alert("Your submittion failed1")
            //         reject()
            //     }
            // })
        // .catch(() => alert("Your submittion failed2"));
    })
}
