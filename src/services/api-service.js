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
    getDataHalf(ApiEndpoint,) {
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
    },

    getById(ApiEndpoint, id){
        return fetch(`${ApiEndpoint}/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
    },

    postData(ApiEndpoint, dataObj, update, hideModal){
        return fetch(ApiEndpoint, {
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

    postDataHalf(ApiEndpoint, dataObj){
        return fetch(ApiEndpoint, {
            method: 'POST',
            body: JSON.stringify(dataObj),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok)
                return res.json().then(error => Promise.reject(error))
            return res
        })
    },

    updateData(ApiEndpoint, id, dataObj, set, hideModal){
        return fetch(`${ApiEndpoint}/${id}`, {
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
            this.getData(ApiEndpoint, set)
            hideModal()
        })
        .catch(error => {
            console.error(error)
        })
    },

    updateDataHalf(ApiEndpoint, id, dataObj){
        return fetch(`${ApiEndpoint}/${id}`, {
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
    },

    deleteData(ApiEndpoint, id, set){
        return fetch(`${ApiEndpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => 
            (!res.ok)
                ? res.json().then(error => Promise.reject(error))
                : res
        )
        .then((data) => {
            this.getData(ApiEndpoint, set)            
        })
        .catch(error => {
            console.error(error)
        })  
    },
}

export default ApiService