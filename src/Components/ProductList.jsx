import { useState, useEffect } from 'react';
import allProducts from '../data/products.json';
import ProductCard from './ProductCard';
import './ProductList.css';

export default function ProductList({ selectedTeam }) {
  const [products, setProducts] = useState([]);

  // Filtrar productos según el equipo seleccionado
  useEffect(() => {
    if (selectedTeam === 'Todos') {
      setProducts(allProducts); // Mostrar todos los productos
    } else if (Array.isArray(selectedTeam)) {
      const filtered = allProducts.filter(p => selectedTeam.includes(p.equipo));
      setProducts(filtered); // Filtrar productos por equipo
    } else {
      setProducts([]); // Si no hay equipo válido, limpiar productos
    }
  }, [selectedTeam]);

  return (
    <div className="product-list">
      {products.length > 0 ? (
        // Renderizar una tarjeta por cada producto
        products.map(product => <ProductCard key={product.id} product={product} />)
      ) : (
        // Mensaje si no se encuentran productos
        <p>No se encontraron productos.</p>
      )}
    </div>
  );
}