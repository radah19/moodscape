import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router"
import PuffLoader from "react-spinners/PuffLoader";
import SpotifyLinkPlayer from "../components/SpotifyLinkPlayer";

const RoomPage = (props) => {
    const {id} = useParams();

    const [roomInfo, setRoomInfo] = useState({title:'', color_gradient:'', font:''});
    const [mediaList, setMediaList] = useState([]);
    const [curMedia, setCurMedia] = useState({image:'', text:''});
    const [trackList, setTrackList] = useState([]); // Class Template: {link:''}
    const [curTrack, setCurTrack] = useState(-1);

    const tempMediaLs = [
        {
            id:1, 
            name:"lalala", 
            link:"https://open.spotify.com/track/7Jnmgy3B3QK4DaTToC5Ejs", 
            img:"https://images.unsplash.com/photo-1610177498573-78deaa4a797b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id:2, 
            name:"Vengegrov!!!", 
            link:"https://open.spotify.com/track/6JuCYAloN3d0KCAaBaovxO",
            img:"https://plus.unsplash.com/premium_photo-1676299910876-747eeb0c11dc?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id:3, 
            name:"lalala", 
            link:"https://open.spotify.com/track/7Jnmgy3B3QK4DaTToC5Ejs", 
            img:"https://images.unsplash.com/photo-1610177498573-78deaa4a797b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id:4, 
            name:"Raching ma Inoff", 
            link:"https://open.spotify.com/track/7Jnmgy3B3QK4DaTToC5Ejs",
            img:"https://plus.unsplash.com/premium_photo-1676299910876-747eeb0c11dc?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id:5, 
            name:"lalala", 
            link:"https://open.spotify.com/track/7Jnmgy3B3QK4DaTToC5Ejs", 
            img:"https://images.unsplash.com/photo-1610177498573-78deaa4a797b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id:6, 
            name:"Raching ma Inoff", 
            link:"https://open.spotify.com/track/7Jnmgy3B3QK4DaTToC5Ejs",
            img:"https://plus.unsplash.com/premium_photo-1676299910876-747eeb0c11dc?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

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
            setTrackList(tempMediaLs); //DELETE THIS WHEN TRACK ADDING FUNCTIONAILITY IS IN PLACE
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
                <div id="spotify_player">
                    <SpotifyLinkPlayer trackList={trackList} setTrackList={setTrackList} curTrack={curTrack} setCurTrack={setCurTrack} />

                </div>
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