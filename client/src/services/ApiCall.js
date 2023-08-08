import axios from 'axios'

export const commmonfunction = (methods, url, body, header) => {
    let config = {
        method: methods,
        url,
        headers: header ?
        header : {
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

