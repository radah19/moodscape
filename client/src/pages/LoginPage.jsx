import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const LoginPage = ({setUser}) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [loading, setLoading] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);

    const authenticateCredentials = async () => {
        setLoading(true);
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
                setErrorMsg('Incorrect username/password, please try again!');
                setShowErrorMsg(true);
            } else {
                //Login Success!
                console.log('Login success!');
                setUser(json);
                Cookies.set('user', JSON.stringify({...json, password: password}), { expires: 1 });
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
        <div className="w-96">
            <form className={"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" + (showErrorMsg ? " border border-red-500" : "")}>

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
                {   loading ? 
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled" type="button" >
                        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"/>
                    </button> :             
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={authenticateCredentials}>
                        Sign In
                    </button>
                }

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
    setUser: PropTypes.func.isRequired
};

export default LoginPage;