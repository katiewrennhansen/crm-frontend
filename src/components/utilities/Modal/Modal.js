import React from 'react'
import './Modal.css'


const Modal = ({ show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
        </section>
      </div>
    );
  };

  export default Modal;