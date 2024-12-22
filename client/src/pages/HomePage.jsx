import { useEffect, useState } from 'react';
import HomeCard from '../components/HomeCard';
import './HomePage.css';
import PropTypes from 'prop-types';
import Cookies from "js-cookie"

const HomePage = ({user, rerouteIfNotLoggedIn}) => {

    const [userVibeRooms, setUserVibeRooms] = useState([]);

    useEffect(() => {
        rerouteIfNotLoggedIn();
        fetchVibeRooms();
    }, [user]);


    const fetchVibeRooms = async () => {
        try {
            const data = await fetch(`/api/vibe_rooms_user_id/${user.username}/`);
            const rooms = await data.json();
            setUserVibeRooms(rooms.result);
        }
        catch (e) {
            console.error(e);
        }
    }


    return (
        <div className="vibeBarContainer">
            <h1>Welcome {user.f_name}!</h1>
            {userVibeRooms.map((room) => (
                <HomeCard key={room.id} title={room.title} font={room.font} color_gradient={room.color_gradient}></HomeCard>
            ))}
        </div>
    )
}

HomePage.propTypes = {
    user: PropTypes.object,
    rerouteIfNotLoggedIn: PropTypes.func
};

export default HomePage;