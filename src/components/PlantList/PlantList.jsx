// src/components/PlantList/PlantList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlantEditForm from '../PlantEditForm/PlantEditForm';
import Modal from '../Modal/Modal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import PlantRegisterForm from '../PlantRegisterForm/PlantRegisterForm';
import Alert from '../Alert/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './PlantList.css';

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [plantToDelete, setPlantToDelete] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

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

    const handleRegisterClick = () => {
        setIsRegistering(true);
    };

    const handleRegisterPlant = (newPlant) => {
        setPlants((prevPlants) => [...prevPlants, newPlant]);
        setIsRegistering(false);
    };

    const handleCloseAlert = () => {
        setAlertMessage('');
    };

    return (
        <div style={{ width: '100%' }}>
            <h2>Lista de Plantas</h2>
            <button onClick={handleRegisterClick} className="register-button">
                <FontAwesomeIcon icon={faPlus} /> Adicionar Planta
            </button>
            {alertMessage && <Alert message={alertMessage} onClose={handleCloseAlert} />}
            <ul>
                {plants.map((plant, index) => (
                    <li key={plant.id || index}>
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
                <Modal onClose={() => setPlantToDelete(null)}>
                    <ConfirmDeleteModal plant={plantToDelete} onClose={() => setPlantToDelete(null)} onDelete={handleDeletePlant} />
                </Modal>
            )}

            {isRegistering && (
                <Modal onClose={() => setIsRegistering(false)}>
                    <PlantRegisterForm onClose={() => setIsRegistering(false)} onRegister={handleRegisterPlant} />
                </Modal>
            )}
        </div>
    );
};

export default PlantList;
