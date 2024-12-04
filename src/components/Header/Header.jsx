// src/components/Header/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/LOGO.png'; // Caminho para a logo

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" /> {/* Adicionando a logo */}
        <h1 className="title">
          Sistema de Irrigação <span className="eco">Eco-</span><span className="inteligente">Inteligente</span>
        </h1> {/* Alterando o título */}
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
