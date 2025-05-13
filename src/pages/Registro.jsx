import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import './Registro.css';

function Registro() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Nuevo estado para el rol

    const { addUser } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { nombre, apellido, email, password, role };
        addUser(newUser); // Agregar el usuario al contexto
        console.log('Usuario registrado:', newUser);
        // Opcional: limpiar el formulario
        setNombre('');
        setApellido('');
        setEmail('');
        setPassword('');
        setRole('user');
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

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>

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