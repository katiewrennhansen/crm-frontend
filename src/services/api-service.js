import config from '../config'

const ApiService = {
    getData(ApiEndpoint, cb) {
        return fetch(ApiEndpoint, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(error => Promise.reject(error))
                : res.json()
        )
        .then(data => {
            cb(data)
        })
        .catch(err => {
            console.log(err)
        })
      },

    postData(ApiEndpoint, dataObj, update, hideModal){
        fetch(ApiEndpoint, {
            method: 'POST',
            body: JSON.stringify(dataObj),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(error => Promise.reject(error))
                : res.json()
        )
        .then(data => {
            update(data)
            hideModal()
        })
        .catch(error => {
            console.log(error)
        }) 
    },

    updateData(ApiEndpoint, id, dataObj, hideModal){
        fetch(`${ApiEndpoint}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(dataObj),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(error => Promise.reject(error))
                : res.json()
        )
        .then(data => {
            hideModal()
        })
        .catch(error => {
            console.error(error)
        })
    },

    deleteData(ApiEndpont, id, cb){
        fetch(ApiEndpont + `/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(error => Promise.reject(error))
                : res.json()
        )
        .then(data => {
            cb(id)
        })
        .catch(error => {
            console.error(error)
        })
    }
}

export default ApiService