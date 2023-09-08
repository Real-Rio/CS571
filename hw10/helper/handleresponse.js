

export function handleResponse(res) {
    return res.json().then(json => {
        if (res.ok) {
            return json;
        } else {
            return Promise.reject(json.msg);
        }
    })
}