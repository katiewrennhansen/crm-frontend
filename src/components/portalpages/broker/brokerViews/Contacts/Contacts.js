import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        };
    }

    setCustomers = data => {
        const customers = data.customers
        this.setState({
            customers: customers,
            error: null
        })
    }

    componentDidMount(){
        const endpoint = `${config.API_ENDPOINT}/customers`
        ApiService.getData(
            endpoint, 
            this.setCustomers
        )
    }

    componentWillUnmount(){
        this.setCustomers([])
    }

    
    render(){  
        return (
                <div className='container'>
                    <div className='header-grid'>
                        <h2>Contacts</h2>
                        <Link to='/broker/contacts/add' className='btn'>Add Contact</Link>
                    </div>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.customers.map(c => {
                                const id = c.data.id
                                return (
                                    <tr id={id} key={id}>
                                        <td>{c.data.name}</td>
                                        <td>{c.data.email}</td>
                                        <td>{c.data.status}</td>
                                        <td className='update'>
                                            <Link className="update-btn" to={`/broker/contacts/${id}`}>View</Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
        )
    }
}

export default Contacts