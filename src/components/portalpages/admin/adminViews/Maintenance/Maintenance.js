import React, { Component } from 'react'
// import './AdminComments.css'
import cuuid from 'cuuid'
import ADMIN_DATA from '../../../../../admin-data'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'


class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false
        };
    }

    addMaintenanceType = (e) => {
        e.preventDefault()
        console.log('add maintenance type!!')
        const newMaintenanceType = {
            mainttype: {
                id: cuuid(),
                maintdesc: e.target.promotion_name.value,
                dateCreated: this.props.formatDate(),
                company_id: 6,
                user_id: 1
            }
        }
        ADMIN_DATA.maintenanceType.push(newMaintenanceType)
    }

    deleteMaintenanceType = () => {
        console.log('promotion deleted!!')
        this.setState({
            delete: false,
        })
    }

    render(){  
        return (
            <>
                <Modal show={this.props.show} >
                    <form className= 'add_promotions' onSubmit={(e) => {this.addMaintenanceType(e); this.props.hideModal();}}>
                        <h3>Add a Maintenance Type</h3>
                        <div className='form-group'>
                            <label htmlFor='promotion_name'></label>
                            <TextInput 
                                id='promotion_name'
                                name='promotion_name'
                                label='Promotion Name'
                                type='text'
                                autoComplete='text'
                            />
                        </div>
                        <SubmitButton className='submit_promotions' text='Save'/>
                    </form>
                    <button onClick={this.props.hideModal}>Cancel</button>
                </Modal>

                <div className='promotion-container'>
                    <h3>Maintenance</h3>
                    <button className='add_promotion' onClick={this.props.showModal}>Add Maintenance Type</button>
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
                            {ADMIN_DATA.maintenanceType.map(m => (
                            <tr key={m.mainttype.id}>
                                <td>{m.mainttype.maintdesc}</td>
                                <td>{m.mainttype.dateCreated}</td>
                                <td><button>Update</button></td>
                                <td className='delete'><button onClick={this.props.showDelete}>Delete</button>
                                    <Modal show={this.props.delete}>
                                        <h3>
                                            Are you sure you would like to delete this maintenance type?
                                        </h3>
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

export default Maintenance