import React, { Component } from 'react'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'


class CustomerStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
            statuses: [],
            error: null
        };
    }

    removeStatuses = id => {
        const newStatuses = this.state.statuses.filter(c =>
          c.id !== id
        )
        this.setState({
          statuses: newStatuses
        })
        this.props.func.hideDelete()
      }
    
    setStatuses = statuses => {
        this.setState({
            statuses: statuses,
            error: null
        })
    }
    updateStatuses = data => {
        this.setState({
            statuses: [...this.state.statuses, data],
            error: null
        })
    }

    componentDidMount(){
        fetch(config.CUSTOMER_STATUS_ENDPOINT, {
            method: 'GET',
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
            this.setStatuses(data)
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    addCustomerStatus = (e) => {
        e.preventDefault()
        const newCustomerStatus = {
            csdesc: e.target.customer_status.value,
            company_id: 6,
            user_id: 1
        }
        fetch(config.CUSTOMER_STATUS_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(newCustomerStatus),
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
            this.updateStatuses(data)
            this.props.func.hideModal()
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    
    render(){  
        const status = this.props.func
        return (
            <>
                <Modal show={status.show} >
                    <form className= 'add_feature' onSubmit={(e) => this.addCustomerStatus(e)}>
                        <h3>Customer Status</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <TextInput 
                                id='customer_status'
                                name='customer_status'
                                label='Customer Status'
                                type='text'
                                autoComplete='text'
                            />
                        </div>
                        <SubmitButton className='submit_property' text='Save'/>
                    </form>
                    <button onClick={status.hideModal}>Cancel</button>
                </Modal>
                <div className='promotion-container'>
                    <h3>Customer Status</h3>
                    <button className='add_promotion' onClick={status.showModal}>Add Customer Status</button>
                    <table className='promotion_table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Show In Portal</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.statuses.map(c => (
                            <tr key={c.id}>
                                <td>{c.csdesc}</td>
                                <td>{c.created_at}</td>
                                <td><button>Update</button></td>
                                <td className='delete'>
                                    <button 
                                        onClick={() => status.updateDelete(c.csdesc, c.id)}
                                    >
                                        Delete
                                    </button>
                                    {(status.delete) ? status.deleteModal(config.CUSTOMER_STATUS_ENDPOINT, this.removeStatuses) : null}                            
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

export default CustomerStatus