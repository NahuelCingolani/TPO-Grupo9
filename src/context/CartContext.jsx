import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

// Hook para usar el contexto
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

// Agregar al carrito (considera talle)
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => 
        item.id === product.id && item.talle === product.talle
      );
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.talle === product.talle
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Eliminar producto (considera talle)
  const removeFromCart = (id, talle) => {
    setCartItems((prevItems) => 
      prevItems.filter((item) => !(item.id === id && item.talle === talle))
    );
  };

  // Actualizar cantidad (sumar o restar)
  const updateQuantity = (id, delta, talle) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.talle === talle
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  // Vaciar carrito completo
  const clearCart = () => setCartItems([]);

  // Calcular total
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
