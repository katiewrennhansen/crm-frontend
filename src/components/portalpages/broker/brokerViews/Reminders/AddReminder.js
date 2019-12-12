import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'

const endpoint = `${config.API_ENDPOINT}/remainders`

class AddProvider extends Component {

    addReminder = (e) => {
        e.preventDefault()
        const newReminder = {
            rtype: e.target.reminder.value,
            periodmonths: e.target.months.value,
            bodymessage: e.target.message.value,
        }

        ApiService.postDataHalf(endpoint, newReminder)
        .then(res => {
            ApiService.getDataHalf(endpoint)
                .then(data => {
                    this.props.history.push('/broker/reminders')
                })
        })
        .catch(error => {
            console.log(error)
        }) 
    }

    render(){
        return (
            <div className='add-property'>
                <div className='header-grid'>
                    <h2>Add New Provider</h2>
                    <Link className="add" to='/broker/reminders'>Cancel</Link>
                </div>
                <div>
                <form 
                        className= 'add-form' 
                        onSubmit={(e) => this.addReminder(e)}
                    >
                        <h3>Add a Reminder</h3>
                        <div className='form-group'>
                            <label htmlFor='reminder'>Reminder: </label>
                            <input
                                id='reminder'
                                name='reminder'
                                type='text'
                            />
                        </div>
                        <div className='form-group'> 
                            <label htmlFor='months'>Months: </label>
                            <input 
                                id='months'
                                name='months'
                                type='number'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='message'>Message: </label>
                            <input 
                                id='message'
                                name='message'
                                type='text'
                            />
                        </div>
                        <input type="submit" className='submit' value='Save'/>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddProvider