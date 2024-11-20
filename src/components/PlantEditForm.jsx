// src/components/PlantEditForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './PlantEditForm.css';

const PlantEditForm = ({ plant, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({ ...plant });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
        const endpoint = '/plants/update-info';

        axios.post(`${baseURL}${endpoint}`, formData)
            .then(response => {
                console.log('Planta atualizada com sucesso:', response.data);
                onUpdate(response.data.data);
            })
            .catch(error => {
                console.error('Erro ao atualizar planta', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editando: {plant.name}</h2>
            <label>
                Nome:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
                Tipo:
                <input type="text" name="type" value={formData.type} onChange={handleChange} />
            </label>
            <label>
                Umidade Ideal:
                <input type="number" name="idealWaterPercent" value={formData.idealWaterPercent} onChange={handleChange} />
            </label>
            <label>
                Mínimo de Umidade:
                <input type="number" name="minWaterPercent" value={formData.minWaterPercent} onChange={handleChange} />
            </label>
            <label>
                Temperatura Mínima:
                <input type="number" name="minTemperatureClimate" value={formData.minTemperatureClimate} onChange={handleChange} />
            </label>
            <label>
                Temperatura Máxima:
                <input type="number" name="maxTemperatureClimate" value={formData.maxTemperatureClimate} onChange={handleChange} />
            </label>
            <label>
                Frequência de Irrigação (horas):
                <input type="number" name="irrigationFrequency" value={formData.irrigationFrequency} onChange={handleChange} />
            </label>
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
        </form>
    );
};

export default PlantEditForm;
