import React from 'react'
import Modal from './Modal'


const DeleteModal = ({props, deleteFn}) => {
    return (
        <Modal show={props.delete}>
        <div className='delete-modal-grid'>
            <h3>Are you sure you would like to delete {props.nameDelete}?</h3>
            <div>                    
                <button className='cancel-btn' onClick={props.hideDelete}>Cancel</button>
            </div>
            <div >
                <button className='delete-btn' onClick={() => deleteFn(props.idDelete)}>
                    Delete
                </button>
            </div>
        </div>
    </Modal>
    )
}

export default DeleteModal