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

const pfEndpoint = config.PROPERTY_FEATURE_ENDPOINT

class PropertyFeatures extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    componentDidMount(){
        ApiService.getData(
            pfEndpoint, 
            this.context.setData
        )        
    }

    componentWillUnmount(){
        this.context.setData([])
    }

    addPropertyFeature = (e) => {
        e.preventDefault()
        const newPropertyFeatures = {
            featuredescr: e.target.feature_name.value,
        }
        ApiService.postData(
            pfEndpoint, 
            newPropertyFeatures, 
            this.context.updateData, 
            this.context.hideModal
        )
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        let updatedContent = {}

        if(e.target.feat_type.value !== ''){
            updatedContent.featuredescr = e.target.feature_name.value
        }
        ApiService.updateDataHalf(pfEndpoint, id, updatedContent)
            .then(res => {
                ApiService.getDataHalf(pfEndpoint)
                    .then(data => {
                        this.context.setData(data)
                        this.context.hideUpdate()
                    })
            })
            .catch(error => {
                console.log(error)
            })   
    }

    deleteFeature = (id) => {
        this.context.deleteData(id)
        ApiService.deleteData(
            pfEndpoint, 
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
                    endpoint={pfEndpoint}
                    deleteFn={this.deleteFeature}
                />

                <Modal className='update-modal' show={context.update}>
                    <CloseIcon 
                        className="close-icon" 
                        onClick={context.hideUpdate}
                    />
                    <div className='update-content'>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='feature_name'>
                                    <h3>Update: {context.name}</h3>
                                </label>
                                <input
                                    id='update_feature_name'
                                    name='feature_name'
                                    placeholder='Update Feature Name'
                                    type='text'
                                />
                            </div>
                            <input type="submit" className="submit-full submit-modal" value="Update" />
                        </form>
                    </div>
                </Modal>

                <Modal show={context.show}>
                    <CloseIcon 
                        className="close-icon" 
                        onClick={context.hideModal}
                    />
                    <form 
                        className= 'add-content' 
                        onSubmit={(e) => this.addPropertyFeature(e)}
                    >
                        <h3>Add a Property Feature</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <input 
                                id='add_feature_name'
                                name='feature_name'
                                placeholder='Update Feature Name'
                                type='text'
                            />
                        </div>
                        <input type="submit" className="submit-full submit-modal" value="Update" />
                    </form>
                </Modal>
                
                <div className='data-container'>
                    <h2>Property Features</h2>
                    <AddIcon 
                        className="add-icon" 
                        aria-label="add comment type" 
                        onClick={context.showModal} 
                    />                    
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date Created</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(context.data[0])
                                ? context.data.map(f => (
                                <tr key={f.id}>
                                    <td>{f.featuredescr}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">{f.created_at}</Moment>
                                    </td>
                                    <td>
                                        <button className='update-btn' onClick={() => context.updateUpdate(f.featuredescr, f.id)}>
                                            <EditIcon />
                                        </button>
                                    </td>
                                    <td>
                                        <button className='delete-btn' onClick={() => context.updateDelete(f.featuredescr, f.id)}>
                                            <DeleteOutlineIcon />
                                        </button>
                                    </td>
                                </tr>
                                ))
                                : <tr>
                                    <td className="nothing-to-display">No Property Features to Display</td>
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

export default PropertyFeatures