import { useState } from "react";

const LoginPage = (setUser) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const authenticateCredentials = async () => {
        console.log(process.env);
        const response = await fetch(`${process.env.BACKEND_URL}/auth?username=${username}&password=${password}`);
        const json = await response.json();

        if(json == 'Oopsy!'){
            //Login Failed!
            console.log('Login failed!');
        } else {
            //Login Success
            console.log('Login success!');
            setUser(json);
            window.location = '/';
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
                                id="username" type="text" placeholder="Username" onChange={(e) => setUsername(e)}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="bg-white shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e)}
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

export default LoginPage;