import { useNavigate } from 'react-router-dom';
import React from 'react';
import './CategoriasEquipos.css';

const equipos = [
  'Lakers',
  'Warriors',
  'Bulls',
  'Suns',
  'Bucks',
  'Pacers',
  '76ers'
];

const CategoriasEquipos = () => {
  const navigate = useNavigate();

  const handleClick = (equipo) => {
    const equipoURL = equipo.toLowerCase().replace(/\s+/g, '-');
    navigate(`/equipo/${equipoURL}`);
  };
return (
    <div className="categorias-equipos-container">
      <h2>Categorías por Equipo</h2>
      <div className="equipos-lista">
        {equipos.map((equipo, idx) => (
          <button key={idx} className="equipo-btn" onClick={() => handleClick(equipo)}>
            {equipo}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriasEquipos;