import HomeCard from '../components/HomeCard';
import PropTypes from 'prop-types';

const HomePage = ({user}) => {
    return (
        <div>
            <h1>Welcome {user.username}!</h1>
            <HomeCard></HomeCard>
        </div>
    )
}

HomePage.propTypes = {
    user: PropTypes.object
};

export default HomePage;