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
        e.target.customer_status.value = ""
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
        e.target.customer_status.value = ""
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
                    <CloseIcon 
                        className="close-icon" 
                        onClick={context.hideUpdate}
                    />
                    <div className='update-content'>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='maint_type'>
                                    <h3>Update: {context.name}</h3>
                                </label>
                                <input
                                    id='status_type'
                                    name='status_type'
                                    placeholder='Property Status Type'
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
                        className='add-content' 
                        onSubmit={(e) => this.addCustomerStatus(e)}
                    >
                        <h3>Add a Customer Status</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <input 
                                id='customer_status'
                                name='customer_status'
                                placeholder='Update Customer Status'
                                type='text'
                            />
                        </div>
                        <input type="submit" className="submit-full submit-modal" value="Update" />
                    </form>
                </Modal>
                <div className='data-container'>
                    <h2>Customer Status</h2>
                    <AddIcon 
                        className="add-icon" 
                        aria-label="add comment type" 
                        onClick={context.showModal} 
                    />                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Show In Portal</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(context.data[0])
                                ? context.data.map(c => (
                                <tr key={c.id}>
                                    <td>{c.csdesc}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">{c.created_at}</Moment>
                                    </td>
                                    <td>
                                        <button className='update-btn' onClick={() => context.updateUpdate(c.csdesc, c.id)}>
                                            <EditIcon />
                                        </button>
                                    </td>
                                    <td>
                                        <button className='delete-btn' onClick={() => context.updateDelete(c.csdesc, c.id)}>
                                            <DeleteOutlineIcon />
                                        </button>
                                    </td>
                                </tr>
                                ))
                                : <tr>
                                    <td className="nothing-to-display">No Customer Statuses to Display</td>
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

export default CustomerStatus