import React, { useEffect, useState } from 'react';
import StockManager from '../../features/products/component/management/StockManager';
import './ManageStockPage.css';

function ManageStockPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');  // Función asíncrona para obtener productos desde el json-server
        if (!response.ok) throw new Error('Error al cargar los productos');
        const data = await response.json();
        setProducts(data); // Guardamos los productos en el estado
        setLoading(false); // Cambiamos el estado de carga a false, que significa que ya no estamos cargando
      } catch (error) {
        console.error(error);
        alert('No se pudo cargar la lista de productos');
      }
    };
    // Llamamos a la función que trae los productos
    fetchProducts();
  }, []); //Arreglo vacío [] indica que se ejecuta solo al montar

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="manage-stock-page">
      <h2>Gestionar Stock de Productos</h2>
      <div className="stock-list">
        {products.map((product) => (
          <StockManager key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ManageStockPage;
