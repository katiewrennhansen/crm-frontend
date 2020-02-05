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

class Banks extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }
    
    componentDidMount(){
        ApiService.getData(
            `${config.API_ENDPOINT}/banks`, 
            this.context.setData
        )
    }

    componentWillUnmount(){
        this.context.setData([])
    }

    addCategory = (e) => {
        e.preventDefault()
        const newBank = {
            bank: {
                bankname: e.target.bankname.value,
                bankcode: e.target.bankcode.value
            }
        }
        ApiService.postData(
            `${config.API_ENDPOINT}/banks`,
            newBank,
            this.context.updateData,
            this.context.hideModal
        )

        e.target.bankname.value = ""
        e.target.bankcode.value = ""
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        const updatedBank = {
            bank: {
                bankname: e.target.bankname.value,
                bankcode: e.target.bankcode.value
            }
        }
        ApiService.updateData(
            `${config.API_ENDPOINT}/banks`, 
            id, 
            updatedBank, 
            this.context.setData, 
            this.context.hideUpdate
        )
        e.target.bankname.value = ""
        e.target.bankcode.value = ""
    }

    deleteCategory = (id) => {
        this.context.deleteData(id)
        ApiService.deleteData(
            `${config.API_ENDPOINT}/banks`,  
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
                    deleteFn={this.deleteCategory}
                />
                <Modal className='update-modal' show={context.update}>
                    <CloseIcon 
                        className="close-icon" 
                        onClick={context.hideUpdate}
                    />
                    <form 
                        className='update-content' 
                        onSubmit={(e) => {
                            this.updateData(e);  
                        }}>
                        <div className='form-group'>
                            <label htmlFor='transaction'>
                                <h3>Update: {context.name}</h3>
                            </label>
                            <label htmlFor='bankname'></label>
                            <input 
                                id='update_bankname'
                                name='bankname'
                                defaultValue={context.name}
                                type='text'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='bankcode'></label>
                            <input 
                                id='update_bankcode'
                                name='bankcode'
                                placeholder='Update Bank Code'
                                type='text'
                            />
                        </div>
                        <input type="submit" className="submit-full submit-modal" value="Update" />
                    </form>
                </Modal>

                <Modal className='add-modal' show={context.show} >
                    <CloseIcon 
                        className="close-icon" 
                        onClick={context.hideModal}
                    />
                    <form 
                        className='add-content'
                        onSubmit={(e) => this.addCategory(e)}
                    >
                        <h3>Add a Bank</h3>
                        <div className='form-group'>
                            <label htmlFor='bankname'></label>
                            <input 
                                id='add_bankname'
                                name='bankname'
                                placeholder='New Bank Name'
                                type='text'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='bankcode'></label>
                            <input 
                                id='add_bankcode'
                                name='bankcode'
                                placeholder='New Bank Code'
                                type='text'
                            />
                        </div>
                        <input type="submit" className="submit-full submit-modal" value="Add" />
                    </form>
                </Modal>
                
                <div className='data-container'>
                    <h2>Banks</h2>
                    <AddIcon 
                        className="add-icon" 
                        aria-label="add transaction type" 
                        onClick={context.showModal} 
                    />
                    <table className='data-table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Date Created</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(context.data[0])
                            ? context.data.map(b => (
                                <tr key={b.id}>
                                    <td>{b.bankname}</td>
                                    <td>{b.bankcode}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">{b.created_at}</Moment>
                                    </td>
                                    <td>
                                        <button className='update-btn' onClick={() => context.updateUpdate(b.bankname, b.id)}>
                                            <EditIcon /> 
                                        </button>
                                    </td>
                                    <td>
                                        <button className='delete-btn' onClick={() => context.updateDelete(b.bankname, b.id)}>
                                            <DeleteOutlineIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))
                            :   <tr>
                                    <td className="nothing-to-display">No Banks to Display</td>
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



export default Banks


