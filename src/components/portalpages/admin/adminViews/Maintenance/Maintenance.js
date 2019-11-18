import React, { Component } from 'react'
import Moment from 'react-moment'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../pagecomponents/DeleteModal'

const maintEndpoint = config.MAINTENANCE_ENDPOINT

class Maintenance extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    componentDidMount(){
        ApiService.getData(
            maintEndpoint, 
            this.context.setData
        )        
    }

    componentDidUpdate(){
        ApiService.getData(
            maintEndpoint, 
            this.context.setData
        )        
    }
    
    addMaintenanceType = (e) => {
        e.preventDefault()
        const newMaintenanceType = {
                maindescr: e.target.promotion_name.value,
                company_id: 6,
                user_id: 1
        }
        ApiService.postData(
            maintEndpoint, 
            newMaintenanceType, 
            this.context.updateData, 
            this.context.hideModal
        )   
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        let updatedContent = {}

        if(e.target.maint_type.value !== ''){
            updatedContent.maindescr = e.target.maint_type.value
        }
        ApiService.updateData(
            maintEndpoint, 
            id, 
            updatedContent, 
            this.context.hideUpdate
        )
    }


    render(){  
        const maint = this.props.func
        const context = this.context
        return (
            <>
            <DeleteModal
                props={context}
                endpoint={maintEndpoint}
            />
            <Modal className='update-modal' show={context.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {context.name}</h3>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='maint_type'></label>
                                <TextInput
                                    id='maint_type'
                                    name='maint_type'
                                    label='Maintenance Type'
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
                        onSubmit={(e) => this.addMaintenanceType(e)}
                    >
                        <h3>Add a Maintenance Type</h3>
                        <div className='form-group'>
                            <label htmlFor='promotion_name'></label>
                            <TextInput 
                                id='promotion_name'
                                name='promotion_name'
                                label='Maintenance Type'
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
                    <h3>Maintenance</h3>
                    <button className='add-data' onClick={context.showModal}>Add Maintenance Type</button>
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
                            {context.data.map(m => (
                            <tr key={m.id}>
                                <td>{m.maindescr}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{m.created_at}</Moment>
                                </td>
                                <td className='update'>
                                    <button onClick={() => context.updateUpdate(m.maindescr, m.id)}>Update</button>
                                </td>
                                <td className='delete'>
                                    <button onClick={() => context.updateDelete(m.maindescr, m.id)}>Delete</button>
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

export default Maintenance