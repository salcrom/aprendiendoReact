import { useId } from 'react';
import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from './Icons';
import "./Cart.css";
import { useCart } from '../hooks/useCart';

function CartItem({ thumbnail, title, price, quantity, addToCart }) {
    return (
        <li>
            <img
                src={thumbnail}
                alt={title}
            />
            <stron>{title}</stron> - ${price}
            <footer>
                <small>
                    Qty: {quantity}
                </small>
                <button onClick={addToCart}>+</button>
            </footer>
        </li>
    );
}

export function Cart() {
    const cartCheckboxId = useId();
    const { cart, clearCart, addToCart } = useCart();

    return (
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input id={cartCheckboxId} type="checkbox" hidden />

            <aside className="cart">
                <ul className="cart-items">
                    {cart.map((product) => (
                        <CartItem
                            key={product.id}
                            addToCart={() => addToCart(product)}
                            {...product}
                        />
                    ))}
                </ul>

                <button onClick={clearCart}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    );
}
