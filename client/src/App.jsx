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
    if(user.username == defaultUser.username) navigate('/login');
  }

  function rerouteIfLoggedIn(){
    if(user.username != defaultUser.username) navigate('/');
  }
  
  let element = useRoutes([
    {
      path: '/', // Home Path!!!!!
      element: <HomePage user={user} rerouteIfNotLoggedIn={rerouteIfNotLoggedIn}/>
    },
    {
      path: '/login', // Login Path!!!!!
      element: <LoginPage user={user} setUser={setUser} rerouteIfLoggedIn={rerouteIfLoggedIn}/>
    }
  ]);

  return (
    <div>
      {element}
    </div>
  )
}

export default App;
