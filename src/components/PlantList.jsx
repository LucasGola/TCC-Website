// src/components/PlantList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlantEditForm from './PlantEditForm';
import Modal from './Modal';

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);

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
        // Após atualizar uma planta, re-fetch a lista de plantas para refletir as mudanças
        fetchPlants();
        setSelectedPlant(null);
    };

    return (
        <div style={{ width: '100%' }}>
            <h2>Lista de Plantas</h2>
            <ul>
                {plants.map(plant => (
                    <li key={plant.id}>
                        <h3>{plant.name} ({plant.type})</h3>
                        <p>Umidade Ideal: {plant.idealWaterPercent}%</p>
                        <p>Mínimo de Umidade: {plant.minWaterPercent}%</p>
                        <p>Temperatura: {plant.minTemperatureClimate}°C - {plant.maxTemperatureClimate}°C</p>
                        <p>Frequência de Irrigação: {plant.irrigationFrequency} horas</p>
                        <p>Ativa: {plant.isActive ? 'Sim' : 'Não'}</p>
                        <button onClick={() => handleEditClick(plant)}>Editar</button>
                    </li>
                ))}
            </ul>

            {selectedPlant && (
                <Modal onClose={() => setSelectedPlant(null)}>
                    <PlantEditForm plant={selectedPlant} onClose={() => setSelectedPlant(null)} onUpdate={handleUpdatePlant} />
                </Modal>
            )}
        </div>
    );
}

export default PlantList;
