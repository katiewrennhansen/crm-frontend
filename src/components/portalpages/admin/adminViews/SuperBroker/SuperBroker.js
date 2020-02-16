import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from '../../../../../config'
import AdminContext from '../../../../../contexts/AdminContext'
import ApiService from '../../../../../services/api-service'
import AddIcon from '@material-ui/icons/Add';
import PageviewIcon from '@material-ui/icons/Pageview';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

class SuperBroker extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    setUsers = users => {
        this.setState({
            users
        })
    }

    setBrokers = data => {
        this.setState({
            brokers: data.brokers,
            error: null
        })
    }

    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/users`)
            .then(data => {
                this.setUsers(data.users)
            })
            .catch(error => console.log(error))
    }

    componentWillUnmount(){
        this.setCustomers([])
    }


    // deactivateCustomer = (id) => {
    //     const updatedStatus = {
    //         cstatus_id: 35
    //     }

    //     ApiService.updateDataHalf(caEndpoint, id, updatedStatus)
    //         .then(data => {
    //             ApiService.getDataHalf(caEndpoint)
    //                 .then(data => {
    //                     this.setCustomers(data)
    //                 })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })

    //     const el = this.state.customers.find(c => c.data.id === id)
    //     const element = document.getElementById(id)
    //     const button = document.getElementById(`delete${id}`)

    //     if(el.data.status === 'On hold') {
    //         element.classList.add('deactivated')
    //         button.innerHTML = "Activate";
    //         el.data.status = "Deactive"            
    //     } else {
    //         element.classList.remove('deactivated')
    //         button.innerHTML = "Deactivate";
    //         el.data.status = 'On hold'  
    //     }
    // }
    
    render(){  
        return (
                <div className='data-container'>
                    <h2>Users</h2>
                    <Link className="add-icon" to='/dashboard/add-customer'>
                        <AddIcon 
                            aria-label="add comment type" 
                        />
                    </Link>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Country</th>
                                <th>UserType</th>
                                <th>Edit Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.state.users[0])
                                ? this.state.users.map(c => {
                                    const id = c.data.id
                                    return (
                                        <tr id={id} key={id}>
                                            <td>{c.data.firstname} {c.data.lastname}</td>
                                            <td>{c.data.email}</td>
                                            <td>{c.data.country}</td>
                                            <td>{c.data.usertype}</td>
                                            <td>
                                                <button 
                                                    className='delete-btn' 
                                                    id={`delete${id}`} 
                                                    onClick={() => this.deactivateCustomer(id)}
                                                >
                                                    <NotInterestedIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                                : <tr>
                                    <td className="nothing-to-display">No Users to Display</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    <p className="entry-count">Showing {this.state.users.length} of {this.state.users.length} entries</p>
                </div>
        )
    }
}

export default SuperBroker