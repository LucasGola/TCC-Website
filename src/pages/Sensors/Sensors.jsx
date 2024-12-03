// src/pages/Sensors/Sensors.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import SensorTable from '../../components/SensorTable/SensorTable';
import IrrigationTable from '../../components/IrrigationTable/IrrigationTable';
import './Sensors.css';
import '../../styles.css';

const Sensors = () => {
    const [activeTab, setActiveTab] = useState('sensors');
    const [sensorData, setSensorData] = useState([]);
    const [irrigationData, setIrrigationData] = useState([]);
    const [plantData, setPlantData] = useState([]);

    useEffect(() => {
        fetchSensorData();
        fetchIrrigationData();
        fetchPlantData();
    }, []);

    const fetchSensorData = async () => {
        try {
            const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
            const response = await axios.get(`${baseURL}/sensors/measurements`);
            setSensorData(response.data.data);
        } catch (error) {
            console.error('Erro ao buscar dados dos sensores:', error);
        }
    };

    const fetchIrrigationData = async () => {
        try {
            const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
            const response = await axios.get(`${baseURL}/events/timeline/all`);
            setIrrigationData(response.data.data);
        } catch (error) {
            console.error('Erro ao buscar dados de irrigação:', error);
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

    const handleTabClick = (tab) => {
        setActiveTab(tab);
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
                        className={`tab-button ${activeTab === 'irrigation' ? 'active' : ''}`}
                        onClick={() => handleTabClick('irrigation')}
                    >
                        Registros de Irrigação
                    </button>
                </div>
                <div className="tab-content">
                    {activeTab === 'sensors' ? (
                        <SensorTable sensorData={sensorData} plantData={plantData} />
                    ) : (
                        <IrrigationTable irrigationData={irrigationData} plantData={plantData} />
                    )}
                </div>
            </main>
        </>
    );
};

export default Sensors;
