import React from 'react';
import lakersLogo from '../Assets/lebron.png';
import './NavBar.css'; 
import { Link } from 'react-router-dom';

const NavBar = () => {
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
        <a href="/Login" className="nav-link">Login</a>
        <a href="#carrito" className="nav-link">Carrito (0)</a>
      </div>
    </nav>
  );
};

export default NavBar;
