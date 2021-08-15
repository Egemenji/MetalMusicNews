
import React, { createContext, useState } from 'react';
const loginContext = createContext(null);


export const LoginProvider = ({children}) =>{

    const [loginView, setLoginView] = useState(true);

    const values = {
        loginView,
        setLoginView
    }
    

    return <loginContext.Provider children={children} value={values}></loginContext.Provider>
}


export default loginContext;