import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductPage.css";
import Navbar from "../Components/NavBar";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [consultation, setConsultation] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [currentSimilarIndex, setCurrentSimilarIndex] = useState(0);
  const [postalCode, setPostalCode] = useState("");
  const [shippingCost, setShippingCost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error(err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (product) {
      fetch(`http://localhost:3000/products/similar/${product.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Error al obtener productos similares");
          return res.json();
        })
        .then((data) => setSimilarProducts(data))
        .catch((err) => console.error(err));
    }
  }, [product]);

  useEffect(() => {
    fetch(`http://localhost:3000/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => setSimilarProducts(data))
      .catch((err) => console.error(err));
  }, []); // Sin dependencias

  useEffect(() => {
    const track = document.querySelector(".similar-carousel__track");
    if (track) {
      track.style.setProperty("--current-index", currentSimilarIndex);
    }
  }, [currentSimilarIndex]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <h1>Producto no encontrado</h1>;

  const handleNextImage = () => {
    const currentImage = document.querySelector(".product-page__image");
    currentImage.classList.add("hidden"); // Añade la clase para animar la salida

    setTimeout(() => {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
      currentImage.classList.remove("hidden"); // Quita la clase después de cambiar la imagen
    }, 500); // Tiempo igual al de la animación CSS
  };

  const handlePrevImage = () => {
    const currentImage = document.querySelector(".product-page__image");
    currentImage.classList.add("hidden");

    setTimeout(() => {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
      currentImage.classList.remove("hidden");
    }, 500);
  };

  const handleNextSimilar = () => {
    setCurrentSimilarIndex((prev) =>
      prev === similarProducts.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevSimilar = () => {
    setCurrentSimilarIndex((prev) =>
      prev === 0 ? similarProducts.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona un talle");
      return;
    }

    const productForCart = {
      id: product.id,
      nombre: product.title,
      precio: parseFloat(product.price.replace(/\$/g, "").replace(/\./g, "")),
      imagen: product.images[0],
      talle: selectedSize,
    };

    addToCart(productForCart);
    alert(`"${product.title}" (Talle: ${selectedSize}) fue agregado al carrito.`);
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
    if (consultation.trim()) {
      alert(`Consulta enviada: "${consultation}"`);
      setConsultation("");
    } else {
      alert("Por favor, escribe algo en tu consulta.");
    }
  };

  const handleCalculateShipping = () => {
    if (postalCode.startsWith("7000")) {
      setShippingCost(5000);
    } else if (postalCode.startsWith("1000")) {
      setShippingCost(0); // Envío gratis
    } else {
      setShippingCost("No disponible para este CP");
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
          <p>
            <strong>Envío:</strong>{" "}
            {shippingCost === null
              ? "desde $500"
              : shippingCost === 0
              ? "Envío gratis"
              : shippingCost === "No disponible para este CP"
              ? "No disponible para este CP"
              : `$${shippingCost}`}
          </p>

          <div className="product-page__actions-container">
            <div className="product-page__actions">
              <button className="btn btn-buy" onClick={handleBuyNow}>
                <i className="fas fa-shopping-cart"></i> Comprar
              </button>

              <button className="btn btn-cart" onClick={handleAddToCart}>
                <i className="fas fa-cart-plus"></i> Agregar al carrito
              </button>

              <button className="btn btn-favorite" onClick={handleAddToFavorites}>
                <i className={`fas ${favorite ? "fa-heart" : "fa-heart-broken"}`}></i>
                {favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
              </button>
            </div>

            <div className="product-page__sizes-shipping">
              <div className="product-page__sizes">
                <label htmlFor="size-selector"><strong>Seleccionar talle:</strong></label>
                <select
                  id="size-selector"
                  className="size-selector"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">-- Selecciona talle --</option>
                  {Object.entries(product.stock || {}).map(([size, quantity]) => (
                    <option
                      key={size}
                      value={size}
                      disabled={quantity === 0}
                    >
                      {size} {quantity === 0 ? "(Agotado)" : `(Disponible: ${quantity})`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="product-page__shipping">
                <label htmlFor="postal-code"><strong>Calcular envío:</strong></label>
                <input
                  id="postal-code"
                  type="text"
                  className="postal-code-input"
                  placeholder="Ingrese CP"
                  maxLength="4"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                <button
                  className="btn-calculate"
                  onClick={handleCalculateShipping}
                >
                  Calcular
                </button>
                {shippingCost !== null && (
                  <p></p>
                )}
              </div>
            </div>
          </div>

          {selectedSize && (
            <p><strong>Cantidad disponible:</strong> {product.stock[selectedSize]} unidades</p>
          )}
        </div>
      </div>

      {/* Productos similares */}
      <div className="product-page__similar">
        <h2>Productos similares</h2>
        <div className="similar-carousel">

          <div className="similar-carousel__track">
            {similarProducts.map((product, index) => (
              <div
                key={index}
                className={`similar-carousel__item ${
                  index === currentSimilarIndex ? "active" : ""
                }`}
              >
                <Link
                  to={`/product/${product.id}`}
                  className="similar-carousel__link"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="similar-carousel__image"
                  />
                  <p>{product.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dejar una consulta */}
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
