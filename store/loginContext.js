
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';
const loginContext = createContext(null);



export const LoginProvider = ({children}) =>{

    const [loginView, setLoginView] = useState();

    AsyncStorage.getItem('loginStatus').then((data) => {

        if (data == 1) {         
            setLoginView(0);
        }
        else {
            setLoginView(1)
        }
    })


    const values = {
        loginView,
        setLoginView
    }
    

    return <loginContext.Provider children={children} value={values}></loginContext.Provider>
}


export default loginContext;