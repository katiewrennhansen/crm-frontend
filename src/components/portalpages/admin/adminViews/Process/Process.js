import React, { Component } from 'react'
import cuuid from 'cuuid'
import ADMIN_DATA from '../../../../../admin-data'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'

let data = ADMIN_DATA.process

class Process extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false
        };
    }

    addProcess = (e) => {
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
        data.push(newPropertyStatus)
    }

    deleteProcess = (id) => {
        data = data.filter(c => {
            return c.ptype.id !== id
        })
        // for(let i = 0; i < data.length; i++){
        //     if(data[i].ptype.id === id)
        //         data.splice(i, 1)
        // }
        
        this.props.hideDelete();
    }

    render(){  
        return (
            <>
                <Modal show={this.props.show} >
                    <form className= 'add_feature' onSubmit={(e) => {this.addProcess(e); this.props.hideModal();}}>
                        <h3>Add a Process</h3>
                        <div className='form-group'>
                            <label htmlFor='feature_name'></label>
                            <TextInput 
                                id='process'
                                name='process'
                                label='Process'
                                type='text'
                                autoComplete='text'
                            />
                        </div>
                        <SubmitButton className='submit_property' text='Save'/>
                    </form>
                    <button onClick={this.props.hideModal}>Cancel</button>
                </Modal>
                <div className='promotion-container'>
                    <h3>Process</h3>
                    <button className='add_promotion' onClick={this.props.showModal}>Add Process</button>
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
                            {data.map(p => {
                                return (
                                <tr key={p.ptype.id}>
                                    <td>{p.ptype.title}</td>
                                    <td>{p.ptype.dateCreated}</td>
                                    <td><button>Update</button></td>
                                    <td className='delete'><button onClick={() => this.deleteProcess(p.ptype.id)}>Delete</button>
                                        {/* <Modal show={this.props.delete}>
                                            <h3>Are you sure you would like to delete this process?</h3>
                                            <button onClick={this.props.hideDelete}>Cancel</button>
                                            <div className='delete'>
                                                <button onClick={() => this.deleteProcess(p.ptype.id)}>Delete</button>
                                            </div>
                                        </Modal> */}
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default Process