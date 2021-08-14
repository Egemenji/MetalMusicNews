
import React, { createContext, useState } from 'react';
const cartContext = createContext(null);



export const CartProvider = ({children}) =>{

    const [cart, setCart] = useState([]);
    const values = {
        cart,
        setCart,
    }

    return <cartContext.Provider children={children} value={values}></cartContext.Provider>
}


export default cartContext;