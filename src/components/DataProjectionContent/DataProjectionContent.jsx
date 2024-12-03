// src/components/DataProjectionContent/DataProjectionContent.jsx
import React from 'react';
import IrrigationProjectionChart from '../IrrigationProjectionChart/IrrigationProjectionChart';
import './DataProjectionContent.css';

const DataProjectionContent = () => {
    return (
        <div>
            <h1>Projeção de Dados</h1>
            <IrrigationProjectionChart />
        </div>
    );
};

export default DataProjectionContent;
