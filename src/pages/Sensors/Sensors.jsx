// src/pages/Sensors/Sensors.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import './Sensors.css';
import '../../styles.css';

const Sensors = () => {
    const [activeTab, setActiveTab] = useState('sensors');
    const [sensorData, setSensorData] = useState([]);
    const [plantData, setPlantData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        fetchSensorData();
        fetchPlantData();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchTerm, sensorData, plantData]);

    const fetchSensorData = async () => {
        try {
            const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
            const response = await axios.get(`${baseURL}/sensors/measurements`);
            setSensorData(response.data.data);
        } catch (error) {
            console.error('Erro ao buscar dados dos sensores:', error);
        }
    };

    const fetchPlantData = async () => {
        try {
            const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
            const response = await axios.get(`${baseURL}/plants/plants-names`);
            setPlantData(response.data.data);
        } catch (error) {
            console.error('Erro ao buscar dados das plantas:', error);
        }
    };

    const getPlantName = (plantId) => {
        const plant = plantData.find(plant => plant.id === plantId);
        return plant ? plant.name : 'Desconhecido';
    };

    const filterData = () => {
        const filtered = sensorData.filter(item =>
            item.sensor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.measurement.toString().includes(searchTerm) ||
            getPlantName(item.plantId).toLowerCase().includes(searchTerm.toLowerCase()) ||
            new Date(item.createdAt).toLocaleString().includes(searchTerm)
        );
        setFilteredData(filtered);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
        sortData(key, direction);
    };

    const sortData = (key, direction) => {
        const sorted = [...filteredData].sort((a, b) => {
            if (key === 'date' || key === 'time') {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                if (key === 'date') {
                    if (dateA.toLocaleDateString() < dateB.toLocaleDateString()) return direction === 'asc' ? -1 : 1;
                    if (dateA.toLocaleDateString() > dateB.toLocaleDateString()) return direction === 'asc' ? 1 : -1;
                } else {
                    if (dateA.toLocaleTimeString() < dateB.toLocaleTimeString()) return direction === 'asc' ? -1 : 1;
                    if (dateA.toLocaleTimeString() > dateB.toLocaleTimeString()) return direction === 'asc' ? 1 : -1;
                }
            } else {
                if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
                if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setFilteredData(sorted);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '⬆️' : '⬇️';
        }
        return '';
    };

    return (
        <>
            <Header />
            <main className="sensors-container">
                <div className="tabs">
                    <button
                        className={`tab-button ${activeTab === 'sensors' ? 'active' : ''}`}
                        onClick={() => handleTabClick('sensors')}
                    >
                        Sensores
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'actuators' ? 'active' : ''}`}
                        onClick={() => handleTabClick('actuators')}
                    >
                        Atuadores
                    </button>
                </div>
                <div className="tab-content">
                    {activeTab === 'sensors' ? (
                        <div className="sensors-table">
                            <h2>Sensores</h2>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="search-input"
                            />
                            <table>
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort('sensor')}>
                                            Sensor {getSortIcon('sensor')}
                                        </th>
                                        <th onClick={() => handleSort('measurement')}>
                                            Medição {getSortIcon('measurement')}
                                        </th>
                                        <th onClick={() => handleSort('plantName')}>
                                            Planta {getSortIcon('plantName')}
                                        </th>
                                        <th onClick={() => handleSort('date')}>
                                            Data da Medição {getSortIcon('date')}
                                        </th>
                                        <th onClick={() => handleSort('time')}>
                                            Horário da Medição {getSortIcon('time')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map(item => {
                                        const date = new Date(item.createdAt).toLocaleDateString();
                                        const time = new Date(item.createdAt).toLocaleTimeString();
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.sensor}</td>
                                                <td>{item.measurement}</td>
                                                <td>{getPlantName(item.plantId)}</td>
                                                <td>{date}</td>
                                                <td>{time}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="actuators-table">
                            <h2>Atuadores</h2>
                            {/* Conteúdo da tabela de Atuadores */}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Sensors;
