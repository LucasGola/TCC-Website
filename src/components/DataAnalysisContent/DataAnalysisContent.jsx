// src/components/DataAnalysisContent/DataAnalysisContent.jsx
import React from 'react';
import WaterConsumptionChart from '../WaterConsumptionChart/WaterConsumptionChart';
import './DataAnalysisContent.css';

const DataAnalysisContent = () => {
    return (
        <div>
            <h1>Análises de Dados</h1>
            <WaterConsumptionChart />
        </div>
    );
};

export default DataAnalysisContent;
