import React, { useState } from 'react';
import './Registro.css';

function Registro() {
const [nombre, setNombre] = useState('');
const [apellido, setApellido] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registro con:', { nombre, apellido, email, password });
};

return (
    <>
    <div className="registro-container">
        <form className="registro-form" onSubmit={handleSubmit}>
        <h1>Crear Cuenta</h1>

        <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
        />

        <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
        />

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

        <button type="submit">Registrarse</button>

        <p className="login-text">
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
        </p>
        </form>
    </div>
    </>
);
}

export default Registro;