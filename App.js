import React from 'react';
import Main from './navigation'

import cartContext, { CartProvider } from './store/cartContext';


function App() {

  return (
    <CartProvider>
      <Main></Main>
    </CartProvider>

  );
}

export default App;