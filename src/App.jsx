import React from 'react';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div>
      <NavBar />
      <main style={{ textAlign: 'center', marginTop: '50px', color: '#000000' }}>
        <h1>Bienvenido a la tienda de jerseys Lebron Sunshine</h1>
        <p>Este es un prototipo para mostrar el Navbar adaptado</p>
      </main>
    </div>
  );
}

export default App;
