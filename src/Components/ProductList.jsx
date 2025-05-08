import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

export default function ProductList({ selectedTeam }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Cargar productos desde json-server
  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error cargando productos:', error));
  }, []);

  // Filtrar productos cuando cambian los filtros
  useEffect(() => {
    if (selectedTeam === 'Todos') {
      setFilteredProducts(products);
    } else if (typeof selectedTeam === 'string') {
      const filtered = products.filter((p) => p.equipo === selectedTeam);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedTeam, products]);

  return (
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </div>
  );
}
