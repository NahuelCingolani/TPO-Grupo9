import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.json"; // Importa los productos desde el JSON
import "./ProductPage.css"; // Estilos específicos para la página del producto
import Navbar from "../components/NavBar"; // Importa el componente Navbar

export default function ProductPage() {
  const { id } = useParams(); // Obtén el `id` del producto desde la URL
  const product = products.find((p) => p.id === parseInt(id)); // Encuentra el producto por su `id`

  const [favorite, setFavorite] = useState(false); // Estado para favoritos
  const [consultation, setConsultation] = useState(""); // Estado para la consulta del usuario

  if (!product) {
    return <h1>Producto no encontrado</h1>; // Mensaje si el producto no existe
  }

  const handleAddToCart = () => {
    alert(`"${product.title}" fue agregado al carrito.`);
  };

  const handleBuyNow = () => {
    alert(`¡Gracias por tu compra de "${product.title}"!`);
  };

  const handleAddToFavorites = () => {
    setFavorite(!favorite);
    alert(
      favorite
        ? `"${product.title}" fue eliminado de tus favoritos.`
        : `"${product.title}" fue agregado a tus favoritos.`
    );
  };

  const handleConsultationSubmit = (e) => {
    e.preventDefault();
    if (consultation.trim() !== "") {
      alert(`Consulta enviada: "${consultation}"`);
      setConsultation(""); // Reseteamos el formulario
    } else {
      alert("Por favor, escribe algo en tu consulta.");
    }
  };

  return (
    <div className="product-page">
      <Navbar /> {/* Agrega el Navbar aquí */}
      <div className="product-page__details">
        <img
          src={product.image}
          alt={product.title}
          className="product-page__image"
        />
        <div className="product-page__info">
          <h1>{product.title}</h1>
          <p><strong>Precio:</strong> {product.price}</p>
          <p><strong>Equipo:</strong> {product.equipo}</p>
          <p><strong>Descripción:</strong> {product.description || "Sin descripción disponible."}</p>
          <p><strong>Envío:</strong> desde $500</p>
          <div className="product-page__actions">
            <button onClick={handleBuyNow} className="btn btn-buy">Comprar</button>
            <button onClick={handleAddToCart} className="btn btn-cart">Agregar al carrito</button>
            <button onClick={handleAddToFavorites} className="btn btn-favorite">
              {favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            </button>
          </div>
          <div className="product-page__sizes">
            <label htmlFor="size-selector"><strong>Seleccionar talle:</strong></label>
            <select id="size-selector" className="size-selector">
              <option value="S">S (Disponible)</option>
              <option value="M" disabled>M (No disponible)</option>
              <option value="L">L (Disponible)</option>
              <option value="XL" disabled>XL (No disponible)</option>
            </select>
          </div>
          <div className="product-page__quantity">
            <p><strong>Cantidad disponible:</strong> 6 unidades</p>
          </div>
        </div>
      </div>
      <div className="product-page__consultation">
        <h2>Dejar una consulta</h2>
        <form onSubmit={handleConsultationSubmit}>
          <textarea
            value={consultation}
            onChange={(e) => setConsultation(e.target.value)}
            placeholder="Escribe tu consulta aquí..."
            rows="4"
          />
          <button type="submit" className="btn btn-submit">Enviar consulta</button>
        </form>
      </div>
    </div>
  );
}