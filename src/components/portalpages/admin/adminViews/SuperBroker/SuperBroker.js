import React, { Component } from 'react'
import config from '../../../../../config'
import AdminContext from '../../../../../contexts/AdminContext'
import ApiService from '../../../../../services/api-service'

class SuperBroker extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    setUsers = users => {
        this.setState({
            users
        })
    }

    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/users`)
            .then(data => this.setUsers(data.users))
            .catch(error => console.log(error))
    }


    updateSuperBroker = (id, val) => {
        const newUserType = {
            user: {
                superbroker: val
            }
        }
        ApiService.updateDataHalf(`${config.API_ENDPOINT}/users`, id, newUserType)
            .then(data => {
                ApiService.getDataHalf(`${config.API_ENDPOINT}/users`)
                    .then(data => this.setUsers(data.users))
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }
    
    render(){  
        return (
            <div className='data-container'>
                <h2>Users</h2>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>UserType</th>
                            <th>Superbroker</th>
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
                                            {(!c.data.superbroker)
                                                ? <button onClick={() => this.updateSuperBroker(c.data.id, true)}>Add as Superbroker</button>
                                                : <button onClick={() => this.updateSuperBroker(c.data.id, false)}>Remove Superbroker</button>
                                            }
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