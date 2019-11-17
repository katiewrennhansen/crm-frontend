import React from 'react'
import ApiService from '../../../../services/api-service'
import Modal from './Modal'


const DeleteModal = ({props, endpoint}) => {
    return (
        <Modal show={props.delete}>
        <div className='delete-modal-grid'>
            <h3>Are you sure you would like to delete {props.nameDelete}?</h3>
            <div className='cancel'>                    
                <button onClick={props.hideDelete}>Cancel</button>
            </div>
            <div className='delete'>
                <button 
                    onClick={() => {
                        ApiService.deleteData(endpoint, props.idDelete, props.removeData); 
                        props.hideDelete()
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    </Modal>
    )
}

export default DeleteModal