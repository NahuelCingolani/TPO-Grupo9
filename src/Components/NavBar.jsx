import React from 'react';
import lakersLogo from '../Assets/lebron.png';
import './NavBar.css'; 
import { Link } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
const [searchTerm, setSearchTerm] = useState("");
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};

const handleSearchSubmit = (e) => {
  e.preventDefault();
  console.log('Buscando:', searchTerm);
};

  
  return (
    <nav className="navbar">
      <div className="nav-links navbar_left">
        <a href="/store" className="nav-link">Jerseys</a>
        <a href="#ofertas" className="nav-link">Ofertas</a>
        <a href="#novedades" className="nav-link">Novedades</a>
      </div>

      <div className="logo-container">
        <Link to ="/">
          <img src={lakersLogo} alt="Lakers Logo" className="logo" />
        </Link>
        
      </div>

      <div className="nav-links navbar_right">
      <form onSubmit={handleSearchSubmit} className="search-form">
  <input
    type="text"
    placeholder="Buscar productos..."
    value={searchTerm}
    onChange={handleSearchChange}
    className="search-input"
  />
  <button type="submit" className="search-button">Buscar</button>
</form>
        <a href="/Login" className="nav-link">Login</a>
        <a href="#carrito" className="nav-link">Carrito (0)</a>
      </div>
    </nav>
  );
};

export default NavBar;
