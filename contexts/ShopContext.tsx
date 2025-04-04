import { createContext, useReducer, ReactNode } from 'react';

const DUMMY_CART_ITEMS = [
  { id: 'c1', title: 'Item 1', price: 29.99 },
  { id: 'c2', title: 'Item 2', price: 49.99 },
];

interface CartItem {
  id: string;
  title: string;
  price: number;
}

type ReducerAction =
  | { type: 'ADD'; payload: Omit<CartItem, 'id'> }
  | { type: 'DELETE'; payload: string };

export const CartContext = createContext<{
  cartItems: CartItem[];
  addItem: (itemData: Omit<CartItem, 'id'>) => void;
  deleteItem: (id: string) => void;
}>({
  cartItems: [],
  addItem: () => {},
  deleteItem: () => {},
});

function cartReducer(state: CartItem[], action: ReducerAction): CartItem[] {
  switch (action.type) {
    case 'ADD':
      const newItem: CartItem = {
        id: new Date().toISOString() + Math.random().toString(),
        ...action.payload,
      };
      return [newItem, ...state];
    case 'DELETE':
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

function CartContextProvider({ children }: { children: ReactNode }) {
  const [cartState, dispatch] = useReducer(cartReducer, DUMMY_CART_ITEMS);

  const addItem = (itemData: Omit<CartItem, 'id'>) => {
    dispatch({ type: 'ADD', payload: itemData });
  };

  const deleteItem = (id: string) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const contextValue = {
    cartItems: cartState,
    addItem,
    deleteItem,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export default CartContextProvider;