import { createContext, useContext, useState } from 'react';
import products from '../data/products.json'; // Importa tus productos


const CartContext = createContext();

// Hook para usar el contexto
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para obtener el stock disponible
  const getAvailableStock = (productId, size) => {
    const product = products.find(p => p.id === productId);
    if (!product || !product.stock) return 0;
    return product.stock[size] || 0;
  };


  // Agregar producto al carrito (considera talle y stock)
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => 
        item.id === product.id && item.talle === product.talle
      );
      
      if (existingItem) {
        const availableStock = getAvailableStock(product.id, product.talle);
        if (existingItem.quantity >= availableStock) {
          alert(`No hay suficiente stock. Máximo disponible: ${availableStock}`);
          return prevItems;
        }
        
        return prevItems.map((item) =>
          item.id === product.id && item.talle === product.talle
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Actualizar cantidad (considera talle)
  const updateQuantity = (id, delta, talle) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id && item.talle === talle) {
          const newQuantity = item.quantity + delta;
          const availableStock = getAvailableStock(id, talle);
          
          // Validar stock
          if (newQuantity > availableStock) {
            alert(`No hay suficiente stock. Máximo disponible: ${availableStock}`);
            return item;
          }
          
          // Validar que no sea menor a 1
          if (newQuantity < 1) {
            return item;
          }
          
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Eliminar producto (considera talle)
  const removeFromCart = (id, talle) => {
    setCartItems((prevItems) => 
      prevItems.filter((item) => !(item.id === id && item.talle === talle))
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
        getTotal,
        getAvailableStock 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
