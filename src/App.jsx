// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Sensors from './pages/Sensors/Sensors';
import Logs from './pages/Logs/Logs';
import './styles.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sensores" element={<Sensors />} />
        <Route path="/logs" element={<Logs />} />
      </Routes>
    </Router>
  );
};

export default App;