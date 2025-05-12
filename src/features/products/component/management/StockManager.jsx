import React, { useState } from 'react';
import './StockManager.css';

function StockManager({ product }) {
  const [stock, setStock] = useState(product.stock);

  const handleStockChange = (size, value) => {
    const newStock = { ...stock, [size]: parseInt(value) || 0 }; // Si el valor no es un número válido, se usa 0 por defecto.
    setStock(newStock);
  };

  const handleSave = async () => {
    try {
      // Realiza una solicitud PUT al servidor para actualizar el producto con el nuevo stock  
      const response = await fetch(`http://localhost:3000/products/${product.id}`, {
        method: 'PUT', //Actualizar recursos existentes
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...product, stock }), // Enviar el stock actualizado
      });

      if (!response.ok) throw new Error('Error al actualizar el stock');
      alert('Stock actualizado correctamente');
    } catch (error) {
      console.error(error);
      alert('No se pudo actualizar el stock');
    }
  };

  return (
    <div className="stock-manager">
      <h3 className="product-title">{product.title}</h3>

      <div className="stock-manager-content">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="stock-inputs">
          <fieldset>
            <legend>Stock por Talle</legend>
            <div className="sizes">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <div className="size-input" key={size}>
                  <label>{size}:</label>
                  <input
                    type="number"
                    min="0"
                    value={stock[size]}
                    onChange={(e) => handleStockChange(size, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </fieldset>
          <button className="save-button" onClick={handleSave}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}

export default StockManager;
