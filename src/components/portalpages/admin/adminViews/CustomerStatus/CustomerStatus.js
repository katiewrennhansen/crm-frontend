import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../../../utilities/Modal/Modal'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../../../utilities/Modal/DeleteModal'

const csEndpoint = config.CUSTOMER_STATUS_ENDPOINT

class CustomerStatus extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    componentDidMount(){
        ApiService.getData(
            csEndpoint, 
            this.context.setData
        )        
    }

    componentWillUnmount(){
        this.context.setData([])
    }

    addCustomerStatus = (e) => {
        e.preventDefault()
        const newCustomerStatus = {
            csdesc: e.target.customer_status.value,
        }
        ApiService.postData(
            csEndpoint, 
            newCustomerStatus, 
            this.context.updateData, 
            this.context.hideModal
        )
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        let updatedContent = {}

        if(e.target.status_type.value !== ''){
            updatedContent.csdesc = e.target.status_type.value
        }

        ApiService.updateDataHalf(csEndpoint, id, updatedContent)
        .then(res => {
            ApiService.getDataHalf(csEndpoint)
                .then(data => {
                    this.context.setData(data)
                    this.context.hideUpdate()
                })
        })
        .catch(error => {
            console.log(error)
        }) 
    }

    deleteStatus = (id) => {
        this.context.deleteData(id)
        ApiService.deleteData(
            csEndpoint, 
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
                endpoint={csEndpoint}
                deleteFn={this.deleteStatus}
            />
            <Modal className='update-modal' show={context.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {context.name}</h3>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='maint_type'></label>
                                <input
                                    id='status_type'
                                    name='status_type'
                                    placeholder='Property Status Type'
                                    type='text'
                                />
                             </div>
                            <input className='update-btn' type='submit' value="Update"></input>
                        </form>
                        <button className='cancel-btn' onClick={context.hideUpdate}>Cancel</button> 
                    </div>
                </Modal>
                <Modal className='add-modal' show={context.show} >
                    <form 
                        className='add-content' 
                        onSubmit={(e) => this.addCustomerStatus(e)}
                    >
                        <h3>Customer Status</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <input 
                                id='customer_status'
                                name='customer_status'
                                placeholder='Update Customer Status'
                                type='text'
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <button className='cancel-btn' onClick={context.hideModal}>Cancel</button>
                </Modal>
                <div className='data-container'>
                    <h3>Customer Status</h3>
                    <button className='add-btn' onClick={context.showModal}>Add Customer Status</button>
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
                            {context.data.map(c => (
                            <tr key={c.id}>
                                <td>{c.csdesc}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{c.created_at}</Moment>
                                </td>
                                <td>
                                    <button className='update-btn' onClick={() => context.updateUpdate(c.csdesc, c.id)}>Update</button>
                                </td>
                                <td>
                                    <button className='delete-btn' onClick={() => context.updateDelete(c.csdesc, c.id)}>Delete</button>
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