import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './EditarProductosLista.css';

function EditarProductosLista() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  return (
    <div className="editar-lista-container">
      <h2>Seleccionar Producto a Editar</h2>
      <ul className="producto-lista">
        {productos.map(producto => (
          <li key={producto.id} className="producto-item">
            <div>
              <strong>{producto.title}</strong><br />
              {producto.equipo} - {producto.price}
            </div>
            <Link to={`/admin/products/edit/${producto.id}`}>
              <button className="edit-button">Editar</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditarProductosLista;
