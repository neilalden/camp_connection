export const ACCESS_TOKEN = '4|ifrqaL7rwvz9lVJTbANLL0DDxF8rYUwzquguUwtn'

export const GET = (url: string) => {
    if (typeof url !== "string") return;
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        }
    }
    return fetch(url, options)
        .then(function (res) {
            return res.json();
        })
        .then(function (resJson) {
            return resJson;
        }).catch(e => e)
}
export const POST = (url: string, payload = {}) => {
    if (typeof url !== "string") return;
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            // 'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload)
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(resJson => resJson)
        .catch(error => console.error(error));
}

export const DELETE = (url: string, payload = {}) => {
    if (typeof url !== "string") return;
    const options = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload)
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(resJson => resJson)
        .catch(error => console.error(error));
}

export const PUT = (url: string, payload = {}) => {
    if (typeof url !== "string") return;
    const options = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(payload)
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(resJson => resJson)
        .catch(error => console.error(error));
}