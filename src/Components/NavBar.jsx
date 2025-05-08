import React, { useState } from 'react';
import lakersLogo from '../Assets/lebron.png';
import './NavBar.css'; 
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; 

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems } = useCart(); //
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0); // ✅ Contador real

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
      <Link to="/store" className="nav-link">Jerseys</Link>
      <a href="#ofertas" className="nav-link">Ofertas</a>
      <a href="#novedades" className="nav-link">Novedades</a>
      </div>


      <div className="logo-container">
        <Link to="/">
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
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/carrito" className="nav-link">Carrito ({totalItems})</Link> {/* ✅ Dinámico */}
      </div>
    </nav>
  );
};

export default NavBar;
