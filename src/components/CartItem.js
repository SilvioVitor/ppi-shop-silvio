import "./CartItem.css"

import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartItem ({
    id,
    thumbnail,
    title,
    price,
    description    
}) {

        const { addItemToCart, updateItemQuantity, items } = useContext(CartContext);

        const itemQuantityIndex = items.findIndex((item) => (item.id === id))
    return (
        <div className="cartItem">
            <img src={thumbnail} alt={title} />
            <h2>{title}</h2>
            <p>$ {price}</p>
            <div className="box-quantity">
                <button onClick={() => updateItemQuantity(id, 1)}>-</button>
                {items[itemQuantityIndex].quantity}
                <button onClick={() => addItemToCart(id)}>+</button>
            </div>
        </div>
    );
};