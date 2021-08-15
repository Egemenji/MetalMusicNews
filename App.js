import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import Main from './navigation'

import { CartProvider } from './store/cartContext';
import { LoginProvider } from './store/loginContext';




function App() {



  return (
    <LoginProvider>
      <CartProvider>
        <Main></Main>
      </CartProvider>
    </LoginProvider>


  );
}

export default App;