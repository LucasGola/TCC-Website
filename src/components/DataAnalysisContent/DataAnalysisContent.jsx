// src/components/DataAnalysisContent/DataAnalysisContent.jsx
import React from 'react';
import WaterConsumptionChart from '../WaterConsumptionChart/WaterConsumptionChart';
import IrrigationEventsChart from '../IrrigationEventsChart/IrrigationEventsChart';
import './DataAnalysisContent.css';

const DataAnalysisContent = () => {
    return (
        <div>
            <h1>Análises de Dados</h1>
            <div className="chart-container">
                <WaterConsumptionChart />
            </div>
            <div className="chart-container">
                <IrrigationEventsChart />
            </div>
        </div>
    );
};

export default DataAnalysisContent;
