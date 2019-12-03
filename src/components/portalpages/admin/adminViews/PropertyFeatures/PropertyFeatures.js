import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../../../utilities/Modal/Modal'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../../../utilities/Modal/DeleteModal'

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
            updatedContent.featuredescr = e.target.feat_type.value
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
                    <div className='update-modal-grid'>
                        <h3>Update {context.name}</h3>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='maint_type'></label>
                                <input
                                    id='feat_type'
                                    name='feat_type'
                                    placeholder='Update Feature Name'
                                    type='text'
                                />
                            </div>
                            <input className='update-btn' type='submit' value="Update"></input>
                        </form>
                        <button className='cancel-btn' onClick={context.hideUpdate}>Cancel</button> 
                    </div>
                </Modal>
                <Modal show={context.show} >
                    <form 
                        className= 'add-content' 
                        onSubmit={(e) => this.addPropertyFeature(e)}
                    >
                        <h3>Add a Property Feature</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <input 
                                id='feature_name'
                                name='feature_name'
                                placeholder='Update Feature Name'
                                type='text'
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <button className='cancel-btn' onClick={context.hideModal}>Cancel</button>
                </Modal>
                <div className='data-container'>
                    <h3>Property Features</h3>
                    <button className='add-btn' onClick={context.showModal}>Add Property Feature</button>
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
                            {context.data.map(f => (
                            <tr key={f.id}>
                                <td>{f.featuredescr}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{f.created_at}</Moment>
                                </td>
                                <td>
                                    <button className='update-btn' onClick={() => context.updateUpdate(f.featuredescr, f.id)}>Update</button>
                                </td>
                                <td>
                                    <button className='delete-btn' onClick={() => context.updateDelete(f.featuredescr, f.id)}>Delete</button>
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

export default PropertyFeatures