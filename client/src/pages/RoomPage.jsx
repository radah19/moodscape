import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router"
import PuffLoader from "react-spinners/PuffLoader";

const RoomPage = (props) => {
    const {id} = useParams();

    const [roomInfo, setRoomInfo] = useState({title:'', color_gradient:'', font:''});
    const [mediaList, setMediaList] = useState([]);
    const [curMedia, setCurMedia] = useState({image:'', text:''});
    const [trackList, setTrackList] = useState([]);
    const [curTrack, setCurTrack] = useState({link:''});

    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            const roomResponse = await fetch(`/api/vibe_rooms_room_id/${id}/`);
            const roomResponseJSON = await roomResponse.json(); 
            setRoomInfo(roomResponseJSON.result);
            
            const mediaResponse = await fetch(`/api/media/${id}/`); 
            const mediaResponseJSON = await mediaResponse.json();
            setMediaList(mediaResponseJSON.result);
            setCurMedia(mediaResponseJSON.result[0]);

            const trackListResponse = await fetch(`/api/song_links/${id}/`); 
            const trackListResponseJSON = await trackListResponse.json();
            setTrackList(trackListResponseJSON.result);
            setCurTrack(trackListResponseJSON.result[0]);
        }

        fetchData();
        setLoading(false);
    }, []);

    return (
        <div>
        {
            loading ?
                <PuffLoader
                    color={"#FF74BC"}
                    loading={true}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            :
            <div>
                {/* Spotify Player */}
                <div id="spotify_player"> </div>
                {/* Slideshow */}
                <div id="slideshow"></div>
                {/* Button to change Colors, Title, Font */}
                <button id="customize_room"></button>
                {/* Button to add Media - be it image or quote or something else :3 */}
                <button id="add_media"></button>
            </div>
        }
        </div> 
    )
}

RoomPage.propTypes = {
    user: PropTypes.object
};

export default RoomPage;