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


class Transactions extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }
    
    componentDidMount(){
        ApiService.getData(
            `${config.API_ENDPOINT}/transconcepts`, 
            this.context.setData
        )
    }

    componentWillUnmount(){
        this.context.setData([])
    }

    addCategory = (e) => {
        e.preventDefault()
        const newTransactionType = {
            concept: e.target.transaction.value,
        }
        ApiService.postData(
            `${config.API_ENDPOINT}/transconcepts`,
            newTransactionType,
            this.context.updateData,
            this.context.hideModal
        )
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        const updatedContent = {
            concept: e.target.transaction.value
        }
        ApiService.updateData(
            `${config.API_ENDPOINT}/transconcepts`, 
            id, 
            updatedContent, 
            this.context.setData, 
            this.context.hideUpdate
        )
    }

    deleteCategory = (id) => {
        this.context.deleteData(id)
        ApiService.deleteData(
            `${config.API_ENDPOINT}/transconcepts`,  
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
                            <input
                                id='transaction'
                                name='transaction'
                                placeholder='Update Transaction'
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
                        <h3>Add a Transaction</h3>
                        <div className='form-group'>
                            <label htmlFor='transaction'></label>
                            <input 
                                id='transaction'
                                name='transaction'
                                placeholder='New Transaction'
                                type='text'
                            />
                        </div>
                        <input type="submit" className="submit-full submit-modal" value="Add" />
                    </form>
                </Modal>
                
                <div className='data-container'>
                    <h2>Transactions</h2>
                    <AddIcon 
                        className="add-icon" 
                        aria-label="add transaction type" 
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
                            ? context.data.map(c => (
                                <tr key={c.id}>
                                    <td>{c.concept}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">{c.created_at}</Moment>
                                    </td>
                                    <td>
                                        <button className='update-btn' onClick={() => context.updateUpdate(c.concept, c.id)}>
                                            <EditIcon /> 
                                        </button>
                                    </td>
                                    <td>
                                        <button className='delete-btn' onClick={() => context.updateDelete(c.concept, c.id)}>
                                            <DeleteOutlineIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))
                            :   <tr>
                                    <td className="nothing-to-display">No Transactions to Display</td>
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



export default Transactions


