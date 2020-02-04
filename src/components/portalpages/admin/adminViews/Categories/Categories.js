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

const catEndpoint = config.CATEGORIES_ENDPOINT

class Categories extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }
    
    componentDidMount(){
        ApiService.getData(
            catEndpoint, 
            this.context.setData
        )
    }

    componentWillUnmount(){
        this.context.setData([])
    }

    addCategory = (e) => {
        e.preventDefault()
        const newCategoryType = {
            ccategdesc: e.target.category.value,
        }
        ApiService.postData(
            catEndpoint, 
            newCategoryType,
            this.context.updateData,
            this.context.hideModal
        )
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        const updatedContent = {
            ccategdesc: e.target.category.value
        }
        ApiService.updateData(
            catEndpoint, 
            id, 
            updatedContent, 
            this.context.setData, 
            this.context.hideUpdate
        )
    }

    deleteCategory = (id) => {
        this.context.deleteData(id)

        ApiService.deleteData(
            catEndpoint, 
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
                    endpoint={catEndpoint}
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
                            <label htmlFor='category'>
                                <h3>Update: {context.name}</h3>
                            </label>
                            <input
                                id='update_category'
                                name='category'
                                placeholder='Update Category'
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
                        <h3>Add a Category</h3>
                        <div className='form-group'>
                            <label htmlFor='comment_type'></label>
                            <input 
                                id='add_category'
                                name='category'
                                placeholder='New Category'
                                type='text'
                            />
                        </div>
                        <input type="submit" className="submit-full submit-modal" value="Update" />
                    </form>
                </Modal>
                
                <div className='data-container'>
                    <h2>Categories</h2>
                    <AddIcon 
                        className="add-icon" 
                        aria-label="add comment type" 
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
                                    <td>{c.ccategdesc}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD">{c.created_at}</Moment>
                                    </td>
                                    <td>
                                        <button className='update-btn' onClick={() => context.updateUpdate(c.ccategdesc, c.id)}>
                                            <EditIcon /> 
                                        </button>
                                    </td>
                                    <td>
                                        <button className='delete-btn' onClick={() => context.updateDelete(c.ccategdesc, c.id)}>
                                            <DeleteOutlineIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))
                            :   <tr>
                                    <td className="nothing-to-display">No Categories to Display</td>
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



export default Categories


