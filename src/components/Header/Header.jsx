// src/components/Header/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Sistema de Irrigação Automatizado</h1>
      </div>
      <nav className="nav-menu">
        <ul>
          <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Plantas</NavLink></li>
          <li><NavLink to="/sensores" className={({ isActive }) => (isActive ? 'active' : '')}>Sensores</NavLink></li>
          <li><NavLink to="/analise-de-dados" className={({ isActive }) => (isActive ? 'active' : '')}>Análises</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
