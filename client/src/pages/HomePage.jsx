import { useEffect, useState } from 'react';
import HomeCard from '../components/HomeCard';
import CreateCardModal from '../components/CreateCardModal';
import './HomePage.css';
import PropTypes from 'prop-types';

const HomePage = ({user}) => {

    const [userVibeRooms, setUserVibeRooms] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
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

    const setModalCallback = (state) => {
        setModalOpen(state);
    }

    const openModal = () => {
        setModalOpen(true);
    }

    return (
        <div className="vibeBarContainer">
            <h1>Welcome {user.f_name}!</h1>
            {userVibeRooms.map((room) => (
                <HomeCard key={room.id} title={room.title} font={room.font} color_gradient={room.color_gradient}></HomeCard>
            ))}
            <button onClick={openModal} className="bg-white shadow-md border-transparent! transition-transform transform duration-200 hover:scale-125 hover:shadow-xl" id="addCard">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            </button>
            <CreateCardModal setModalCallback={setModalCallback} open={modalOpen} username={user.username} setModalOpen={setModalOpen}
                                userVibeRooms={userVibeRooms} setUserVibeRooms={setUserVibeRooms}/>
        </div>
    )
}

HomePage.propTypes = {
    user: PropTypes.object,
    rerouteIfNotLoggedIn: PropTypes.func
};

export default HomePage;