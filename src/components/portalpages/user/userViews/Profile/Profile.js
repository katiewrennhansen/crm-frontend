import React, { Component } from 'react'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'

class Account extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            user: []
        }
    }

    setUser = user => {
        this.setState({
            user
        })
    }

    componentDidMount(){
        const id = sessionStorage.getItem('id')
        ApiService.getDataHalf(`${config.API_ENDPOINT}/users/${id}`)
            .then(data => {
                this.setUser(data)
            })
            .catch(error => {
                console.log(error)
            })
    }


    render(){
        const user = this.state.user
        return (
            <div>
                <h1>Account Settings</h1>
            </div>
        )
    }
}

export default Account;