import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart Context
const CartContext = createContext();

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('shoppingCart');
    console.log('Loading from localStorage:', savedCart);
    return savedCart ? JSON.parse(savedCart) : { items: [] };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return { items: [] };
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    console.log('Saving to localStorage:', cart);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Cart Reducer
const cartReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'LOAD_CART':
      return action.payload;

    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
      saveCartToStorage(newState);
      return newState;

    case 'REMOVE_FROM_CART':
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      saveCartToStorage(newState);
      return newState;

    case 'UPDATE_QUANTITY':
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
      saveCartToStorage(newState);
      return newState;

    case 'CLEAR_CART':
      newState = {
        ...state,
        items: []
      };
      saveCartToStorage(newState);
      return newState;

    default:
      return state;
  }
};

// Cart Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  });

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    dispatch({ type: 'LOAD_CART', payload: savedCart });
  }, []);

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
