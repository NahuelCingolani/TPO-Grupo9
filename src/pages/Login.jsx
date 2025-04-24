import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import NavBar from '../components/NavBar';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login con:', email, password);
  };

  return (
    <>
      <NavBar /> 
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Iniciar Sesión</h1>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Entrar</button>

          <p className="register-text">
            ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
