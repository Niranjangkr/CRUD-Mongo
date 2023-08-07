import axios from 'axios'

export const commmonfunction = (methods, url, body, headers) => {
    let config = {
        method: methods,
        url,
        headers: headers ?
        headers : {
            'Content-type': 'application/json'
        },
        data: body
    }

    // axios instance
    return axios(config).then((data) => {
    return data;  
    }).catch((error) => {
        return error
    })
    
}

