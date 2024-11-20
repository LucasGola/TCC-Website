// src/components/Header/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Sistema de Irrigação Automatizado</h1>
      </div>
      <nav className="nav-menu">
        <ul>
          <li><Link to="/">Plantas</Link></li>
          <li><Link to="/sensores">Sensores</Link></li>
          <li><Link to="/logs">Logs</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
