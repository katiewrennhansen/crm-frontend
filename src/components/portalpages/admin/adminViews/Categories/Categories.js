import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../pagecomponents/DeleteModal'

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
                    <div className='update-modal-grid'>
                        <h3>Update {context.name}</h3>
                        <form 
                            className='update-content' 
                            onSubmit={(e) => {
                                this.updateData(e);  
                            }}>
                            <div className='form-group'>
                                <label htmlFor='category'>Update Category: </label>
                                <input
                                    id='category'
                                    name='category'
                                    placeholder='Update Category'
                                    type='text'
                                />
                            </div>
                            <div className='update'>
                                <button type='submit'>Update</button>
                            </div>
                        </form>
                        <div className='cancel'>
                            <button onClick={context.hideUpdate}>Cancel</button>   
                        </div>
                    </div>
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
                    <div className='cancel'>
                        <button onClick={context.hideModal}>Cancel</button>
                    </div>
                </Modal>
                
                <div className='data-container'>
                    <h3>Categories</h3>
                    <button className='add-data' onClick={context.showModal}>Add Category</button>
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
                                <td className='update'>
                                    <button onClick={() => context.updateUpdate(c.ccategdesc, c.id)}>Update</button>
                                </td>
                                <td className='delete'>
                                    <button onClick={() => context.updateDelete(c.ccategdesc, c.id)}>Delete</button>
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


