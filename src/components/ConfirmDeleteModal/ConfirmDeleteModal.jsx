// src/components/ConfirmDeleteModal.jsx
import React from 'react';
import '../Modal/Modal.css'; // Utilizando o mesmo estilo do modal anterior

const ConfirmDeleteModal = ({ plant, onClose, onDelete }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <h2>Deletar Planta: {plant.name}</h2>
                <p className="warning-text">Você tem certeza de que deseja deletar esta planta?</p>
                <button className="delete-button" onClick={() => onDelete(plant.id)}>Sim, deletar</button>
                <button className="cancel-button" onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
