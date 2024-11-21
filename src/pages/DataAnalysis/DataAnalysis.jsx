// src/pages/DataAnalysis/DataAnalysis.jsx
import React from 'react';
import Header from '../../components/Header/Header';
import WaterConsumptionChart from '../../components/WaterConsumptionChart/WaterConsumptionChart';
import './DataAnalysis.css';

const DataAnalysis = () => {
    return (
        <>
            <Header />
            <main>
                <h1>Análise de Dados</h1>
                <WaterConsumptionChart />
            </main>
        </>
    );
};

export default DataAnalysis;
