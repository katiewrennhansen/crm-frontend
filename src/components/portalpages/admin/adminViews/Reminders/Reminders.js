import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../AdminContext'
import DeleteModal from '../../pagecomponents/DeleteModal'

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

    componentDidUpdate(){
        ApiService.getData(
            remindersEndpoint, 
            this.context.setData
        )        
    }

    addReminder = (e) => {
        e.preventDefault()
        const newReminder = {
            rtype: e.target.reminder.value,
            periodmonths: e.target.months.value,
            bodymessage: e.target.message.value,
            company_id: 6,
            user_id: 1
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
        ApiService.updateData(
            remindersEndpoint, 
            id, 
            updatedContent, 
            this.context.hideUpdate
        )
    }


    render(){  
        const context = this.context
        return (
            <>
            <DeleteModal
                props={context}
                endpoint={remindersEndpoint}
            />
             <Modal className='update-modal' show={context.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {context.name}</h3>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='maint_type'></label>
                                <TextInput
                                    id='reminder'
                                    name='reminder'
                                    label='Reminder'
                                    type='text'
                                />
                                 <TextInput 
                                    id='months'
                                    name='months'
                                    label='Months'
                                    type='number'
                                    autoComplete='number'
                                />
                                <TextInput 
                                    id='message'
                                    name='message'
                                    label='Message'
                                    type='text'
                                    autoComplete='text'
                                />
                            </div>
                            <div className='update'>
                                <button type='submit'>Update</button>
                            </div>
                        </form>
                        <div className='cancel'>
                            <button onClick={context.hideUpdate}>Cancel</button>   
                        </div>
                    </div>
                </Modal>
                <Modal className='add-modal' show={context.show} >
                    <form 
                        className= 'add-content' 
                        onSubmit={(e) => this.addReminder(e)}
                    >
                        <h3>Add a Reminder</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <TextInput 
                                id='reminder'
                                name='reminder'
                                label='Reminder'
                                type='text'
                                autoComplete='text'
                            />
                            <TextInput 
                                id='months'
                                name='months'
                                label='Months'
                                type='number'
                                autoComplete='number'
                            />
                            <TextInput 
                                id='message'
                                name='message'
                                label='Message'
                                type='text'
                                autoComplete='text'
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <div className='cancel'>
                        <button onClick={context.hideModal}>Cancel</button>
                    </div>
                </Modal>
                <div className='data-container'>
                    <h3>Reminders</h3>
                    <button className='add-data' onClick={context.showModal}>Add Reminder</button>
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
                                 <td className='update'>
                                    <button onClick={() => this.context.updateUpdate(r.rtype, r.id)}>Update</button>
                                </td>
                                <td className='delete'>
                                    <button onClick={() => context.updateDelete(r.rtype, r.id)}>Delete</button>
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