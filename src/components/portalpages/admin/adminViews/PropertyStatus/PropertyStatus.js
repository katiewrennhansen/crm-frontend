import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../AdminContext'
import DeleteModal from '../../pagecomponents/DeleteModal'

const psEndpoint = config.PROPERTY_STATUS_ENDPOINT

class PropertyStatus extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    componentDidMount(){
        ApiService.getData(
            psEndpoint, 
            this.context.setData
        )        
    }

    componentDidUpdate() {
        ApiService.getData(
            psEndpoint, 
            this.context.setData
        )        
    }

    addPropertyStatus = (e) => {
        e.preventDefault()
        const newPropertyStatus = {
            statusdesc: e.target.feature_status.value,
            showinportal: false,
            company_id: 6,
            user_id: 1
        }
        ApiService.postData(
            psEndpoint, 
            newPropertyStatus, 
            this.context.updateData, 
            this.context.hideModal
        )
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        let updatedContent = {}

        if(e.target.status_type.value !== ''){
            updatedContent.statusdesc = e.target.status_type.value
        }
        ApiService.updateData(
            psEndpoint, 
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
                endpoint={psEndpoint}
            />
            <Modal className='update-modal' show={context.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {context.name}</h3>
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
                            <button onClick={context.hideUpdate}>Cancel</button>   
                        </div>
                    </div>
                </Modal>
                <Modal className='add-modal' show={context.show} >
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
                        <button onClick={context.hideModal}>Cancel</button>
                    </div>
                </Modal>
                <div className='data-container'>
                    <h3>Property Status</h3>
                    <button className='add-data' onClick={context.showModal}>Add Property Status</button>
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
                            {context.data.map(s => (
                            <tr key={s.id}>
                                <td>{s.statusdesc}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{s.created_at}</Moment>                                
                                </td>
                                <td className='update'>
                                    <button onClick={() => context.updateUpdate(s.statusdescr, s.id)}>Update</button>
                                </td>
                                <td className='delete'>
                                    <button onClick={() => context.updateDelete(s.statusdesc, s.id)}>Delete</button>
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