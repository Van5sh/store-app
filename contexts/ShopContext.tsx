import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { fetchFakeStoreProducts } from '../constants/items';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {}

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

    case 'ADD':
      return { ...state, cart: [...state.cart, action.payload] };

    case 'DELETE':
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };

    default:
      return state;
  }
}

export default function CartContextProvider({ children }: { children: ReactNode }) {
  const [shopState, dispatch] = useReducer(shopReducer, initialState);

  useEffect(() => {
    async function loadProducts() {
      const products = await fetchFakeStoreProducts();
      dispatch({ type: 'SET_PRODUCTS', payload: products });
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