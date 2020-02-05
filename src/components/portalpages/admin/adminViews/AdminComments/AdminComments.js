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


class AdminComments extends Component {
    static contextType = AdminContext

    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }
    
    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/commtypes`)
            .then(data => this.context.setData(data))
            .catch(error => console.log(error))
    }

    componentWillUnmount(){
        this.context.setData([])
    }

    addComment = (e) => {
        e.preventDefault()
        const newCommentType = {
            commtype: {
                commdesc: e.target.comment_type.value
            }        
        }
        ApiService.postData(
            `${config.API_ENDPOINT}/commtypes`,
            newCommentType,
            this.context.updateData,
            this.context.hideModal
        )
        e.target.comment_type.value = ""
    }

    updateData = (e) => {
        e.preventDefault()
        const id = this.context.id
        const updatedContent = {
            commtype: {
                commdesc: e.target.comment_type.value
            }
        }
        ApiService.updateData(
            `${config.API_ENDPOINT}/commtypes`, 
            id, 
            updatedContent, 
            this.context.setData, 
            this.context.hideUpdate
        )
        e.target.comment_type.value = ""
    }

    deleteComment = (id) => {
        this.context.deleteData(id)
        ApiService.deleteData(
            `${config.API_ENDPOINT}/commtypes`, 
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
                    endpoint={`${config.API_ENDPOINT}/commtypes`}
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
                                id='update_comment_type'
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
                        <div className='form-group'>
                            <label htmlFor='comment_type'>
                                <h3>Add a Comment Type</h3>
                            </label>
                            <input
                                id='add_comment_type'
                                name='comment_type'
                                type='text'
                                placeholder="New Comment"
                            />
                        </div>
                        <input type="submit" className="submit submit-modal" value="Add" />
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
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(context.data[0])
                            ? context.data.map(c => (
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
                            ))
                            : <tr>
                                <td className="nothing-to-display">No Comment Types to Display</td>
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



export default AdminComments


