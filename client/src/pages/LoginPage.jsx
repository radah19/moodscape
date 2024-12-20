import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const LoginPage = ({setUser}) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authenticateCredentials = async () => {
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

            const response = await fetch(`/api/auth/`, options);
            const json = await response.json();

            if(json == 'Oopsy!'){
                //Login Failed!
                console.log('Login failed!');
            } else {
                //Login Success!
                console.log('Login success!');
                setUser(json);
                navigate("/");
            }

        } catch (e) {
            console.error('Error in authentication: ', e);
        }
    }

    return (
        <div style={{width:'600px', alignSelf:'center'}}>
            <div className="w-full">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

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
                        <input className="bg-white shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">

                    {/* Sign in Button */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={authenticateCredentials}>
                        Sign In
                    </button>

                    {/* Forgot Password */}
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>

                    </div>
                </form>
            </div>
        </div>
    )
}

LoginPage.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func.isRequired
};

export default LoginPage;