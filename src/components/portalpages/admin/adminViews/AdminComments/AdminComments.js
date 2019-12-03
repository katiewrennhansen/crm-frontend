import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../../../utilities/Modal/Modal'
import config from '../../../../../config'
import ApiService from '../../../../../services/api-service'
import AdminContext from '../../../../../contexts/AdminContext'
import DeleteModal from '../../../../utilities/Modal/DeleteModal'

const commEndpoint = config.COMMENTS_ENDPOINT

class AdminComments extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }
    
    componentDidMount(){
        ApiService.getData(
            commEndpoint, 
            this.context.setData
        )
    }

    componentWillUnmount(){
        this.context.setData([])
    }

    addComment = (e) => {
        e.preventDefault()
        const newCommentType = {
            commdesc: e.target.comment_type.value,
        }
        ApiService.postData(
            commEndpoint, 
            newCommentType,
            this.context.updateData,
            this.context.hideModal
        )
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        const updatedContent = {
            commdesc: e.target.comment_type.value
        }
        ApiService.updateData(
            commEndpoint, 
            id, 
            updatedContent, 
            this.context.setData, 
            this.context.hideUpdate
        )
    }

    deleteComment = (id) => {
        this.context.deleteData(id)
        ApiService.deleteData(
            commEndpoint, 
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
                endpoint={commEndpoint}
                deleteFn={this.deleteComment}
            />
            <Modal className='update-modal' show={context.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {context.name}</h3>
                        <form 
                            className='form-group' 
                            onSubmit={(e) => {
                                this.updateData(e);  
                            }}>
                            <div className='form-group'>
                                <label htmlFor='comment_type'>Update Type: </label>
                                <input
                                    id='comment_type'
                                    name='comment_type'
                                    type='text'
                                    placeholder="Comment Type"
                                />
                            </div>
                            <input className='update-btn' type='submit' value="pdate"></input>
                        </form>
                        <button className='cancel-btn' onClick={context.hideUpdate}>Cancel</button>   
                    </div>
                </Modal>
                <Modal className='add-modal' show={context.show} >
                    <form 
                        className='add-content'
                        onSubmit={(e) => this.addComment(e)}
                    >
                        <label htmlFor='comment_type'><h3>Add a Comment Type</h3></label>
                        <div className='form-group'>
                            <input
                                id='comment_type'
                                name='comment_type'
                                type='text'
                                placeholder="Update Comment"
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <button className='cancel-btn' onClick={context.hideModal}>Cancel</button>
                </Modal>
                
                <div className='data-container'>
                    <h3>Comments Type</h3>
                    <button className='add-btn' onClick={context.showModal}>Add Comment Type</button>
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
                                <td>{c.commdesc}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{c.created_at}</Moment>
                                </td>
                                <td>
                                    <button className='update-btn' onClick={() => context.updateUpdate(c.commdesc, c.id)}>Update</button>
                                </td>
                                <td>
                                    <button  className='delete-btn' onClick={() => context.updateDelete(c.commdesc, c.id)}>Delete</button>
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



export default AdminComments


