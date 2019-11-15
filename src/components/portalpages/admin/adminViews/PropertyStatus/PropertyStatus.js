import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'

const psEndpoint = config.PROPERTY_STATUS_ENDPOINT

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
        this.props.func.fetchData(psEndpoint, this.setStatuses)        
    }

    componentDidUpdate() {
        this.props.func.fetchData(psEndpoint, this.setStatuses)        
    }


    addPropertyStatus = (e) => {
        e.preventDefault()
        const newPropertyStatus = {
            statusdesc: e.target.feature_status.value,
            showinportal: false,
            company_id: 6,
            user_id: 1
        }
        fetch(psEndpoint, {
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

    updateData = (e) => {
        e.preventDefault()
        const id = this.props.func.updateContent.id
        let updatedContent = {}

        if(e.target.status_type.value !== ''){
            updatedContent.statusdesc = e.target.status_type.value
        }
        fetch(`${psEndpoint}/${id}`, {
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
                        className= 'add-content' 
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
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <div className='cancel'>                    
                        <button onClick={status.hideModal}>Cancel</button>
                    </div>
                </Modal>
                <div className='data-container'>
                    <h3>Property Status</h3>
                    <button className='add-data' onClick={status.showModal}>Add Property Status</button>
                    <table className='data-table'>
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
                                <td>
                                    <Moment format="YYYY/MM/DD">{s.created_at}</Moment>                                
                                </td>
                                <td className='update'>
                                    <button onClick={() => status.updateUpdate(s.statusdescr, s.id)}>Update</button>
                                </td>
                                <td className='delete'>
                                    <button 
                                        onClick={() => status.updateDelete(s.statusdesc, s.id)}
                                    >
                                        Delete
                                    </button>
                                    {(status.delete) ? status.deleteModal(psEndpoint , this.removeStatus) : null}                                                    
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