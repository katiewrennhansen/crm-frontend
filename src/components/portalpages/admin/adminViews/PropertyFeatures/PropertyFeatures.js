import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../AdminContext'

const pfEndpoint = config.PROPERTY_FEATURE_ENDPOINT

class PropertyFeatures extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    removeFeature = id => {
        const newFeatures = this.state.features.filter(f =>
          f.id !== id
        )
        this.setState({
          features: newFeatures
        })
        this.context.hideDelete()
      }


    componentDidMount(){
        ApiService.getData(
            pfEndpoint, 
            this.context.setData
        )        
    }

    componentDidUpdate(){
        ApiService.getData(
            pfEndpoint, 
            this.context.setData
        )        
    }

    addPropertyFeature = (e) => {
        e.preventDefault()
        const newPropertyFeatures = {
            featuredescr: e.target.feature_name.value,
            company_id: 6,
            user_id: 7,
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
        ApiService.updateData(
            pfEndpoint, 
            id, 
            updatedContent, 
            this.context.hideUpdate
        )
    }
 
    
    render(){  
        const feature = this.props.func
        const context = this.context
        return (
            <>
            <Modal className='update-modal' show={context.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {context.name}</h3>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='maint_type'></label>
                                <TextInput
                                    id='feat_type'
                                    name='feat_type'
                                    label='Feature Name'
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
                <Modal show={context.show} >
                    <form 
                        className= 'add-content' 
                        onSubmit={(e) => this.addPropertyFeature(e)}
                    >
                        <h3>Add a Property Feature</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <TextInput 
                                id='feature_name'
                                name='feature_name'
                                label='Feature Name'
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
                    <h3>Property Features</h3>
                    <button className='add-data' onClick={context.showModal}>Add Property Feature</button>
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
                                <td className='update'>
                                    <button onClick={() => context.updateUpdate(f.featuredescr, f.id)}>Update</button>
                                </td>
                                <td className='delete'>
                                    <button 
                                        onClick={() => feature.updateDelete(f.featuredescr, f.id)}
                                    >
                                        Delete
                                    </button>
                                    {(feature.delete) ? feature.deleteModal(pfEndpoint, this.removeFeature) : null}                                    
                                  
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