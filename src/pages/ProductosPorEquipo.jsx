import { useParams } from 'react-router-dom';
import ProductList from '../Components/ProductList';

export default function ProductosPorEquipo() {
  const { nombreEquipo } = useParams();

  const equipoNormalizado = nombreEquipo
    .replace(/-/g, ' ')
    .replace(/\b\w/g, letra => letra.toUpperCase());

  return (
    <div className="productos-por-equipo">
      <h2>Productos de {equipoNormalizado}</h2>
      <ProductList selectedTeam={equipoNormalizado === 'Todos' ? 'Todos' : equipoNormalizado} />
    </div>
  );
}
