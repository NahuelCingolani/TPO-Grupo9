
import React, { useState } from 'react';
import './Home.css';
import bannerImage from '../Assets/banner1.png'; // Cambiá por tu imagen de banner

import CategoriasEquipos from './CategoriasEquipos';
import ProductList from './ProductList';

export default function Home() {
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

    const handleEquipoClick = (equipo) => {
        setEquipoSeleccionado(equipo);
    };

    return (
    <>
    <div className="home-page">
        <div className="banner">
        <img src={bannerImage} alt="Banner Principal" className="banner-image" />
        </div>

        <CategoriasEquipos onSelectEquipo={handleEquipoClick}/>

        {equipoSeleccionado && (
        <ProductList selectedTeam={equipoSeleccionado} />
        )}

        
    
        <div className="info-section">
        <div className="info-card">
            <h3>ENVIOS A TODO EL PAÍS</h3>
            <p>A Domicilio y a todas las Sucursales OCA del País. Gratis en compras + $150.000.</p>
        </div>
        <div className="info-card">
            <h3>MEDIOS DE PAGO</h3>
            <p>Con Mercado Pago con todas las Tarjetas de Crédito, Débito y Transferencia Bancaria.</p>
        </div>
        <div className="info-card">
            <h3>CONSULTAS ONLINE</h3>
            <p>Respondemos todas tus consultas por Whatsapp e Instagram. ¡Escribinos!</p>
        </div>
        </div>
    </div>
    </>
    );
}
