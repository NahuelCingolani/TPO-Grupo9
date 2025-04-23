import React from 'react';
import lakersLogo from '../Assets/logo-lebron.png';

const NavBar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.leftLinks} className="nav-links">
        <a href="#jerseys" style={styles.link} className="nav-link">Jerseys</a>
        <a href="#ofertas" style={styles.link} className="nav-link">Ofertas</a>
        <a href="#novedades" style={styles.link} className="nav-link">Novedades</a>
      </div>
      <div style={styles.logoContainer}>
        <img src={lakersLogo} alt="Lakers Logo" style={styles.logo} />
      </div>
      <div style={styles.rightLinks} className="nav-links">
        <a href="#login" style={styles.link} className="nav-link">Login</a>
        <a href="#carrito" style={styles.link} className="nav-link">Carrito (0)</a>
      </div>

      {/* Hover y Responsive */}
      <style>{`
        .nav-link:hover {
          color: gray;
          transform: scale(1.1);
          transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
          .nav-links {
            flex-direction: column;
            align-items: center;
          }
          nav {
            flex-direction: column;
            padding: 15px;
          }
          .logo {
            height: 100px;
          }
        }
      `}</style>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'relative',       // Necesario para posicionar el logo
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000', // Negro
    padding: '20px 50px',
    color: '#FFFFFF',           // Blanco
    fontFamily: 'Arial, sans-serif',
    flexWrap: 'wrap',
    height: '150px',
    width: '100%',
    boxSizing: 'border-box',
    margin: 0,
    border: 'none',
  },
  leftLinks: {
    display: 'flex',
    gap: '20px',
    zIndex: 1,                  // Asegura que no tape el logo
  },
  rightLinks: {
    display: 'flex',
    gap: '20px',
    zIndex: 1,                  // Asegura que no tape el logo
  },
  link: {
    color: '#FFFFFF',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  logoContainer: {
    position: 'absolute',       // Centramos el logo sí o sí
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Centrado perfecto
    zIndex: 0,                   // Por debajo de los links
  },
  logo: {
    height: '120px',
    objectFit: 'contain',
  },
};

export default NavBar;



