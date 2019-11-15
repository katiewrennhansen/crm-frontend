import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'

const pfEndpoint = config.PROPERTY_FEATURE_ENDPOINT

class PropertyFeatures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
            features: [],
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
        this.props.func.hideDelete()
      }
    
    setFeature = features => {
        this.setState({
            features: features,
            error: null
        })
    }
    updateFeatures = data => {
        this.setState({
            features: [...this.state.features, data],
            error: null
        })
    }

    componentDidMount(){
        this.props.func.fetchData(pfEndpoint, this.setFeature)        
    }

    componentDidUpdate(){
        this.props.func.fetchData(pfEndpoint, this.setFeature)        
    }

    addPropertyFeature = (e) => {
        e.preventDefault()
        const newPropertyFeatures = {
            featuredescr: e.target.feature_name.value,
            company_id: 6,
            user_id: 7,
        }
        fetch(pfEndpoint, {
            method: 'POST',
            body: JSON.stringify(newPropertyFeatures),
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
            this.updateFeatures(data)
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

        if(e.target.feat_type.value !== ''){
            updatedContent.featuredescr = e.target.feat_type.value
        }
        fetch(`${pfEndpoint}/${id}`, {
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
        const feature = this.props.func
        return (
            <>
            <Modal className='update-modal' show={feature.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {this.props.func.updateContent.name}</h3>
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
                            <button onClick={feature.hideUpdate}>Cancel</button>   
                        </div>
                    </div>
                </Modal>
                <Modal show={feature.show} >
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
                        <button onClick={feature.hideModal}>Cancel</button>
                    </div>
                </Modal>
                <div className='data-container'>
                    <h3>Property Features</h3>
                    <button className='add-data' onClick={feature.showModal}>Add Property Feature</button>
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
                            {this.state.features.map(f => (
                            <tr key={f.id}>
                                <td>{f.featuredescr}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{f.created_at}</Moment>
                                </td>
                                <td className='update'>
                                    <button onClick={() => feature.updateUpdate(f.featuredescr, f.id)}>Update</button>
                                </td>
                                <td className='delete'>
                                    <button 
                                        onClick={() => feature.updateDelete(f.featuredescr, f.id)}
                                    >
                                        Delete
                                    </button>
                                    {(feature.delete) ? feature.deleteModal(config.PROPERTY_FEATURE_ENDPOINT, this.removeFeature) : null}                                    
                                  
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