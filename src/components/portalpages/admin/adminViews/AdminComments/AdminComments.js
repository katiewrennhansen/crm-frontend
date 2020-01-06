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
                            <label htmlFor='comment_type'>
                                <h3>Update: {context.name}</h3>
                                </label>
                            <input
                                id='comment_type'
                                name='comment_type'
                                type='text'
                                placeholder='Update Comment'
                            />
                        </div>
                        <input type="submit" className="submit-full submit-modal" value="Update" />
                    </form>
                </Modal>
                
                <Modal className='add-modal' show={context.show}>
                    <CloseIcon 
                        className="close-icon" 
                        onClick={context.hideModal}
                    />
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
                                placeholder="New Comment"
                            />
                        </div>
                        <input type="submit" className="submit-full submit-modal" value="Update" />
                    </form>
                </Modal>
                
                <div className='data-container'>
                    <h2>Comments Type</h2>
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
                                    <button className='update-btn' onClick={() => context.updateUpdate(c.commdesc, c.id)}>
                                        <EditIcon />
                                    </button>
                                </td>
                                <td>
                                    <button  className='delete-btn' onClick={() => context.updateDelete(c.commdesc, c.id)}>
                                        <DeleteOutlineIcon />
                                    </button>
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


