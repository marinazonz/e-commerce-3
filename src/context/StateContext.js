import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;
    //index of the property we want to update

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(
            (item) => item._id === product._id
        );

        setTotalPrice(
            (prevTotalPrice) => prevTotalPrice + product.price * quantity
        );
        setTotalQuantities(
            (prevTotalQuantities) => prevTotalQuantities + quantity
        );

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id)
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity,
                    };
            });

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart!`);
    };

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newcartItems = cartItems.filter(
            (item) => item._id !== product._id
        );

        setTotalPrice(
            (prevTotalPr) =>
                prevTotalPr - foundProduct.price * foundProduct.quantity
        );
        setTotalQuantities(
            (prevTotalQt) => prevTotalQt - foundProduct.quantity
        );
        setCartItems(newcartItems);
    };

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
        const existingcartItem = cartItems[index];
        let updatedCartItems = [...cartItems];

        if (value === "increment") {
            const updatedItem = {
                ...existingcartItem,
                quantity: foundProduct.quantity + 1,
            };
            updatedCartItems[index] = updatedItem;

            setCartItems(updatedCartItems);

            setTotalPrice(
                (prevtotalPrice) => prevtotalPrice + foundProduct.price
            );
            setTotalQuantities((prevTotalQty) => prevTotalQty + 1);
        } else if (value === "dec") {
            if (foundProduct.quantity > 1) {
                const updatedItem = {
                    ...existingcartItem,
                    quantity: foundProduct.quantity - 1,
                };
                updatedCartItems[index] = updatedItem;

                setCartItems(updatedCartItems);
                setTotalPrice(
                    (prevtotalPrice) => prevtotalPrice - foundProduct.price
                );
                setTotalQuantities((prevTotalQty) => prevTotalQty - 1);
            }
        }
    };

    const incQty = () => {
        setQty((prev) => prev + 1);
    };

    const decQty = () => {
        setQty((prev) => {
            if (prev - 1 < 1) return 1;

            return prev - 1;
        });
    };

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStateCtx = () => useContext(Context);
