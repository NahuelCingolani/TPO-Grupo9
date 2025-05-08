import { useState } from 'react';
import NavBar from '../Components/NavBar';
import FilterSidebar from '../components/FilterSidebar';
import ProductList from '../Components/ProductList';
import './Store.css';

export default function Store() {
  const [selectedTeam, setSelectedTeam] = useState('Todos');

  return (
    <>
      <div className="body-content">      
        <div className="store-page">
          <FilterSidebar onFilterChange={setSelectedTeam} />
          <ProductList selectedTeam={selectedTeam} />
        </div>
      </div>
      
    </>
  );
}
