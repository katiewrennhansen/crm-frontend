import React, { Component } from 'react'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'

function deleteStatus(id, cb){
    fetch( `${config.PROPERTY_STATUS_ENDPOINT}/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${config.API_KEY}`
        }
    })
    .then((res) => {
        if(!res.ok){
            return res.json().then(error => Promise.reject(error))
        }
        return res.text()
    })
    .then(data => {
        cb(id)
    })
    .catch(error => {
        console.error(error)
    })
}

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
            status: {
                statusdesc: e.target.feature_status.value,
                showinportal: false,
                company_id: 6,
                user_id: 1
            }
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
            this.props.hideModal()
        })
        .catch(error => {
            this.setState({ error })
        })
    }



    render(){  
        return (
            <>
                <Modal show={this.props.show} >
                    <form className= 'add_feature' onSubmit={(e) => this.addPropertyStatus(e)}>
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
                    <button onClick={this.props.hideModal}>Cancel</button>
                </Modal>
                <div className='promotion-container'>
                    <h3>Property Status</h3>
                    <button className='add_promotion' onClick={this.props.showModal}>Add Property Status</button>
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
                                <td className='delete'><button onClick={() => deleteStatus(s.id, this.removeStatus)}>Delete</button>
                                    {/* <Modal show={this.props.delete}>
                                        <h3>Are you sure you would like to delete this property feature?</h3>
                                        <button onClick={this.props.hideDelete}>Cancel</button>
                                        <div className='delete'>
                                            <button onClick={() => this.deletePropertyStatus(s.status.id)}>Delete</button>
                                        </div>
                                    </Modal> */}
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