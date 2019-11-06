import React, { Component } from 'react'
import cuuid from 'cuuid'
import SubmitButton from '../../../../Login/LoginComponents/SubmitButton'
import Modal from '../../pagecomponents/Modal'
import TextInput from '../../../../Login/LoginComponents/TextInput'
import ADMIN_DATA from '../../../../../admin-data'


let data = ADMIN_DATA.commentsType;


class AdminComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            delete: false
        };
    }

    addComment = (e) => {
        e.preventDefault()
        console.log('add comment!!')
        const newCommentType = {
            commtype: {
                commdesc: e.target.comment_type.value,
                company_id: 6,
            },
            user_id: 1,
            id: cuuid(),
            dateCreated: this.props.formatDate(),
        }
        data.push(newCommentType)
    }

    deleteComment = (id) => {
        data = data.filter(c => {
            return c.id !== id
        })
        this.props.hideDelete();
    }

    render(){  
        return (
            <>
                <Modal show={this.props.show} >
                    <form className= 'add_comment_type' onSubmit={(e) => {this.addComment(e); this.props.hideModal();}}>
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
                        {data.map(c => (
                            <tr key={c.id}>
                                <td>{c.commtype.commdesc}</td>
                                <td>{c.dateCreated}</td>
                                <td><button>Update</button></td>
                                <td className='delete'><button onClick={() => this.deleteComment(c.id)}>Delete</button>
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