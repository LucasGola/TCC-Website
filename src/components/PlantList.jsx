// src/components/PlantList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlantEditForm from './PlantEditForm';
import Modal from './Modal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import Alert from './Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [plantToDelete, setPlantToDelete] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchPlants();
    }, []);

    const fetchPlants = () => {
        const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
        const endpoint = '/plants/info/all';
        axios.get(`${baseURL}${endpoint}`)
            .then(response => {
                setPlants(response.data.data);
            })
            .catch(error => {
                console.error('Erro ao buscar plantas', error);
            });
    };

    const handleEditClick = (plant) => {
        setSelectedPlant(plant);
    };

    const handleUpdatePlant = () => {
        fetchPlants();
        setSelectedPlant(null);
    };

    const handleDeleteClick = (plant) => {
        if (plant.isActive) {
            setAlertMessage('Não é possível deletar a planta ativa. Ative outra planta antes de deletar esta.');
        } else {
            setPlantToDelete(plant);
        }
    };

    const handleDeletePlant = (plantId) => {
        const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
        const endpoint = '/plants/delete';
        const payload = { plantId };

        axios.delete(`${baseURL}${endpoint}`, { data: payload })
            .then(response => {
                console.log('Planta deletada com sucesso:', response.data);
                fetchPlants();
                setPlantToDelete(null);
            })
            .catch(error => {
                console.error('Erro ao deletar planta', error);
            });
    };

    const handleCloseAlert = () => {
        setAlertMessage('');
    };

    return (
        <div style={{ width: '100%' }}>
            <h2>Lista de Plantas</h2>
            {alertMessage && <Alert message={alertMessage} onClose={handleCloseAlert} />}
            <ul>
                {plants.map(plant => (
                    <li key={plant.id}>
                        <div className="plant-header">
                            <h3>{plant.name} ({plant.type})</h3>
                            <div className="icon-container">
                                <FontAwesomeIcon icon={faEdit} onClick={() => handleEditClick(plant)} className="icon-button edit-icon" />
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteClick(plant)} className="icon-button delete-icon" />
                            </div>
                        </div>
                        <p>Umidade Ideal: {plant.idealWaterPercent}%</p>
                        <p>Mínimo de Umidade: {plant.minWaterPercent}%</p>
                        <p>Temperatura: {plant.minTemperatureClimate}°C - {plant.maxTemperatureClimate}°C</p>
                        <p>Frequência de Irrigação: {plant.irrigationFrequency} horas</p>
                        <p>Ativa: {plant.isActive ? 'Sim' : 'Não'}</p>
                    </li>
                ))}
            </ul>

            {selectedPlant && (
                <Modal onClose={() => setSelectedPlant(null)}>
                    <PlantEditForm plant={selectedPlant} onClose={() => setSelectedPlant(null)} onUpdate={handleUpdatePlant} />
                </Modal>
            )}

            {plantToDelete && (
                <ConfirmDeleteModal plant={plantToDelete} onClose={() => setPlantToDelete(null)} onDelete={handleDeletePlant} />
            )}
        </div>
    );
}

export default PlantList;
