import React, { Component } from 'react'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'

function deletePropertyFeature(id, cb){
    fetch(`${config.PROPERTY_FEATURE_ENDPOINT}/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${config.API_KEY}`
        }
    })
    .then((res) => {
        if(!res.ok){
            return res.json().then(error => Promise.reject(error))
        }
        return res.text()
    })
    .then(data => {
        cb(id)
    })
    .catch(error => {
        console.error(error)
    })
}

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
        fetch(config.PROPERTY_FEATURE_ENDPOINT, {
            method: 'GET',
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
            this.setFeature(data)
        })
        .catch(error => {
            this.setState({ error })
        })
    }


    addPropertyFeature = (e) => {
        e.preventDefault()
        console.log('add property feature!!')
        const newPropertyFeatures = {
            featuredescr: e.target.feature_name.value,
            company_id: 6,
            user_id: 7,
        }
        console.log(newPropertyFeatures)
        fetch(config.PROPERTY_FEATURE_ENDPOINT, {
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
            this.props.hideModal()
        })
        .catch(error => {
            this.setState({ error })
        })
    }

 
    
    render(){  
        return (
            <>
                <Modal show={this.props.show} >
                    <form className= 'add_feature' onSubmit={(e) => this.addPropertyFeature(e)}>
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
                        <SubmitButton className='submit_property' text='Save'/>
                    </form>
                    <button onClick={this.props.hideModal}>Cancel</button>
                </Modal>
                <div className='promotion-container'>
                    <h3>Property Features</h3>
                    <button className='add_promotion' onClick={this.props.showModal}>Add Property Feature</button>
                    <table className='promotion_table'>
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
                                <td>{f.created_at}</td>
                                <td><button>Update</button></td>
                                <td className='delete'><button onClick={() => deletePropertyFeature(f.id, this.removeFeature)}>Delete</button>
                                    {/* <Modal show={this.props.delete}>
                                        <h3>Are you sure you would like to delete this property feature?</h3>
                                        <button onClick={this.props.hideDelete}>Cancel</button>
                                        <div className='delete'>
                                            <button onClick={() => this.deletePropertyFeatures(f.featuretype.id)}>Delete</button>
                                        </div>
                                    </Modal> */}
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