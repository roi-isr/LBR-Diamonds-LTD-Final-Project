import { ServerUrl } from './ServerUrl'
import { getValidToken } from './Authentication'


export default function fetchPost(path, data) {
    return new Promise((resolve, reject) => {
        const token = getValidToken();
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
