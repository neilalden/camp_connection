export const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMWI1Mjc0MDA4ODZkNTlhMjJhYmM3N2FhM2M3OWFlNCIsInN1YiI6IjY0NjRlOTFhMDI4NDIwMDBmY2JlNDQ3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s0nIRWvZkJDApcfA2LB5V-bTxdUNfv5pGcWw42PWN0Y'


export const get = (url = 'https://atsdevs.org') => {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
        }
    }
    return fetch(url, options)
        .then(function (res) {
            return res.json();
        })
        .then(function (resJson) {
            return resJson;
        })
}
export const post = (url = 'https://atsdevs.org', payload = {}) => {
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

export const Delete = (url = 'https://atsdevs.org', payload = {}) => {
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