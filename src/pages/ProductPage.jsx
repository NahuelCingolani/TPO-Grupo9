import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products.json";  
import "./ProductPage.css"; 
import Navbar from "../components/NavBar";  
import { useCart } from "../context/CartContext"; // ✅ Importar contexto

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart(); // ✅ Usar contexto

  const [favorite, setFavorite] = useState(false);
  const [consultation, setConsultation] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return <h1>Producto no encontrado</h1>;
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = () => {
    const productForCart = {
      id: product.id,
      nombre: product.title, // 🔁 Cambiamos a la propiedad que usa el contexto
      precio: parseFloat(product.price.replace(/\$/g, "").replace(/\./g, "")),
      imagen: product.images[0]
    };

    addToCart(productForCart); // ✅ Usar función del contexto
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
      setConsultation("");
    } else {
      alert("Por favor, escribe algo en tu consulta.");
    }
  };

  return (
    <div className="product-page">
      <Navbar />
      <div className="product-page__details">
        <div className="product-page__carousel">
          <button onClick={handlePrevImage} className="carousel-btn prev-btn">
            &#8249;
          </button>
          <img
            src={product.images[currentImageIndex]}
            alt={`${product.title} - Imagen ${currentImageIndex + 1}`}
            className="product-page__image"
          />
          <button onClick={handleNextImage} className="carousel-btn next-btn">
            &#8250;
          </button>
        </div>
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
