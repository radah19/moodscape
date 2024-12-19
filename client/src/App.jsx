import { useRoutes } from 'react-router-dom'
import { useState } from 'react';
import HomePage from './pages/HomePage'
import './App.css'
import LoginPage from './pages/LoginPage';

function App() {
  const [user, setUser] = useState(null);
  
  let element = useRoutes([
    {
      path: '/', // Home Path!!!!!
      element: <HomePage user={user}/>
    },
    {
      path: '/login', // Login Path!!!!!
      element: <div><LoginPage setUser={setUser}/></div>
    }
  ]);

  return (
    <div>
      {element}
    </div>
  )
}

export default App;
