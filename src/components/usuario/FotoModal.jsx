import React from 'react';
import { Modal } from 'react-bootstrap';

const FotoModal = ({ show, handleClose, handlePhotoChange, photo }) => {
  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-with-border">
      <Modal.Header closeButton>
        <Modal.Title>{photo ? 'Editar Foto' : 'Seleccionar Foto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Input para seleccionar una nueva foto */}
        <input type="file" onChange={handlePhotoChange} className="d-none" id="fileInput" />
        <label
          htmlFor="fileInput"
          className="btn bottom-color mb-3 position-relative"
          style={{ width: '100%', height: '40px', lineHeight: '24px', textAlign: 'center' }}
        >
          {!photo && 'Seleccionar Foto'}
          {photo && 'Cambiar Foto'}
        </label>
        {!photo && <p className="text-muted">No se ha seleccionado una foto</p>} {/* Mensaje si no hay foto seleccionada */}
      </Modal.Body>
    </Modal>
  );
};

export default FotoModal;
