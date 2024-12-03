// src/components/DataProjectionContent/DataProjectionContent.jsx
import React from 'react';
import IrrigationProjectionChart from '../IrrigationProjectionChart/IrrigationProjectionChart';
import WaterConsumptionProjectionChart from '../WaterConsumptionProjectionChart/WaterConsumptionProjectionChart';
import './DataProjectionContent.css';

const DataProjectionContent = () => {
    return (
        <div>
            <h1>Projeções de Dados</h1>
            <div className="chart-container">
                <WaterConsumptionProjectionChart />
            </div>
            <div className="chart-container">
                <IrrigationProjectionChart />
            </div>
        </div>
    );
};

export default DataProjectionContent;
