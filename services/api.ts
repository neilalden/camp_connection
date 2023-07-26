export const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWI1Mjc0MDA4ODZkNTlhMjJhYmM3N2FhM2M3OWFlNCIsInN1YiI6IjY0NjRlOTFhMDI4NDIwMDBmY2JlNDQ3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s0nIRWvZkJDApcfA2LB5V-bTxdUNfv5pGcWw42PWN0Y'


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
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
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