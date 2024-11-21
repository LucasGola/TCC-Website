// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Sensors from './pages/Sensors/Sensors';
import DataAnalysis from './pages/DataAnalysis/DataAnalysis';
import './styles.css';

const App = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sensores" element={<Sensors />} />
        <Route path="/analise-de-dados" element={<DataAnalysis />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
