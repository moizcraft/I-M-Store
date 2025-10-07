import React from 'react'
import Router from '../src/config/Router'
import { CartProvider } from './Context/CartContext'

const App = () => {
  return (
    <div>
      <CartProvider>
        <Router />
      </CartProvider>
    </div>
  )
}

export default App
