import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem.js";

export default function Checkout() {

    const {items} = useContext(CartContext);

    return (
        <section className="checkout">
            <h2>Checkout</h2>
            {items.map((i) => (<CartItem {...i}></CartItem>))}
            
            <Link to="/" className="product-actions">
                <button>RETURN</button>
            </Link>
        </section>
    );
}