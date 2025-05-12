import React, { useEffect, useState } from 'react';
import StockManager from '../Components/StockManager';
import './ManageStockPage.css';

function ManageStockPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) throw new Error('Error al cargar los productos');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert('No se pudo cargar la lista de productos');
      }
    };

    fetchProducts();
  }, []);

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
