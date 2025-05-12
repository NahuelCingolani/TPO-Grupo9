import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import './ProductList.css';

export default function ProductList({ selectedTeam }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('search')?.toLowerCase() || '';
  };

  // Cargar productos desde json-server
  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error cargando productos:', error));
  }, []);

  // Aplicar filtros por equipo y búsqueda
  useEffect(() => {
    const searchQuery = getSearchQuery();
    let filtered = products;

    if (selectedTeam && selectedTeam !== 'Todos') {
      // Si es un array de equipos
      if (Array.isArray(selectedTeam)) {
        filtered = filtered.filter((p) => selectedTeam.includes(p.equipo));
      } else {
        // Si es un solo equipo
        filtered = filtered.filter((p) => p.equipo === selectedTeam);
      }
    }

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title?.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedTeam, products, location]);

  return (
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="no-products">
          <p>No se encontraron productos.</p>
        </div>
      )}
    </div>
  );
}


