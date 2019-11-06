import React, { Component } from 'react'
import cuuid from 'cuuid'
import ADMIN_DATA from '../../../../../admin-data'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'

let data = ADMIN_DATA.propertyFeatures

class PropertyFeatures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false
        };
    }

    addPropertyFeature = (e) => {
        e.preventDefault()
        console.log('add property feature!!')
        const newPropertyFeatures = {
            featuretype: {
                featuredescr: e.target.feature_name.value,
                dateCreated: this.props.formatDate(),
                company_id: 6,
                user_id: 1,
                id: cuuid()
            }
        }
        data.push(newPropertyFeatures)
    }

    deletePropertyFeatures = (id) => {
        data = data.filter(c => {
            return c.featuretype.id !== id
        })
        this.props.hideDelete();
    }
    
    render(){  
        return (
            <>
                <Modal show={this.props.show} >
                    <form className= 'add_feature' onSubmit={(e) => {this.addPropertyFeature(e); this.props.hideModal();}}>
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
                            {data.map(f => (
                            <tr key={f.featuretype.id}>
                                <td>{f.featuretype.featuredescr}</td>
                                <td>{f.featuretype.dateCreated}</td>
                                <td><button>Update</button></td>
                                <td className='delete'><button onClick={() => this.deletePropertyFeatures(f.featuretype.id)}>Delete</button>
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