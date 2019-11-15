import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'

const csEndpoint = config.CUSTOMER_STATUS_ENDPOINT

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
        this.props.func.fetchData(csEndpoint, this.setStatuses)        
    }

    componentDidUpdate() {
        this.props.func.fetchData(csEndpoint, this.setStatuses)        
    }


    addCustomerStatus = (e) => {
        e.preventDefault()
        const newCustomerStatus = {
            csdesc: e.target.customer_status.value,
            company_id: 6,
            user_id: 1
        }
        fetch(csEndpoint, {
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

    updateData = (e) => {
        e.preventDefault()
        const id = this.props.func.updateContent.id
        let updatedContent = {}

        if(e.target.status_type.value !== ''){
            updatedContent.csdesc = e.target.status_type.value
        }
        fetch(`${csEndpoint}/${id}`, {
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
        const status = this.props.func
        return (
            <>
            <Modal className='update-modal' show={status.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {status.updateContent.name}</h3>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='maint_type'></label>
                                <TextInput
                                    id='status_type'
                                    name='status_type'
                                    label='Property Status Type'
                                    type='text'
                                />
                            </div>
                            <div className='update'>
                                <button type='submit'>Update</button>
                            </div>
                        </form>
                        <div className='cancel'>
                            <button onClick={status.hideUpdate}>Cancel</button>   
                        </div>
                    </div>
                </Modal>
                <Modal className='add-modal' show={status.show} >
                    <form 
                        className='add-content' 
                        onSubmit={(e) => this.addCustomerStatus(e)}
                    >
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
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <div className='cancel'>                    
                        <button onClick={status.hideModal}>Cancel</button>
                    </div>
                </Modal>
                <div className='data-container'>
                    <h3>Customer Status</h3>
                    <button className='add-data' onClick={status.showModal}>Add Customer Status</button>
                    <table className='data-table'>
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
                                <td>
                                    <Moment format="YYYY/MM/DD">{c.created_at}</Moment>
                                </td>
                                <td className='update'>
                                    <button onClick={() => status.updateUpdate(c.csdesc, c.id)}>Update</button>
                                </td>
                                <td className='delete'>
                                    <button 
                                        onClick={() => status.updateDelete(c.csdesc, c.id)}
                                    >
                                        Delete
                                    </button>
                                    {(status.delete) ? status.deleteModal(csEndpoint, this.removeStatuses) : null}                            
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