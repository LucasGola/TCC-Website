// src/pages/DataAnalysis/DataAnalysis.jsx
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import DataAnalysisContent from '../../components/DataAnalysisContent/DataAnalysisContent';
import DataProjectionContent from '../../components/DataProjectionContent/DataProjectionContent';
import './DataAnalysis.css';

const DataAnalysis = () => {
    const [activeTab, setActiveTab] = useState('analysis');

    return (
        <>
            <Header />
            <main>
                <div className="tabs">
                    <button
                        className={activeTab === 'analysis' ? 'active' : ''}
                        onClick={() => setActiveTab('analysis')}
                    >
                        Análises de Dados
                    </button>
                    <button
                        className={activeTab === 'projection' ? 'active' : ''}
                        onClick={() => setActiveTab('projection')}
                    >
                        Projeção de Dados
                    </button>
                </div>
                <div className="tab-content">
                    {activeTab === 'analysis' && <DataAnalysisContent />}
                    {activeTab === 'projection' && <DataProjectionContent />}
                </div>
            </main>
        </>
    );
};

export default DataAnalysis;
