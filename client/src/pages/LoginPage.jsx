import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import validator from 'validator';
import { apiClient } from "../../client";

const LoginPage = ({user, setUser, rerouteIfLoggedIn}) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [loading, setLoading] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);

    const cookieOptions = {
        expires: 1,        
        secure: true,
        sameSite: 'Strict',
        path: '/'
    };

    useEffect(() => {
        rerouteIfLoggedIn();
    }, [user]);

    const authenticateCredentials = async () => {
        setLoading(true);

        // Input Validation ----------------------------------------------------------------------------

        //Blank Fields or Fields too large
        if(username == '' || password == ''){
            setErrorMsg('Please fill in all the fields before signing in');
            setShowErrorMsg(true);
            setLoading(false);
            return;
        }

        if(username.length > 255 || password.length > 255){
            setErrorMsg('One or more fields is too large! Max character length is 255');
            setShowErrorMsg(true);
            setLoading(false);
            return;
        }

        //Username or password contain spaces/quotes
        if( validator.contains(username, " ") || validator.contains(username, "\"") || validator.contains(username, "'") ||
            validator.contains(password, " ") || validator.contains(password, "\"") || validator.contains(password, "'")){
            setErrorMsg('Username/Password cannot contain spaces or quotes');
            setShowErrorMsg(true);
            setLoading(false);
            return;
        }
                
        // All validation passed! ----------------------------------------------------------------------------
        setShowErrorMsg(false);
        
        const csrfToken = Cookies.get('csrftoken');

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({username: username, password: password})     
        }

        try {
            const response = await apiClient.fetch(`/auth/`, options);
            const json = await response.json();
            
            if(json == 'Oopsy!'){
                //Login Failed!
                console.log('Login failed!');
                setErrorMsg('Incorrect username/password, please try again!');
                setShowErrorMsg(true);
            } else {
                //Login Success!
                console.log('Login success!');
                setUser(json);
                Cookies.set('user', JSON.stringify({...json, password: password}), cookieOptions);
                Cookies.set('csrftoken', json.csrftoken, cookieOptions);
                navigate("/");
            }
            
            setLoading(false);
        } catch (e) {
            console.error('Error in authentication: ', e);
            setErrorMsg('Login Authentication Service failed, please try again!');
            setShowErrorMsg(true);
            setLoading(false);
        }
    }

    return (
        <div style={{width:'30rem'}}>
            <form className={"bg-white shadow-md text-left rounded px-8 pt-6 pb-8 mb-4" + (showErrorMsg ? " border border-red-500" : "")}>

                {/* Username Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Password Field */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                            id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {showErrorMsg ? <p className="mb-6 text-red-500 text-xs italic">{errorMsg}</p> : <></>}

                <div className="flex items-center justify-between">

                {/* Sign in Button */}
                <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={authenticateCredentials}>
                    Sign In
                    {
                        loading ? 
                        <svg className="animate-spin ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> : <></>
                    }
                </button>

                {/* Create Account Button */}
                <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => {navigate(`/create_account`)}}>
                    Create Account
                </button>
                
                {/* Forgot Password */}
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                </a>

                </div>
            </form>
        </div>
    )
}

LoginPage.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func.isRequired,
    rerouteIfLoggedIn: PropTypes.func
};

export default LoginPage;