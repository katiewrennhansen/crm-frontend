import React, { Component } from 'react'
import cuuid from 'cuuid'
import ADMIN_DATA from '../../../../../admin-data'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'

class Reminders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false
        };
    }

    addReminder = (e) => {
        e.preventDefault()
        console.log('add reminder!!')
        const newReminder = {
            reminder: {
                id: cuuid(),
                rtype: e.target.reminder.value,
                periodmonths: 12,
                bodymessage: 'Congrats you have rented for a year',
                company_id: 6,
                user_id: 1
            }
        }
        ADMIN_DATA.reminders.push(newReminder)
    }

    render(){  
        return (
            <>
                <Modal show={this.props.show} >
                    <form className= 'add_feature' onSubmit={(e) => {this.addReminder(e); this.props.hideModal();}}>
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
                        </div>
                        <SubmitButton className='submit_property' text='Save'/>
                    </form>
                    <button onClick={this.props.hideModal}>Cancel</button>
                </Modal>
                <div className='promotion-container'>
                    <h3>Reminders</h3>
                    <button className='add_promotion' onClick={this.props.showModal}>Add Reminder</button>
                    <table className='promotion_table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Months</th>
                                <th>Message</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ADMIN_DATA.reminders.map(r => (
                            <tr key={r.reminder.id}>
                                <td>{r.reminder.rtype}</td>
                                <td>{r.reminder.periodmonths}</td>
                                <td>{r.reminder.bodymessage}</td>
                                <td><button>Update</button></td>
                                <td className='delete'><button onClick={this.props.showDelete}>Delete</button>
                                    <Modal show={this.props.delete}>
                                        <h3>Are you sure you would like to delete this reminder?</h3>
                                        <button onClick={this.props.hideDelete}>Cancel</button>
                                        <div className='delete'>
                                            <button onClick={this.deletePromotion}>Delete</button>
                                        </div>
                                    </Modal>
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