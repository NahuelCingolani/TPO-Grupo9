import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Carrito.css'; // (opcional, para darle estilo)

const Carrito = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="carrito-vacio">
        <h2>Tu carrito está vacío 🛒</h2>
        <Link to="/store"><button>Ir a la tienda</button></Link>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h2>Carrito de Compras</h2>
      <ul className="carrito-lista">
        {cartItems.map((item) => (
          <li key={`${item.id}-${item.talle}`}className="carrito-item">
            <img src={item.imagen} alt={item.nombre} className="carrito-img" />
            <div className="carrito-detalle">
              <h4>{item.nombre}</h4>
              <p>${item.precio.toLocaleString()}</p>
              {item.talle && <p><strong>Talle:</strong> {item.talle}</p>}
              <div className="cantidad-controles">
                <button onClick={() => updateQuantity(item.id, -1,item.talle)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1,item.talle)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id, item.talle)} className="btn-borrar">
                Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="carrito-total">
        <h3>Total: ${getTotal().toLocaleString()}</h3>
        <Link to="/checkout">
          <button className="btn-finalizar">Finalizar compra</button>
        </Link>
      </div>
    </div>
  );
};

export default Carrito;
