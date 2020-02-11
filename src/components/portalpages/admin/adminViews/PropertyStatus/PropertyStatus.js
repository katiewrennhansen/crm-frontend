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
            showinportal: e.target.showinportal.value
        }
        ApiService.postData(
            psEndpoint, 
            newPropertyStatus, 
            this.context.updateData, 
            this.context.hideModal
        )
        e.target.feature_status.value = ""
        e.target.showinportal.value = ""
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        let updatedContent = {}

        if(e.target.status_type.value !== ''){
            updatedContent.statusdesc = e.target.feature_status.value
            updatedContent.showinportal = e.target.showinportal.value
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
        e.target.feature_status.value = ""
        e.target.showinportal.value = ""
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
                <CloseIcon 
                        className="close-icon" 
                        onClick={context.hideUpdate}
                    />
                    <div className='update-content'>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='feature_status'>
                                    <h3>Update: {context.name}</h3>
                                </label>
                                <input
                                    id='update_feature_status'
                                    name='feature_status'
                                    placeholder='Property Status Type'
                                    type='text'
                                />
                                <label htmlFor="showinportal">Require to Show in Website?<span className="required">*</span></label>
                            <select name="showinportal">
                                <option value="">Select an option</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
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
                        className= 'add-content' 
                        onSubmit={(e) => this.addPropertyStatus(e)}
                    >
                        <h3>Add a Property Status</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_status'></label>
                            <input 
                                id='add_feature_status'
                                name='feature_status'
                                placeholder='Update Property Status'
                                type='text'
                            />
                            <label htmlFor="showinportal">Require to Show in Website?<span className="required">*</span></label>
                            <select name="showinportal">
                                <option value="">Select an option</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <input type="submit" className="submit-full submit-modal" value="Add" />
                    </form>
                </Modal>

                <div className='data-container'>
                    <h2>Property Status</h2>
                    <AddIcon 
                        className="add-icon" 
                        aria-label="add comment type" 
                        onClick={context.showModal} 
                    />                    
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Promotional Web</th>
                                <th>Date Created</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(context.data[0])
                                ? context.data.map(s => (
                                <tr key={s.id}>
                                    <td>{s.statusdesc}</td>
                                    <td>{(s.showinportal) ? 'Yes' : 'No'}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">{s.created_at}</Moment>                                
                                    </td>
                                    <td>
                                        <button className='update-btn' onClick={() => context.updateUpdate(s.statusdescr, s.id)}>
                                            <EditIcon />
                                        </button>
                                    </td>
                                    <td>
                                        <button className='delete-btn' onClick={() => context.updateDelete(s.statusdesc, s.id)}>
                                            <DeleteOutlineIcon />
                                        </button>
                                    </td>
                                </tr>
                                ))
                                : <tr>
                                    <td className="nothing-to-display">No Property Statuses to Display</td>
                                    <td></td>
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

export default PropertyStatus