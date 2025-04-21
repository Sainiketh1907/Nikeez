import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        console.log("CartProvider: Initializing cart from localStorage", JSON.parse(savedCart));
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
    return []; 
  });


 

  // Effect to SAVE cartItems to localStorage whenever it changes
  useEffect(() => {
    console.log("CartContext: Saving cartItems to localStorage", cartItems);
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]); 

  const addToCart = (item) => {
    console.log("addToCart called in context with item:", item);
    setCartItems((prevItems) => {
      console.log("Previous cart items:", prevItems);
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        console.log(`${item.title} already exists. Not adding again.`);
        return prevItems; // No change, so localStorage effect won't run unnecessarily
      }
      const newItem = { ...item, quantity: 1 };
      const newItems = [...prevItems, newItem];
      console.log("New cart items state:", newItems);
      // No need to explicitly save here, the useEffect above handles it
      return newItems;
    });
  };

  const removeFromCart = (itemId) => {
    console.log("removeFromCart called for ID:", itemId);
    setCartItems((prevItems) => {
        const updatedItems = prevItems.filter(item => item.id !== itemId);
        console.log("Items after removal:", updatedItems);
        // No need to explicitly save here, the useEffect above handles it
        return updatedItems;
    });
  };

  const clearCart = () => {
    console.log("Clearing cart");
    setCartItems([]); 
    
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart, // Add here
    itemCount: cartItems.length
  };

  // Log state updates (keep for debugging)
  useEffect(() => {
    console.log("CartContext: cartItems state updated internally", cartItems);
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};