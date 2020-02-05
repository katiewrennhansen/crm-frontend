import React, { Component } from 'react'
import Moment from 'react-moment'
import Modal from '../../../../utilities/Modal/Modal'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../../../utilities/Modal/DeleteModal'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

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
        e.target.reminder.value = ""
        e.target.months.value = ""
        e.target.message.value = ""
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        let updatedContent = {}
        let updatedFields = {
            rtype: e.target.reminder.value,
            periodmonths: e.target.months.value,
            bodymessage: e.target.message.value
        }

        for (const key in updatedFields) {
            if (updatedFields[key] !== '')
                updatedContent[key] = updatedFields[key]
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
        e.target.reminder.value = ""
        e.target.months.value = ""
        e.target.message.value = ""
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
                    <CloseIcon 
                        className="close-icon" 
                        onClick={context.hideUpdate}
                    />
                    <div className='update-content'>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <h3>Update: {context.name}</h3>
                            <div className='form-group'>
                                <label htmlFor='reminder'>Reminder</label>
                                <input
                                    id='update_reminder'
                                    name='reminder'
                                    placeholder='Reminder'
                                    type='text'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='months'>Months</label>
                                <input 
                                    id='update_months'
                                    name='months'
                                    placeholder='Months'
                                    type='number'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='message'>Message</label>
                                <input 
                                    id='update_message'
                                    name='message'
                                    placeholder='Message'
                                    type='text'
                                />
                            </div>
                            <input type="submit" className="submit-full submit-modal" value="Update" />
                        </form>
                    </div>
                </Modal>

                <Modal className='add-modal' show={context.show} >
                    <CloseIcon 
                        className="close-icon" 
                        onClick={context.hideModal}
                    />
                    <form 
                        className= 'add-content' 
                        onSubmit={(e) => this.addReminder(e)}
                    >
                        <h3>Add a Reminder</h3>
                        <div className='form-group'>
                            <label htmlFor='reminder'>Reminder</label>
                            <input
                                id='add_reminder'
                                name='reminder'
                                type='text'
                            />
                        </div>
                        <div className='form-group'> 
                            <label htmlFor='months'>Months</label>
                            <input 
                                id='add_months'
                                name='months'
                                type='number'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='message'>Message</label>
                            <input 
                                id='add_message'
                                name='message'
                                type='text'
                            />
                        </div>
                        <input type="submit" className="submit-full submit-modal" value="Update" />
                    </form>
                </Modal>

                <div className='data-container'>
                    <h2>Reminders</h2>
                    <AddIcon 
                        className="add-icon" 
                        aria-label="add comment type" 
                        onClick={context.showModal} 
                    />                    
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Months</th>
                                <th>Message</th>
                                <th>Date Created</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(context.data[0])
                                ? context.data.map(r => (
                                <tr key={r.id}>
                                    <td>{r.rtype}</td>
                                    <td>{r.periodmonths}</td>
                                    <td>{r.bodymessage}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">{r.created_at}</Moment>
                                    </td>
                                    <td>
                                        <button className='update-btn' onClick={() => this.context.updateUpdate(r.rtype, r.id)}>
                                            <EditIcon />
                                        </button>
                                    </td>
                                    <td>
                                        <button className='delete-btn' onClick={() => context.updateDelete(r.rtype, r.id)}>
                                            <DeleteOutlineIcon />
                                        </button>
                                    </td>
                                </tr>
                                ))
                                : <tr>
                                    <td className="nothing-to-display">No Reminders to Display</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            }
                        </tbody>
                    </table>
                    <p className="entry-count">Showing {context.data.length} of {context.data.length} entries</p>
                </div>
            </>
        )
    }
}

export default Reminders