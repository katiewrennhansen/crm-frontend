import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../../../utilities/Modal/Modal'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../../../utilities/Modal/DeleteModal'

const remindersEndpoint = config.REMINDERS_ENDPOINT

class Reminders extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null,
        }
    }

    componentDidMount(){
        ApiService.getData(
            remindersEndpoint, 
            this.context.setData
        )        
    }

    componentWillUnmount(){
        this.context.setData([])
    }

    addReminder = (e) => {
        e.preventDefault()
        const newReminder = {
            rtype: e.target.reminder.value,
            periodmonths: e.target.months.value,
            bodymessage: e.target.message.value,
        }
        ApiService.postData(
            remindersEndpoint, 
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

        ApiService.updateDataHalf(remindersEndpoint, id, updatedContent)
        .then(res => {
            ApiService.getDataHalf(remindersEndpoint)
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
            remindersEndpoint, 
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
                    endpoint={remindersEndpoint}
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
                    <h3>Reminders</h3>
                    <button className='add-btn' onClick={context.showModal}>Add Reminder</button>
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Months</th>
                                <th>Message</th>
                                <th>Date Created</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {context.data.map(r => (
                            <tr key={r.id}>
                                <td>{r.rtype}</td>
                                <td>{r.periodmonths}</td>
                                <td>{r.bodymessage}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{r.created_at}</Moment>
                                </td>
                                 <td>
                                    <button className='update-btn' onClick={() => this.context.updateUpdate(r.rtype, r.id)}>Update</button>
                                </td>
                                <td>
                                    <button className='delete-btn' onClick={() => context.updateDelete(r.rtype, r.id)}>Delete</button>
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