import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { Store } from '../src/store'
import Header from './components/Header.jsx'
import Product from './components/product.jsx'
import Home from './components/Home.jsx'
import CartPage from './components/Cart.jsx'
import LoginPage from './components/Login.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path:'product/:productId',
    element: <Product />
  },
  {
    path:'cart',
    element: <CartPage />
  },
  {
    path:'login',
    element: <LoginPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router}/>
  </Provider>,
)
