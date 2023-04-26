import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
import { useStateCtx } from "@/context/StateContext";

const Navbar = () => {
    const { showCart, setShowCart, totalQuantities } = useStateCtx();

    return (
        <div className='navbar-container'>
            <p className='logo'>
                <Link href='/'>Headphones Store</Link>
            </p>
            <button
                type='button'
                className='cart-icon'
                onClick={() => setShowCart(true)}
            >
                <AiOutlineShopping />
                <span className='cart-item-qty'>{totalQuantities}</span>
            </button>

            {showCart && <Cart />}
        </div>
    );
};

export default Navbar;
