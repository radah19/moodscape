import { useState } from 'react'
import { useRoutes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  let element = useRoutes([
    {
    path: '/', // Home Path!!!!!
    element: <div><p>I like Momo cafe!!!</p></div>
    },
    {
      path: '/login', // Login Path!!!!!
      element: <div><p>I HATE momo cafe 🤮</p></div>
    }
  ]);

  return (
    <div>
      {element}
    </div>
  )
}

export default App;
