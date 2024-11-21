import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem.js";

export default function Checkout() {

    const { items, valorTotal } = useContext(CartContext);
    

    return (
        <section className="checkout">
            <h2>Checkout</h2>
            {items.map((i) => (<CartItem key={i.id} {...i}></CartItem>))}

            {items.length >= 1 ?
            <h2>Valor Total: {valorTotal.toFixed(2)}</h2> 
            :
            <h2>Nenhum item adicionado ao carrinho</h2>}

            <Link to="/" className="product-actions">
                <button>RETURN</button>
            </Link>
        </section>
    );
}