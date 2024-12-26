import { useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import PuffLoader from "react-spinners/PuffLoader";

const VerifyCachedUserPage = ({setVerifyingCachedUser, setUser}) => {
    const navigate = useNavigate();

    const cookieOptions = {
        expires: 1,        
        secure: true,
        sameSite: 'Strict',
        path: '/'
    };

    useEffect(() => {
        authenticateCredentials();
    }, []);

    const authenticateCredentials = async () => {
        const userInCookies = Cookies.get('user');

        if(userInCookies != undefined){
            // Cookies do exist!
            const cachedUser = JSON.parse(userInCookies);

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': cachedUser.csrfToken
                },
                body: JSON.stringify({username: cachedUser.username, password: cachedUser.password})     
            }

            try {

                const response = await fetch(`/api/auth/`, options);
                const json = await response.json();

                if(json == 'Oopsy!'){
                    //Login Failed!
                    console.log('Login failed!');
                    navigate("/login");
                } else {
                    //Login Success!
                    console.log('Login success!');
                    setUser(cachedUser);

                    // Reset the cookies to take another day to expire
                    Cookies.set('user', JSON.stringify(cachedUser), cookieOptions);
                    Cookies.set('csrftoken', cachedUser.csrftoken, cookieOptions);
                }
                
            } catch (e) {
                console.error('Error in authentication: ', e);
            }

        } else {
            // No cookies were found! Oops!
            navigate("/login");
        }

        setVerifyingCachedUser(false);
    }

    return (
        <div>
            <PuffLoader
                color={"#FF74BC"}
                loading={true}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

VerifyCachedUserPage.propTypes = {
    setVerifyingCachedUser: PropTypes.func,
    setUser: PropTypes.func
};

export default VerifyCachedUserPage;