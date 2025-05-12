import React, { useState } from 'react';
import './ProductForm.css';

const defaultStock = { S: 0, M: 0, L: 0, XL: 0 };

function ProductForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    title: initialData.title || '',
    price: initialData.price || '',
    envio: initialData.envio || 'Envío gratis',
    equipo: initialData.equipo || '',
    image: initialData.image || '',
    images: initialData.images || ['', ''],
    stock: initialData.stock || defaultStock,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['S', 'M', 'L', 'XL'].includes(name)) {
      setForm(prev => ({
        ...prev,
        stock: { ...prev.stock, [name]: parseInt(value) || 0 }
      }));
    } else if (name.startsWith('image-')) {
      const index = parseInt(name.split('-')[1]);
      const newImages = [...form.images];
      newImages[index] = value;
      setForm({ ...form, images: newImages });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{initialData.id ? 'Editar Producto' : 'Agregar Producto'}</h2>

      <input
        type="text"
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="price"
        placeholder="Precio"
        value={form.price}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="equipo"
        placeholder="Equipo (Lakers, Bulls, etc.)"
        value={form.equipo}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="image"
        placeholder="URL de imagen principal"
        value={form.image}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="image-0"
        placeholder="Imagen secundaria 1"
        value={form.images[0]}
        onChange={handleChange}
      />

      <input
        type="text"
        name="image-1"
        placeholder="Imagen secundaria 2"
        value={form.images[1]}
        onChange={handleChange}
      />

      <fieldset>
        <legend>Stock por Talle</legend>
        {['S', 'M', 'L', 'XL'].map(size => (
          <label key={size}>
            {size}:
            <input
              type="number"
              name={size}
              value={form.stock[size]}
              min="0"
              onChange={handleChange}
            />
          </label>
        ))}
      </fieldset>

      <button type="submit">Guardar</button>
    </form>
  );
}

export default ProductForm;
