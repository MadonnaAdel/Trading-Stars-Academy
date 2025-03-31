import React from 'react';
import Modal from 'react-modal';
import style from "./style.module.css"
Modal.setAppElement('#root'); 
const ConfirmModal = ({ show, onHide, onConfirm, title, message, children }) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onHide}
      contentLabel="Confirm Modal"
      className={`${style.modalContent} `}
      overlayClassName={style.modalOverlay}
      style={{ zIndex: "99999999" }}
    >
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
        <button type="button" className="btn-close" onClick={onHide}></button>
      </div>
      <div className="modal-body text-center m-5">
        <p>{message}</p>
        {children}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary ms-2" onClick={onHide}>
          إغلاق
        </button>
        <button type="button" className="btn btn-primary" onClick={onConfirm}>
          تأكيد
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
