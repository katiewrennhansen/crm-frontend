import React from 'react'
import Modal from './Modal'
import CloseIcon from '@material-ui/icons/Close';


const DeleteModal = ({props, deleteFn}) => {
    return (
        <Modal show={props.delete}>
            <CloseIcon 
                className="close-icon" 
                fontSize="large" 
                onClick={props.hideDelete}
            />
        <div className='delete-modal-grid'>
            <h3>Are you sure you would like to delete {props.nameDelete}?</h3>
            <div >
                <button className='modal-delete-btn' onClick={() => deleteFn(props.idDelete)}>
                    Delete
                </button>
            </div>
        </div>
    </Modal>
    )
}

export default DeleteModal