// src/components/IrrigationTable/IrrigationTable.jsx
import React, { useState, useEffect } from 'react';
import './IrrigationTable.css';

const IrrigationTable = ({ irrigationData, plantData }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        filterData();
    }, [searchTerm, irrigationData, plantData]);

    const getPlantName = (plantId) => {
        const plant = plantData.find(plant => plant.id === plantId);
        return plant ? plant.name : 'Desconhecido';
    };

    const filterData = () => {
        const filtered = irrigationData.filter(item =>
            item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.climateTemperature.toString().includes(searchTerm) ||
            item.soilHumidity.toString().includes(searchTerm) ||
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

    return (
        <div className="irrigation-table">
            <h2>Registros de Irrigação</h2>
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
                        <th onClick={() => handleSort('action')}>
                            Ação {getSortIcon('action')}
                        </th>
                        <th onClick={() => handleSort('climateTemperature')}>
                            Temperatura (°C) {getSortIcon('climateTemperature')}
                        </th>
                        <th onClick={() => handleSort('soilHumidity')}>
                            Umidade do Solo (%) {getSortIcon('soilHumidity')}
                        </th>
                        <th onClick={() => handleSort('plantName')}>
                            Planta {getSortIcon('plantName')}
                        </th>
                        <th onClick={() => handleSort('date')}>
                            Data do Registro {getSortIcon('date')}
                        </th>
                        <th onClick={() => handleSort('time')}>
                            Horário do Registro {getSortIcon('time')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(item => {
                        const date = new Date(item.createdAt).toLocaleDateString();
                        const time = new Date(item.createdAt).toLocaleTimeString();
                        return (
                            <tr key={item.id}>
                                <td>{item.action}</td>
                                <td>{item.climateTemperature}</td>
                                <td>{item.soilHumidity}</td>
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

export default IrrigationTable;
