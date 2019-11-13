import React, { Component } from 'react'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'


class PropertyStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
            statuses: [],
            error: null
        };
    }

    removeStatus = id => {
        const newStatuses = this.state.statuses.filter(s =>
          s.id !== id
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
        fetch(config.PROPERTY_STATUS_ENDPOINT, {
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



    addPropertyStatus = (e) => {
        e.preventDefault()
        const newPropertyStatus = {
            statusdesc: e.target.feature_status.value,
            showinportal: false,
            company_id: 6,
            user_id: 1
   
        }
        fetch(config.PROPERTY_STATUS_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(newPropertyStatus),
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
                    <form 
                        className= 'add_feature' 
                        onSubmit={(e) => this.addPropertyStatus(e)}
                    >
                        <h3>Add a Property Status</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <TextInput 
                                id='feature_status'
                                name='feature_status'
                                label='Feature Status'
                                type='text'
                                autoComplete='text'
                            />
                        </div>
                        <SubmitButton className='submit_property' text='Save'/>
                    </form>
                    <button onClick={status.hideModal}>Cancel</button>
                </Modal>
                <div className='promotion-container'>
                    <h3>Property Status</h3>
                    <button className='add_promotion' onClick={status.showModal}>Add Property Status</button>
                    <table className='promotion_table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date Created</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.statuses.map(s => (
                            <tr key={s.id}>
                                <td>{s.statusdesc}</td>
                                <td>{s.created_at}</td>
                                <td><button>Update</button></td>
                                <td className='delete'>
                                    <button 
                                        onClick={() => status.updateDelete(s.statusdesc, s.id)}
                                    >
                                        Delete
                                    </button>
                                    {(status.delete) ? status.deleteModal(config.PROPERTY_STATUS_ENDPOINT , this.removeStatus) : null}                                                    
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

export default PropertyStatus