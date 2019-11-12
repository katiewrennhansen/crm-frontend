import React, { Component } from 'react'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import config from '../../../../../config'

function deleteComment(id, cb){
    fetch(config.COMMENTS_ENDPOINT + `/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${config.API_KEY}`
        }
    })
    .then((res) => {
        if(!res.ok){
            return res.json().then(error => Promise.reject(error))
        }
        return res.text()
    })
    .then(data => {
        cb(id)
    })
    .catch(error => {
        console.error(error)
    })
}

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
        fetch(config.COMMENTS_ENDPOINT, {
            method: 'GET',
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
            this.setComments(data)
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    addComment = (e) => {
        e.preventDefault()
        const newCommentType = {
            commdesc: e.target.comment_type.value,
            company_id: 6,
            user_id: 1
        }
        fetch(config.COMMENTS_ENDPOINT, {
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
            this.props.hideModal()
        })
        .catch(error => {
            this.setState({ error })
        })
        
    }

    render(){  
        return (
            <>
                <Modal show={this.props.show} >
                    <form className= 'add_comment_type' onSubmit={(e) => this.addComment(e)}>
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
                        <SubmitButton className='submit_comment' text='Save'/>
                    </form>
                    <button onClick={this.props.hideModal}>Cancel</button>
                </Modal>
                
                <div className='promotion-container'>
                    <h3>Comments Type</h3>
                    <button className='add_promotion' onClick={this.props.showModal}>Add Comment Type</button>
                    <table className='promotion_table'>
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
                                <td>{c.created_at}</td>
                                <td><button>Update</button></td>
                                <td className='delete'><button onClick={() => deleteComment(c.id, this.removeComment)}>Delete</button>
                                    {/* <Modal show={this.props.delete}>
                                        <h3>
                                            Are you sure you would like to delete {c.name}?
                                        </h3>
                                        <button onClick={this.props.hideDelete}>Cancel</button>
                                        <div className='delete'>
                                            <button onClick={() => this.deleteComment(c.id)}>Delete</button>
                                        </div>
                                    </Modal> */}
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