import { useCart } from '../context/CartContext';
import './Checkout.css';
import { useState } from 'react';

const Checkout = () => {
  const { cartItems, getTotal, clearCart } = useCart();

  const [email, setEmail] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [totalFinal, setTotalFinal] = useState(null);
  const [tipoTarjeta, setTipoTarjeta] = useState('');
  const [cuotas, setCuotas] = useState(3); // Por defecto, 3 cuotas
  const [totalConInteres, setTotalConInteres] = useState(getTotal());
  const [costoEnvio, setCostoEnvio] = useState(0);

  const detectarTipoTarjeta = (numero) => {
    const visaRegex = /^4[0-9]{0,15}$/; // Visa comienza con 4
    const mastercardRegex = /^5[1-5][0-9]{0,14}$/; // Mastercard comienza con 51-55
    const amexRegex = /^3[47][0-9]{0,13}$/; // American Express comienza con 34 o 37
  
    if (visaRegex.test(numero)) {
      setTipoTarjeta('visa');
    } else if (mastercardRegex.test(numero)) {
      setTipoTarjeta('mastercard');
    } else if (amexRegex.test(numero)) {
      setTipoTarjeta('amex');
    } else {
      setTipoTarjeta(''); // No coincide con ningún tipo
    }
  };

  const calcularCuota = (total, cuotas) => {
    let interes = 0;
    if (cuotas === 6) interes = 0.15; // 15% de interés para 6 cuotas
    if (cuotas === 12) interes = 0.30; // 30% de interés para 12 cuotas
    const totalConInteres = total + total * interes;
    return (totalConInteres / cuotas).toFixed(2);
  };

  const calcularTotalConInteres = (total, cuotas) => {
    let interes = 0;
    if (cuotas === 6) interes = 0.15; // 15% de interés para 6 cuotas
    if (cuotas === 12) interes = 0.30; // 30% de interés para 12 cuotas
    return (total + total * interes).toFixed(2);
  };

  const calcularEnvio = (codigoPostal) => {
    if (codigoPostal.startsWith("1000")) {
      setCostoEnvio(0); // Envío gratis
    } else if (codigoPostal.startsWith("7000")) {
      setCostoEnvio(5000); // Costo de $5000
    } else {
      setCostoEnvio(9000); // Costo de $9000
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pedido = {
      email,
      codigoPostal,
      productos: cartItems,
      total: getTotal(),
      fecha: new Date().toISOString(),
    };
    
    try {
      // Guardar pedido en json-server
      await fetch('http://localhost:3000/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido),
      });

      // Actualizar stock
      for (const item of cartItems) {
        const res = await fetch(`http://localhost:3000/products/${item.id}`);
        const producto = await res.json();

        // Simular reducción de stock
        const nuevaCantidad = { ...producto.stock };
        if (nuevaCantidad[item.talle]) {
          nuevaCantidad[item.talle] -= item.quantity;
        }

        await fetch(`http://localhost:3000/products/${item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stock: nuevaCantidad }),
        });
      }

      setMensajeExito(`Gracias por tu compra, ${email}! Enviaremos tu pedido a ${codigoPostal}.`);
      const total = getTotal();
      setTotalFinal(total); 
      clearCart();
    } catch (error) {
      console.error('Error procesando el pedido:', error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Entrega y Pago</h2>
      {mensajeExito ? (
        <div className="checkout-success">{mensajeExito}</div>
      ) : (
        <form onSubmit={handleSubmit} className="checkout-form">
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />          



          <h3>Información de pago</h3>

          <label>Número de tarjeta:</label>
          <div className="input-tarjeta">
            <input
              type="text"
              required
              placeholder="XXXX XXXX XXXX XXXX"
              value={numeroTarjeta}
              onChange={(e) => {
                setNumeroTarjeta(e.target.value);
                detectarTipoTarjeta(e.target.value);
              }}
            />
            {tipoTarjeta && (
              <i className={`tarjeta-icono fab fa-cc-${tipoTarjeta} ${tipoTarjeta}`}></i>
            )}
          </div>

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

          <div>
            <label>Seleccionar cuotas:</label>
            <select
              value={cuotas}
              onChange={(e) => {
                const cuotasSeleccionadas = parseInt(e.target.value, 10);
                setCuotas(cuotasSeleccionadas);
                const nuevoTotal = calcularTotalConInteres(getTotal(), cuotasSeleccionadas);
                setTotalConInteres(nuevoTotal);
              }}
            >
              <option value={3}>
                3 cuotas sin interés de ${calcularCuota(getTotal(), 3)}
              </option>
              <option value={6}>
                6 cuotas con 15% interés de ${calcularCuota(getTotal(), 6)}
              </option>
              <option value={12}>
                12 cuotas con 30% interés de ${calcularCuota(getTotal(), 12)}
              </option>
            </select>
          </div>
          
          <div>
            <label>Calcular envío:</label>
            <p> </p> 

            <label>Código Postal:</label>
          <input
            type="text"
            required
            value={codigoPostal}
            onChange={(e) => setCodigoPostal(e.target.value)}
          />

            <div className="input-envio">

              <button
                type="button"
                onClick={() => calcularEnvio(codigoPostal)}
              >
                
                Calcular
              </button>
              
            </div>
            {costoEnvio !== null && (
              <p>
                <strong>Costo de envío:</strong>{" "}
                {costoEnvio === 0 ? "Envío gratis" : `$${costoEnvio.toLocaleString()}`}
              </p>
            )}
          </div>

          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            Quiero recibir ofertas y novedades por e-mail
          </label>

          <button type="submit">Confirmar Compra</button>
        </form>
      )}

      <div className="checkout-resumen">
        <h3>Resumen de compra:</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.nombre} (x{item.quantity}) - Talle: {item.talle} - ${item.precio.toLocaleString()}
            </li>
          ))}
        </ul>
        <h4>
          Total: $
          {mensajeExito
            ? (parseFloat(totalFinal) + parseFloat(costoEnvio)).toLocaleString()
            : (parseFloat(totalConInteres) + parseFloat(costoEnvio)).toLocaleString()}
        </h4>
        </div>
    </div>
  );
};

export default Checkout;
