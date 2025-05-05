import { useCart } from '../context/CartContext';
import './Checkout.css'; // Opcional para estilos
import { useState } from 'react';

const Checkout = () => {
  const { cartItems, getTotal } = useCart();

  const [email, setEmail] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Gracias por tu compra, ${email}!\nEnviaremos tu pedido a ${codigoPostal}.`);
    // Aquí podrías vaciar carrito o redirigir en el futuro
  };

  return (
    <div className="checkout-container">
      <h2>Entrega y Pago</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>Email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Código Postal:</label>
        <input
          type="text"
          required
          value={codigoPostal}
          onChange={(e) => setCodigoPostal(e.target.value)}
        />

        <h3>Información de pago</h3>

        <label>Número de tarjeta:</label>
        <input
          type="text"
          required
          placeholder="XXXX XXXX XXXX XXXX"
          value={numeroTarjeta}
          onChange={(e) => setNumeroTarjeta(e.target.value)}
        />

        <label>Nombre en la tarjeta:</label>
        <input
          type="text"
          required
          placeholder="Nombre Apellido"
          value={nombreTarjeta}
          onChange={(e) => setNombreTarjeta(e.target.value)}
        />

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label>Vencimiento:</label>
            <input
              type="text"
              required
              placeholder="MM/AA"
              value={vencimiento}
              onChange={(e) => setVencimiento(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>CVV:</label>
            <input
              type="text"
              required
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>

        <label className="checkbox">
          <input type="checkbox" defaultChecked />
          Quiero recibir ofertas y novedades por e-mail
        </label>

        <button type="submit">Confirmar Compra</button>
      </form>

      <div className="checkout-resumen">
        <h3>Resumen de compra:</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.nombre} (x{item.quantity}) - ${item.precio.toLocaleString()}
            </li>
          ))}
        </ul>
        <h4>Total: ${getTotal().toLocaleString()}</h4>
      </div>
    </div>
  );
};

export default Checkout;

