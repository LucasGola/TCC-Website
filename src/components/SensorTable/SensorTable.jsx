// src/components/SensorTable/SensorTable.jsx
import React, { useState, useEffect } from 'react';
import './SensorTable.css';

const SensorTable = ({ sensorData, plantData }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        filterData();
    }, [searchTerm, sensorData, plantData]);

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
            const valueA = key === 'plantName' ? getPlantName(a.plantId) : a[key];
            const valueB = key === 'plantName' ? getPlantName(b.plantId) : b[key];
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
                if (valueA < valueB) return direction === 'asc' ? -1 : 1;
                if (valueA > valueB) return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setFilteredData(sorted);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '⬆️' : '⬇️';
        }
        return '';
    };

    const getMeasurementUnit = (sensor) => {
        if (sensor.toLowerCase().includes('higrômetro') || sensor.toLowerCase().includes('bateria')) {
            return '%';
        } else if (sensor.toLowerCase().includes("vazão d'água")) {
            return 'L';
        } else if (sensor.toLowerCase().includes('temperatura')) {
            return '°C';
        } else if (sensor.toLowerCase().includes('humidade') || sensor.toLowerCase().includes('umidade')) {
            return '%';
        }
        return '';
    };

    return (
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
                        const measurementUnit = getMeasurementUnit(item.sensor);
                        return (
                            <tr key={item.id}>
                                <td>{item.sensor}</td>
                                <td>{`${item.measurement} ${measurementUnit}`}</td>
                                <td>{getPlantName(item.plantId)}</td>
                                <td>{date}</td>
                                <td>{time}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default SensorTable;
