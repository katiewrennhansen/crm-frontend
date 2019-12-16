import React, { Component } from 'react'
import ApiService from '../../../../../services/api-service'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            firstname: '',
            lastname: ''
        };
    }

    setFirst = (first) => {
        const firstChar = first.slice(0, 1).toUpperCase()
        const rest = first.slice(1, first.length)
        const firstname = firstChar + rest
        this.setState({
            firstname
        })
    }

    setLast = (last) => {
        const firstChar = last.slice(0, 1).toUpperCase()
        const rest = last.slice(1, last.length)
        const lastname = firstChar + rest
        this.setState({
            lastname
        })
    }

    componentDidMount(){
        const id = sessionStorage.getItem('id')
        const endpoint = `http://crmmia-api.herokuapp.com/api/users/${id}`
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setFirst(data.firstname)
                this.setLast(data.lastname)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (
            <div className='admin-dashboard'>
                <div className='dash-container'>
                    <h2>Welcome {this.state.firstname} {this.state.lastname}</h2>
                </div>
            </div>
        )
    }
}

export default Dashboard