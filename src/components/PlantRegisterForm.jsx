// src/components/PlantRegisterForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './PlantRegisterForm.css';

const PlantRegisterForm = ({ onClose, onRegister }) => {
    const [formData, setFormData] = useState({
        userId: 1,
        name: '',
        type: '',
        idealWaterPercent: '',
        minWaterPercent: '',
        maxTemperatureClimate: '',
        minTemperatureClimate: '',
        irrigationFrequency: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
        const endpoint = '/plants/register';

        axios.post(`${baseURL}${endpoint}`, formData)
            .then(response => {
                console.log('Planta registrada com sucesso:', response.data);
                const newPlant = {
                    id: response.data.id, // Certifique-se de que os dados estejam completos
                    ...formData,
                    isActive: false, // Presumindo que uma nova planta não esteja ativa inicialmente
                };
                onRegister(newPlant);
                onClose();
            })
            .catch(error => {
                console.error('Erro ao registrar planta', error);
            });
    };


    return (
        <form onSubmit={handleSubmit} className="plant-register-form">
            <h2>Registrar Nova Planta</h2>
            <label>
                Nome:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
                Tipo:
                <input type="text" name="type" value={formData.type} onChange={handleChange} required />
            </label>
            <label>
                Umidade Ideal:
                <input type="number" name="idealWaterPercent" value={formData.idealWaterPercent} onChange={handleChange} required />
            </label>
            <label>
                Mínimo de Umidade:
                <input type="number" name="minWaterPercent" value={formData.minWaterPercent} onChange={handleChange} required />
            </label>
            <label>
                Temperatura Máxima:
                <input type="number" name="maxTemperatureClimate" value={formData.maxTemperatureClimate} onChange={handleChange} required />
            </label>
            <label>
                Temperatura Mínima:
                <input type="number" name="minTemperatureClimate" value={formData.minTemperatureClimate} onChange={handleChange} required />
            </label>
            <label>
                Frequência de Irrigação (horas):
                <input type="number" name="irrigationFrequency" value={formData.irrigationFrequency} onChange={handleChange} required />
            </label>
            <button type="submit">Registrar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
        </form>
    );
};

export default PlantRegisterForm;
