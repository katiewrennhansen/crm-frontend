import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import AdminContext from '../../../../../contexts/AdminContext'
import ApiService from '../../../../../services/api-service'

const caEndpoint = config.CUSTOMER_ACCOUNTS_ENDPOINT
const brokerEndpoint = config.BROKER_ENDPOINT

class CustomerAccounts extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            brokers: []
        };
    }

    setCustomers = data => {
        const customers = data.customers
        this.setState({
            customers: customers,
            error: null
        })
    }

    setBrokers = data => {
        this.setState({
            brokers: data.brokers,
            error: null
        })
    }

    componentDidMount(){
        ApiService.getData(
            caEndpoint, 
            this.setCustomers
        )
        ApiService.getData(
            brokerEndpoint,
            this.setBrokers
        )
    }

    componentWillUnmount(){
        this.setCustomers([])
    }


    deactivateCustomer = (id) => {
        // const updatedStatus = {
        //     cstatus_id: 35
        // }

        // ApiService.updateDataHalf(caEndpoint, id, updatedStatus)
        //     .then(data => {
        //         ApiService.getDataHalf(caEndpoint)
        //             .then(data => {
        //                 this.setCustomers(data.customers)
        //             })
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

        const el = this.state.customers.find(c => c.data.id === id)
        const element = document.getElementById(id)
        const button = document.getElementById(`delete${id}`)

        if(el.data.status === 'On hold') {
            element.classList.add('deactivated')
            button.innerHTML = "Activate";
            el.data.status = "Deactive"            
        } else {
            element.classList.remove('deactivated')
            button.innerHTML = "Deactivate";
            el.data.status = 'On hold'  
        }
    }
    
    render(){  
        return (
                <div className='container'>
                    <div className='header-grid'>
                        <h3>Customer Accounts</h3>
                        <Link to='/dashboard/add-customer' className='btn'>Add Customer</Link>
                    </div>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th></th>
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
                                        <td>{c.data.category}</td>
                                        <td>{c.data.status}</td>
                                        <td className='update'>
                                            <Link to={`/dashboard/customer-accounts/${id}`}>View</Link>
                                        </td>
                                        <td>
                                            <button 
                                                className='delete-btn' 
                                                id={`delete${id}`} 
                                                onClick={() => this.deactivateCustomer(id)}
                                            >
                                                Deactivate
                                            </button>
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

export default CustomerAccounts