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
<<<<<<< HEAD
    if (selectedTeam === 'Todos') {
      setFilteredProducts(products);
    } else if (Array.isArray(selectedTeam)) {
      const filtered = products.filter((p) => selectedTeam.includes(p.equipo));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
=======
    const searchQuery = getSearchQuery();

    let filtered = products;

    if (selectedTeam && selectedTeam !== 'Todos') {
      filtered = filtered.filter((p) => p.equipo === selectedTeam);
>>>>>>> 2e92fb7 (Funcionalidades de la barra de navegación)
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

