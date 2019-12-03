import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../utilities/Login/LoginComponents/SubmitButton'
import Modal from '../../../../utilities/Modal/Modal'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../../../utilities/Modal/DeleteModal'

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
                    <form 
                        className='update-content' 
                        onSubmit={(e) => {
                            this.updateData(e);  
                        }}>
                        <div className='form-group'>
                            <label htmlFor='category'>
                                <h3>Update {context.name}</h3>
                            </label>
                            <input
                                id='category'
                                name='category'
                                placeholder='Update Category'
                                type='text'
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Update'/>
                    </form>
                    <button className='cancel-btn' onClick={context.hideUpdate}>Cancel</button>   
                </Modal>

                <Modal className='add-modal' show={context.show} >
                    <form 
                        className='add-content'
                        onSubmit={(e) => this.addCategory(e)}
                    >
                        <h3>Add a Comment Type</h3>
                        <div className='form-group'>
                            <label htmlFor='comment_type'></label>
                            <input 
                                id='category'
                                name='category'
                                placeholder='New Category'
                                type='text'
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <button className='cancel-btn' onClick={context.hideModal}>Cancel</button>
                </Modal>
                
                <div className='data-container'>
                    <h3>Categories</h3>
                    <button className='add-btn' onClick={context.showModal}>Add Category</button>
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
                        {context.data.map(c => (
                            <tr key={c.id}>
                                <td>{c.ccategdesc}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{c.created_at}</Moment>
                                </td>
                                <td>
                                    <button className='update-btn' onClick={() => context.updateUpdate(c.ccategdesc, c.id)}>Update</button>
                                </td>
                                <td>
                                    <button className='delete-btn' onClick={() => context.updateDelete(c.ccategdesc, c.id)}>Delete</button>
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



export default Categories


