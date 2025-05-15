import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./ProductPage.css";
import Navbar from "../../shared/component/layouts/NavBar";
import { useCart } from "../../features/cart/context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

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

  // Para el producto principal
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

  // Productos similares
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
    if (!selectedSize) {
      alert("Por favor selecciona un talle antes de comprar.");
      return;
    }

    const productForCart = {
      id: product.id,
      nombre: product.title,
      precio: parseFloat(product.price.replace(/\$/g, "").replace(/\./g, "")),
      imagen: product.images[0],
      talle: selectedSize,
    };

    addToCart(productForCart); // Agrega el producto al carrito
    alert(`¡Gracias por tu compra de "${product.title}" (Talle: ${selectedSize})!`);
    navigate("/carrito"); // Redirige al carrito
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
    const postalCodeNumber = parseInt(postalCode, 10); // Convierte el código postal a número
  
    if (postalCodeNumber >= 1000 && postalCodeNumber <= 1999) {
      setShippingCost(0); // Envío gratis
    } else if (postalCodeNumber >= 7000 && postalCodeNumber <= 7999) {
      setShippingCost(5000); // Costo desde $5000
    } else if (postalCodeNumber >= 6000 && postalCodeNumber <= 6999) {
      setShippingCost(9000); // Costo desde $9000
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
          <p>
            <strong>Mismo precio en 3 cuotas de:</strong>{" "}
            {`$${(parseFloat(product.price.replace(/\$/g, "").replace(/\./g, "")) / 3)
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
          </p>
          <p><strong>Equipo:</strong> {product.equipo}</p>
          <p><strong>Descripción:</strong> {product.description || "Sin descripción disponible."}</p>
          <p>
            <strong>Envío:</strong>{" "}
            {shippingCost === null
              ? "Ingrese su código postal para calcular el costo de envío."
              : shippingCost === 0
              ? "Envío gratis. Llega en 24hs."
              : shippingCost === 5000
              ? "$5000. Llega en 3 días hábiles"
              : shippingCost === 9000
              ? "$9000. Llega en 5 días hábiles"
              : "No disponible para este CP"}
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
        <form onSubmit={handleConsultationSubmit} className="consultation-form">
          <div className="consultation-input-container">
            <textarea
              value={consultation}
              onChange={(e) => setConsultation(e.target.value)}
              placeholder="Escribe tu consulta aquí..."
              rows="4"
              className="consultation-textarea"
            />
            <a
              href="https://wa.me/2215342811" 
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-icon"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
          <button type="submit" className="btn btn-submit">Enviar consulta</button>
        </form>
      </div>
    </div>
  );
}
