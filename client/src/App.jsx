import { useRoutes, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import HomePage from './pages/HomePage'
import './App.css'
import LoginPage from './pages/LoginPage';
import VerifyCachedUserPage from './pages/VerifyCachedUserPage';
import RoomPage from './pages/RoomPage';
import CreateAccountPage from './pages/CreateAccountPage';

function App() {
  const defaultUser = {
    username:'', email:'', f_name:'', l_name:''
  }

  const [user, setUser] = useState(defaultUser);
  const [verifyingCachedUser, setVerifyingCachedUser] = useState(true);
  const navigate = useNavigate();

  function rerouteIfLoggedIn(){
    if(user.username != defaultUser.username) navigate('/');
  }
  
  let element = useRoutes([
    {
      path: '/', // Home Path!!!!!
      element: <HomePage user={user} />
    },
    {
      path: '/login', // Login Path!!!!!
      element: <LoginPage user={user} setUser={setUser} rerouteIfLoggedIn={rerouteIfLoggedIn}/>
    },
    {
      path: '/create_account', // Create Account Path!!!!!
      element: <CreateAccountPage user={user} setUser={setUser} rerouteIfLoggedIn={rerouteIfLoggedIn}/>
    },
    {
      path: '/room/:id', // Room Path!!!!!
      element: <RoomPage user={user} />
    },
    {
      path: '*', // 404 Page!!!!!!!! Oopsy 😋
      element: <div><p>No Page Found! Oops!</p></div>
    }
  ]);

  return (
    <div className="w-full justify-center flex flex-row">
      { verifyingCachedUser ? 
        <VerifyCachedUserPage setVerifyingCachedUser={setVerifyingCachedUser} setUser={setUser}/> 
        : element
      }
    </div>
  )
}

export default App;
