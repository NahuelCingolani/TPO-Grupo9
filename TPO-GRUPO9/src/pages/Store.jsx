import { useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import ProductList from '../components/ProductList';
import './Store.css';

export default function Store() {
  const [selectedTeam, setSelectedTeam] = useState('Todos');

  return (
    <div className="store-page">
      <FilterSidebar onFilterChange={setSelectedTeam} />
      <ProductList selectedTeam={selectedTeam} />
    </div>
  );
}
