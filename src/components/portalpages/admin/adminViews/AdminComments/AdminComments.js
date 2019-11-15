import React, { Component } from 'react'
import Moment from 'react-moment'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'

const commEndpoint = config.COMMENTS_ENDPOINT

class AdminComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false,
            comments: [],
            error: null
        };
    }

    removeComment = id => {
        const newComments = this.state.comments.filter(c =>
          c.id !== id
        )
        this.setState({
          comments: newComments
        })
        this.props.func.hideDelete()
      }
    
    setComments = comments => {
        this.setState({
            comments: comments,
            error: null
        })
    }

    updateComments = data => {
        this.setState({
            comments: [...this.state.comments, data],
            error: null
        })
    }

    componentDidMount(){
        this.props.func.fetchData(commEndpoint, this.setComments)
    }

    componentDidUpdate(){
        this.props.func.fetchData(commEndpoint, this.setComments)
    }


    addComment = (e) => {
        e.preventDefault()
        const newCommentType = {
            commdesc: e.target.comment_type.value,
            company_id: 6,
            user_id: 1
        }
        fetch(commEndpoint, {
            method: 'POST',
            body: JSON.stringify(newCommentType),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
            return res.json()
        })
        .then(data => {
            this.updateComments(data)
            this.props.func.hideModal()
        })
        .catch(error => {
            this.setState({ error })
        }) 
    }


    updateData = (e) => {
        e.preventDefault()
        const id = this.props.func.updateContent.id
        const updatedContent = {
            commdesc: e.target.comment_type.value
        }
        fetch(`${commEndpoint}/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedContent),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then((res) => {
            if(!res.ok){
                return res.json().then(error => Promise.reject(error))
            }
            return
        })
        .then(data => {
            this.props.func.hideUpdate()
        })
        .catch(error => {
            console.error(error)
        })
    }


    render(){ 
        const comment = this.props.func 
        return (
            <>
            <Modal className='update-modal' show={comment.update}>
                    <div className='update-modal-grid'>
                        <h3>Update {comment.updateContent.name}</h3>
                        <form className='form-group' onSubmit={(e) => this.updateData(e)}>
                            <div className='form-group'>
                                <label htmlFor='maint_type'></label>
                                <TextInput
                                    id='comment_type'
                                    name='comment_type'
                                    label='Comment Type'
                                    type='text'
                                />
                            </div>
                            <div className='update'>
                                <button type='submit'>Update</button>
                            </div>
                        </form>
                        <div className='cancel'>
                            <button onClick={comment.hideUpdate}>Cancel</button>   
                        </div>
                    </div>
                </Modal>
                <Modal className='add-modal' show={comment.show} >
                    <form 
                        className='add-content'
                        onSubmit={(e) => this.addComment(e)}
                    >
                        <h3>Add a Comment Type</h3>
                        <div className='form-group'>
                            <label htmlFor='comment_type'></label>
                            <TextInput 
                                id='comment_type'
                                name='comment_type'
                                label='Comment Type'
                                type='text'
                            />
                        </div>
                        <SubmitButton className='submit-content' text='Save'/>
                    </form>
                    <div className='cancel'>
                        <button onClick={comment.hideModal}>Cancel</button>
                    </div>
                </Modal>
                
                <div className='data-container'>
                    <h3>Comments Type</h3>
                    <button className='add-data' onClick={comment.showModal}>Add Comment Type</button>
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
                        {this.state.comments.map(c => (
                            <tr key={c.id}>
                                <td>{c.commdesc}</td>
                                <td>
                                    <Moment format="YYYY/MM/DD">{c.created_at}</Moment>
                                </td>
                                <td className='update'>
                                    <button onClick={() => comment.updateUpdate(c.commdesc, c.id)}>Update</button>
                                </td>
                                <td className='delete'>
                                    <button 
                                        onClick={() => comment.updateDelete(c.commdesc, c.id)}
                                    >
                                        Delete
                                    </button>
                                    {(comment.delete) ? comment.deleteModal(commEndpoint , this.removeComment) : null}                                    
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