import React, { Component } from 'react'
// import './AdminComments.css'
import cuuid from 'cuuid'
import ADMIN_DATA from '../../../../../admin-data'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'

class PropertyStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false
        };
    }

    addPropertyStatus = (e) => {
        e.preventDefault()
        console.log('add property feature!!')
        const newPropertyStatus = {
            status: {
                id: cuuid(),
                statusdesc: e.target.feature_status.value,
                dateCreated: this.props.formatDate(),
                showInPortal: false,
                company_id: 6,
                user_id: 1
            }
        }
        ADMIN_DATA.propertyStatus.push(newPropertyStatus)
    }

    render(){  
        return (
            <>
                <Modal show={this.props.show} >
                    <form className= 'add_feature' onSubmit={(e) => {this.addPropertyStatus(e); this.props.hideModal();}}>
                        <h3>Add a Property Status</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <TextInput 
                                id='feature_status'
                                name='feature_status'
                                label='Feature Status'
                                type='text'
                                autoComplete='text'
                            />
                        </div>
                        <SubmitButton className='submit_property' text='Save'/>
                    </form>
                    <button onClick={this.props.hideModal}>Cancel</button>
                </Modal>
                <div className='promotion-container'>
                    <h3>Property Status</h3>
                    <button className='add_promotion' onClick={this.props.showModal}>Add Property Status</button>
                    <table className='promotion_table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Show In Portal</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ADMIN_DATA.propertyStatus.map(s => (
                            <tr key={s.status.id}>
                                <td>{s.status.statusdesc}</td>
                                <td>{s.status.dateCreated}</td>
                                <td><button>Update</button></td>
                                <td className='delete'><button onClick={this.props.showDelete}>Delete</button>
                                    <Modal show={this.props.delete}>
                                        <h3>Are you sure you would like to delete this property feature?</h3>
                                        <button onClick={this.props.hideDelete}>Cancel</button>
                                        <div className='delete'>
                                            <button onClick={this.deletePromotion}>Delete</button>
                                        </div>
                                    </Modal>
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