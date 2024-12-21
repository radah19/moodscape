import { useRoutes, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import HomePage from './pages/HomePage'
import './App.css'
import LoginPage from './pages/LoginPage';
import Cookies from 'js-cookie';

function App() {
  const cachedUser = Cookies.get('user');
  const defaultUser = {
    username:'', email:'', f_name:'', l_name:''
  }
  const [user, setUser] = useState((cachedUser == undefined) ? defaultUser : JSON.parse(cachedUser));
  const navigate = useNavigate();

  function rerouteIfNotLoggedIn(){
    if(user == defaultUser) navigate('/login');
  }
  
  let element = useRoutes([
    {
      path: '/', // Home Path!!!!!
      element: <HomePage user={user} rerouteIfNotLoggedIn={rerouteIfNotLoggedIn}/>
    },
    {
      path: '/login', // Login Path!!!!!
      element: <LoginPage setUser={setUser}/>
    }
  ]);

  return (
    <div>
      {element}
    </div>
  )
}

export default App;
