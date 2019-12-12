import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'

const endpoint = `${config.API_ENDPOINT}/remainders`

class Reminders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            reminders: []
        }
    }

    setReminders = reminders => {
        this.setState({
            reminders
        })
    }

    componentDidMount(){
        ApiService.getDataHalf(endpoint)
            .then(data => {
                this.setReminders(data)
            }) 
            .catch(error => {
                console.log(error)
            })      
    }

    render(){  
        return (
            <div className='container'>
                <div className='header-grid'>
                    <h2>Reminders</h2>
                    <Link to='/broker/reminders/add' className='add'>Add Reminder</Link>
                </div>
                <div>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Months</th>
                                <th>Message</th>
                                <th>Date Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.reminders.map(r => (
                                <tr key={r.id}>
                                    <td>{r.rtype}</td>
                                    <td>{r.periodmonths}</td>
                                    <td>{r.bodymessage}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">{r.created_at}</Moment>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Reminders