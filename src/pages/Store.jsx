import { useState } from 'react';
import NavBar from '../components/NavBar';
import FilterSidebar from '../components/FilterSidebar';
import ProductList from '../components/ProductList';
import './Store.css';

export default function Store() {
  const [selectedTeam, setSelectedTeam] = useState('Todos');

  return (
    <>
      <NavBar />                                           {/* 👈 Enganchás la barra arriba */}
      <div className="body-content">      
        <div className="store-page">
          <FilterSidebar onFilterChange={setSelectedTeam} />
          <ProductList selectedTeam={selectedTeam} />
        </div>
      </div>
      
    </>
  );
}
