import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { fetchFakeStoreProducts } from '../constants/items';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number; // Tracks the quantity of the item in the cart
}

interface ShopState {
  products: Product[];
  cart: CartItem[];
}

type ReducerAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD'; payload: Product }
  | { type: 'DELETE'; payload: number };

const initialState: ShopState = {
  products: [],
  cart: [],
};

export const CartContext = createContext<{
  products: Product[];
  cartItems: CartItem[];
  addItem: (item: Product) => void;
  deleteItem: (id: number) => void;
}>({
  products: [],
  cartItems: [],
  addItem: () => {},
  deleteItem: () => {},
});

function shopReducer(state: ShopState, action: ReducerAction): ShopState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };

    case 'ADD': {
      const existingItemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1; // Increment quantity
        return { ...state, cart: updatedCart };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }], // Add new item with quantity 1
        };
      }
    }

    case 'DELETE': {
      const existingItemIndex = state.cart.findIndex((item) => item.id === action.payload);
      if (existingItemIndex >= 0) {
        const updatedCart = [...state.cart];
        if (updatedCart[existingItemIndex].quantity > 1) {
          updatedCart[existingItemIndex].quantity -= 1; // Decrement quantity
        } else {
          updatedCart.splice(existingItemIndex, 1); // Remove item if quantity is 1
        }
        return { ...state, cart: updatedCart };
      }
      return state;
    }

    default:
      return state;
  }
}

export default function CartContextProvider({ children }: { children: ReactNode }) {
  const [shopState, dispatch] = useReducer(shopReducer, initialState);

  useEffect(() => {
    async function loadProducts() {
      try {
        const products = await fetchFakeStoreProducts();
        dispatch({ type: 'SET_PRODUCTS', payload: products });
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }
    loadProducts();
  }, []);

  const addItem = (item: Product) => {
    dispatch({ type: 'ADD', payload: item });
  };

  const deleteItem = (id: number) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  return (
    <CartContext.Provider
      value={{
        products: shopState.products,
        cartItems: shopState.cart,
        addItem,
        deleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}