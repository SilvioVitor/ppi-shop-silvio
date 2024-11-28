import { createContext, useState, useEffect, useReducer } from "react";
import { supabase } from "../utils/supabase";

export const CartContext = createContext({
    items: [],
    products: [],
    loading: false,
    error: "",
    valorTotal: {},
    addItemToCart: () => { },
    updateItemQuantity: () => { }
});

export default function CartContextProvider({ children }) {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [valorTotal, setValorTotal] = useState(0.00);

    useEffect(() => {

        async function getProducts() {
            setLoading(true);
            const { data: products, error } = await supabase.from("products").select();

            if(products.length > 0){
                setProducts(products);
            } else {
                setError(`Fetcing products failed ${error}`)
            }
            setLoading(false)
        }
        getProducts();

       // async function fetchProducts() {
      //      setLoading(true);
        //    const response = await fetch("https://dummyjson.com/products/category/motorcycle?limit=12&select=id,thumbnail,title,price,description");
        //    if (response.ok) {
        //        const result = await response.json();
       //         setProducts(result.products);
       //     } else {
        //        setError("Fetch FAILED!");
       //     }
       //     setLoading(false);
       // }

      //  fetchProducts();
    }, []);

    //SHOPPING CART

    function cartReducer(state, action) {
        if (action.type === "ADD_ITEM") {
            const updatedItems = [...state.items];

            const existingCartItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.id
            );
            
            const existingCartItem = updatedItems[existingCartItemIndex];
            

            console.log(existingCartItem)
            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1
                }
                updatedItems[existingCartItemIndex] = updatedItem;
                setValorTotal(valorTotal + existingCartItem.price)

            } else {
                const product = action.payload.products.find(
                    (i) => i.id === action.payload.id
                );
                updatedItems.push({
                    id: action.payload.id,
                    thumbnail: product.thumbnail,
                    title: product.title,
                    price: product.price,
                    quantity: 1
                })
                setValorTotal(valorTotal + product.price)
            }
            
            return { items: updatedItems };
        }

        if (action.type === "UPDATE_ITEM") {
            const updatedItems = [...state.items];

            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.id
            );

            const updatedItem = { ...updatedItems[updatedItemIndex] }

            setValorTotal(valorTotal - updatedItem.price)

            updatedItem.quantity -= action.payload.amount;
            

            if (updatedItem.quantity < 1) {
                updatedItems.splice(updatedItemIndex, 1);
            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }

            return { ...state, items: updatedItems };
            
        }
        
        return state;
    }

    const [cartState, cartDispatch] = useReducer(
        cartReducer,
        { items: [] }
    );

    function handleAddToCart(id, amount) {
        cartDispatch({
            type: "ADD_ITEM",
            payload: { id, products, amount }
        });
    };

    function handleupdateCartItemQuantity(id, amount) {
        cartDispatch({
            type: "UPDATE_ITEM",
            payload: { id, amount }
        });
    };

    const ctx = {
        items: cartState.items,
        products: products,
        loading: loading,
        error: error,
        valorTotal: valorTotal,
        addItemToCart: handleAddToCart,
        updateItemQuantity: handleupdateCartItemQuantity
    };

    return <CartContext.Provider value={ctx}>
        {children}
    </CartContext.Provider>

} 