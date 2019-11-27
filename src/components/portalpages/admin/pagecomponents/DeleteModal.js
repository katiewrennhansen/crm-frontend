import React from 'react'
import Modal from './Modal'


const DeleteModal = ({props, deleteComment}) => {
    return (
        <Modal show={props.delete}>
        <div className='delete-modal-grid'>
            <h3>Are you sure you would like to delete {props.nameDelete}?</h3>
            <div className='cancel'>                    
                <button onClick={props.hideDelete}>Cancel</button>
            </div>
            <div className='delete'>
                <button onClick={() => deleteComment(props.idDelete)}>
                    Delete
                </button>
            </div>
        </div>
    </Modal>
    )
}

export default DeleteModal