import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'

const remindersEndpoint = config.REMINDERS_ENDPOINT

class Reminders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
            reminders: [],
            error: null
        };
    }

    removeReminder = id => {
        const newReminders = this.state.reminders.filter(r =>
          r.id !== id
        )
        this.setState({
          reminders: newReminders
        })
        this.props.func.hideDelete()
      }
    
    setReminders = reminders => {
        this.setState({
            reminders: reminders,
            error: null
        })
    }
    updateReminders = data => {
        this.setState({
            reminders: [...this.state.reminders, data],
            error: null
        })
    }

    componentDidMount(){
        this.props.func.fetchData(remindersEndpoint, this.setReminders)        
    }

    componentDidUpdate(){
        this.props.func.fetchData(remindersEndpoint, this.setReminders)        
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
        fetch(remindersEndpoint, {
            method: 'POST',
            body: JSON.stringify(newReminder),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
        .then(data => {
            this.updateReminders(data)
            this.props.func.hideModal()
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.props.func.updateContent.id
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
        fetch(`${remindersEndpoint}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedContent),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then((res) => {
            if(!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
            return
        })
        .then(data => {
            this.props.func.hideUpdate()
        })
        .catch(error => {
            console.error(error)
        })
    }


    render(){  
        const reminder = this.props.func
        return (
            <>
             <Modal className='update-modal' show={reminder.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {reminder.updateContent.name}</h3>
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
                            <button onClick={reminder.hideUpdate}>Cancel</button>   
                        </div>
                    </div>
                </Modal>
                <Modal className='add-modal' show={reminder.show} >
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
                        <button onClick={reminder.hideModal}>Cancel</button>
                    </div>
                </Modal>
                <div className='data-container'>
                    <h3>Reminders</h3>
                    <button className='add-data' onClick={reminder.showModal}>Add Reminder</button>
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
                            {this.state.reminders.map(r => (
                            <tr key={r.id}>
                                <td>{r.rtype}</td>
                                <td>{r.periodmonths}</td>
                                <td>{r.bodymessage}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{r.created_at}</Moment>
                                </td>
                                <td className='update'>
                                    <button onClick={() => reminder.updateUpdate(r.rtype, r.id)}>Update</button>
                                </td>
                                <td className='delete'>
                                    <button 
                                        onClick={() => reminder.updateDelete(r.rtype, r.id)}
                                    >
                                        Delete
                                    </button>
                                {(reminder.delete) ? reminder.deleteModal(remindersEndpoint, this.removeReminder) : null}
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