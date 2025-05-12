import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarProductoPage.css';

function EditarProductoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data));
  }, [id]);

  // Función para manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Si el campo modificado es el precio, formateamos solo números y lo mostramos con formato moneda
    if (name === 'price') {
      const rawValue = value.replace(/[^\d]/g, ''); // Quita todo lo que no sea número
      const formatted = `$${Number(rawValue).toLocaleString('es-AR')}`;
      setProducto(prev => ({
        ...prev,
        price: formatted,
      }));
    } else if (name.startsWith('stock.')) {
      const size = name.split('.')[1];
      setProducto(prev => ({
        ...prev,
        stock: {
          ...prev.stock,
          [size]: parseInt(value, 10) || 0,
        }
      }));
    } else {
      setProducto(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Función para manejar el envío del formulario y actualizar el producto en el json-server
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevenir recarga de página

    const productoFormateado = {
      ...producto,
    };

    await fetch(`http://localhost:3000/products/${id}`, { 
      method: 'PUT', // Actualizar producto
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productoFormateado)
    });

    alert('Producto actualizado correctamente');
    navigate('/admin/products/edit');
  };

  // Función para eliminar el producto
  const handleDelete = async () => {
    // Confirmación para evitar borrado accidental
    const confirm = window.confirm('¿Estás seguro de que querés eliminar este producto? Esta acción no se puede deshacer.');

    if (!confirm) return;

    // Redirigir a la lista de productos después de eliminar
    await fetch(`http://localhost:3000/products/${id}`, { 
      method: 'DELETE',
    });

    alert('Producto eliminado correctamente');
    navigate('/admin/products/edit'); // Redirigir a la lista de productos después de eliminar
  };


  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="editar-producto">
      <h2 className="editar-title">Editar Producto</h2>

      <div className="editar-producto-contenido">
        <div className="editar-producto-imagen">
          <img src={producto.image} alt={producto.title} />
        </div>

        <form className="editar-formulario" onSubmit={handleSubmit}>
          <label>Título</label>
          <input className="form-control" name="title" value={producto.title} onChange={handleChange} />

          <label>Precio</label>
          <input
            className="form-control"
            name="price"
            value={producto.price}
            onChange={handleChange}
          />

          <label>Equipo</label>
          <select
            className="form-control"
            name="equipo"
            value={producto.equipo}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un equipo</option>
            {[
              'Lakers', 'Warriors', 'Bulls', 'Celtics', 'Heat', 'Spurs', 'Nets',
              '76ers', 'Suns', 'Bucks', 'Mavericks', 'Clippers', 'Nuggets', 'Raptors',
              'Kings', 'Knicks', 'Pistons', 'Hornets', 'Thunder', 'Hawks', 'Timberwolves',
              'Magic', 'Pacers', 'Pelicans', 'Trail Blazers', 'Jazz', 'Grizzlies', 'Rockets',
              'Wizards'
            ].map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>

          <label>Imagen principal</label>
          <input className="form-control" name="image" value={producto.image} onChange={handleChange} />

          <label>Imágenes adicionales</label>
          {producto.images.map((img, index) => (
            <input
              key={index}
              className="form-control"
              type="text"
              name={`image-${index}`}
              placeholder={`Imagen secundaria ${index + 1}`}
              value={img}
              onChange={(e) => {
                const nuevasImagenes = [...producto.images];
                nuevasImagenes[index] = e.target.value;
                setProducto(prev => ({
                  ...prev,
                  images: nuevasImagenes
                }));
              }}
            />
          ))}

          <fieldset>
            <legend>Stock por Talle</legend>
            <div className="talles">
              {['S', 'M', 'L', 'XL'].map(talle => (
                <div className="talle-input" key={talle}>
                  <label>{talle}:</label>
                  <input
                    className="form-control"
                    type="number"
                    name={`stock.${talle}`}
                    value={producto.stock[talle]}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              ))}
            </div>
          </fieldset>

          <div className="botones-formulario">
            <button type="submit" className="guardar-button">Guardar Cambios</button>
            <button
              type="button"
              className="eliminar-button"
              onClick={handleDelete}
            >
              Eliminar Producto
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditarProductoPage;
