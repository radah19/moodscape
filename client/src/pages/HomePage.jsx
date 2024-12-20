import { useEffect } from 'react';
import HomeCard from '../components/HomeCard';
import PropTypes from 'prop-types';

const HomePage = ({user, rerouteIfNotLoggedIn}) => {
    useEffect(() => {
        rerouteIfNotLoggedIn();
    }, [user]);

    return (
        <div>
            <h1>Welcome {user.f_name}!</h1>
            <HomeCard></HomeCard>
        </div>
    )
}

HomePage.propTypes = {
    user: PropTypes.object,
    rerouteIfNotLoggedIn: PropTypes.func
};

export default HomePage;