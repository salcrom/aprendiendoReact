import { useReducer } from 'react';
import { CartContext } from './cartContext';
import { cartReducer, cartInitialState } from "../reducers/cart";


function useCartReducer (){
    const [state, dispatch] = useReducer(cartReducer,cartInitialState);

    const addToCart = product => dispatch({ type: 'ADD_TO_CART', payload: product });
    const removeFromCart = product => dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    const clearCart = () => dispatch({ type: "CLEAR_CART" });

    return { state, addToCart, removeFromCart, clearCart };
}


// 2.Crear el provider, para proveer el contexto
export const CartProvider = ({ children }) => {
    const { state, addToCart, removeFromCart, clearCart } = useCartReducer();

    return (
        <CartContext.Provider value={{
                cart: state,
                addToCart,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
