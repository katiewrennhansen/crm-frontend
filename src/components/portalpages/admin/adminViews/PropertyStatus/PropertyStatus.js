import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../utilities/Login/LoginComponents/SubmitButton'
import Modal from '../../../../utilities/Modal/Modal'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../../../utilities/Modal/DeleteModal'
import AddIcon from '@material-ui/icons/Add';

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

    componentWillUnmount(){
        this.context.setData([])
    }

    addPropertyStatus = (e) => {
        e.preventDefault()
        const newPropertyStatus = {
            statusdesc: e.target.feature_status.value,
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

        ApiService.updateDataHalf(psEndpoint, id, updatedContent)
        .then(res => {
            ApiService.getDataHalf(psEndpoint)
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
            psEndpoint, 
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
                    endpoint={psEndpoint}
                    deleteFn={this.deleteStatus}
                />

                <Modal className='update-modal' show={context.update}>
                    <div className='update-content'>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='maint_type'>
                                    <h3>Update {context.name}</h3>
                                </label>
                                <input
                                    id='status_type'
                                    name='status_type'
                                    placeholder='Property Status Type'
                                    type='text'
                                />
                            </div>
                            <SubmitButton className='submit-content' text='Update'/>
                        </form>
                    </div>
                    <button className='cancel-btn' onClick={context.hideUpdate}>Cancel</button> 
                </Modal>

                <Modal className='add-modal' show={context.show} >
                    <form 
                        className= 'add-content' 
                        onSubmit={(e) => this.addPropertyStatus(e)}
                    >
                        <h3>Add a Property Status</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <input 
                                id='feature_status'
                                name='feature_status'
                                placeholder='Update Property Status'
                                type='text'
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <button className='cancel-btn' onClick={context.hideModal}>Cancel</button>
                </Modal>

                <div className='data-container'>
                    <h2>Property Status</h2>
                    <AddIcon 
                        className="add-icon" 
                        fontSize="large" 
                        aria-label="add comment type" 
                        onClick={context.showModal} 
                    />                    <table className='data-table'>
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
                                <td>
                                    <button className='update-btn' onClick={() => context.updateUpdate(s.statusdescr, s.id)}>Update</button>
                                </td>
                                <td>
                                    <button className='delete-btn' onClick={() => context.updateDelete(s.statusdesc, s.id)}>Delete</button>
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