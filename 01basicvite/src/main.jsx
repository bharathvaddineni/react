import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const areactElement = React.createElement(
    'a',
    { href: 'https://www.google.com',target: "_blank" },
    'Click to visit google'
)
ReactDOM.createRoot(document.getElementById('root')).render(
  
    <>
          <App/>
    {areactElement}
    </>
  
  
)
