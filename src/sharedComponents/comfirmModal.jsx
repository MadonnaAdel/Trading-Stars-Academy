import React from 'react';

const ConfirmModal = ({ show, onHide, onConfirm, title, message, children }) => {
  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" aria-hidden={!show}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              إغلاق
            </button>
            <button type="button" className="btn btn-primary" onClick={onConfirm}>
              تأكيد
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
