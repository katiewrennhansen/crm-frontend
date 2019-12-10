import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../utilities/Login/LoginComponents/SubmitButton'
import Modal from '../../../../utilities/Modal/Modal'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import DeleteModal from '../../../../utilities/Modal/DeleteModal'

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

    addReminder = (e) => {
        e.preventDefault()
        const newReminder = {
            rtype: e.target.reminder.value,
            periodmonths: e.target.months.value,
            bodymessage: e.target.message.value,
        }
        ApiService.postData(
            endpoint, 
            newReminder, 
            this.context.updateData, 
            this.context.hideModal
        )
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        let updatedContent = {}

        if(e.target.reminder.value !== ''){
            updatedContent.rtype = e.target.reminder.value
        }
        if(e.target.months.value !== ''){
            updatedContent.periodmonths = e.target.months.value
        }
        if(e.target.message.value !== ''){
            updatedContent.bodymessage = e.target.message.value
        }

        ApiService.updateDataHalf(endpoint, id, updatedContent)
        .then(res => {
            ApiService.getDataHalf(endpoint)
                .then(data => {
                    this.context.setData(data)
                    this.context.hideUpdate()
                })
        })
        .catch(error => {
            console.log(error)
        }) 
    }

    deleteReminder = (id) => {
        this.context.deleteData(id)
        ApiService.deleteData(
            endpoint, 
            id, 
            this.context.setData
        )
        this.context.hideDelete()
    }

    render(){  
        const context = this.context
        return (
            <>
                <DeleteModal
                    props={context}
                    endpoint={endpoint}
                    deleteFn={this.deleteReminder}
                />

                <Modal className='update-modal' show={context.update}>
                    <div className='update-content'>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <h3>Update {context.name}</h3>
                            <div className='form-group'>
                                <label htmlFor='reminder'>Reminder</label>
                                <input
                                    id='reminder'
                                    name='reminder'
                                    placeholder='Reminder'
                                    type='text'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='months'>Months</label>
                                <input 
                                    id='months'
                                    name='months'
                                    placeholder='Months'
                                    type='number'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='message'>Message</label>
                                <input 
                                    id='message'
                                    name='message'
                                    placeholder='Message'
                                    type='text'
                                />
                            </div>
                            <SubmitButton className='submit-content' text='Update'/>
                        </form>
                    </div>
                    <button className='cancel-btn' onClick={context.hideUpdate}>Cancel</button>     
                </Modal>

                <Modal className='add-modal' show={context.show} >
                    <form 
                        className= 'add-content' 
                        onSubmit={(e) => this.addReminder(e)}
                    >
                        <h3>Add a Reminder</h3>
                        <div className='form-group'>
                            <label htmlFor='reminder'>Reminder</label>
                            <input
                                id='reminder'
                                name='reminder'
                                type='text'
                            />
                        </div>
                        <div className='form-group'> 
                            <label htmlFor='months'>Months</label>
                            <input 
                                id='months'
                                name='months'
                                type='number'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='message'>Message</label>
                            <input 
                                id='message'
                                name='message'
                                type='text'
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <button className='cancel-btn' onClick={context.hideModal}>Cancel</button>
                </Modal>

                <div className='data-container'>
                    <h2>Reminders</h2>
                    <button className='add-btn' onClick={context.showModal}>Add Reminder</button>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Months</th>
                                <th>Message</th>
                                <th>Date Created</th>
                                <th></th>
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
                                 <td>
                                    <button className='update-btn'>Update</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default Reminders