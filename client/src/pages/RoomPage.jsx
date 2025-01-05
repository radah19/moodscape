import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router"
import PuffLoader from "react-spinners/PuffLoader";
import SpotifyLinkPlayer from "../components/SpotifyLinkPlayer";
import { Buffer } from 'buffer';

const RoomPage = (props) => {
    const {id} = useParams();

    const [roomInfo, setRoomInfo] = useState({title:'', color_gradient:'', font:''});
    const [mediaList, setMediaList] = useState([]);
    const [curMedia, setCurMedia] = useState({image:'', text:''});
    const [trackList, setTrackList] = useState([]); // Class Template: {link:''}

    const [trackInfoList, setTrackInfoList] = useState([]);

    const [curTrack, setCurTrack] = useState(-1);

    // const tempMediaLs = [
    //     {
    //         id:1, 
    //         name:"lalala", 
    //         link:"https://open.spotify.com/track/7Jnmgy3B3QK4DaTToC5Ejs", 
    //         img:"https://images.unsplash.com/photo-1610177498573-78deaa4a797b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     },
    //     {
    //         id:2, 
    //         name:"Vengegrov!!!", 
    //         link:"https://open.spotify.com/track/6JuCYAloN3d0KCAaBaovxO",
    //         img:"https://plus.unsplash.com/premium_photo-1676299910876-747eeb0c11dc?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     },
    //     {
    //         id:3, 
    //         name:"lalala", 
    //         link:"https://open.spotify.com/track/7Jnmgy3B3QK4DaTToC5Ejs", 
    //         img:"https://images.unsplash.com/photo-1610177498573-78deaa4a797b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     },
    //     {
    //         id:4, 
    //         name:"Raching ma Inoff", 
    //         link:"https://open.spotify.com/track/7Jnmgy3B3QK4DaTToC5Ejs",
    //         img:"https://plus.unsplash.com/premium_photo-1676299910876-747eeb0c11dc?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     },
    //     {
    //         id:5, 
    //         name:"lalala", 
    //         link:"https://open.spotify.com/track/7Jnmgy3B3QK4DaTToC5Ejs", 
    //         img:"https://images.unsplash.com/photo-1610177498573-78deaa4a797b?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     },
    //     {
    //         id:6, 
    //         name:"Raching ma Inoff", 
    //         link:"https://open.spotify.com/track/7Jnmgy3B3QK4DaTToC5Ejs",
    //         img:"https://plus.unsplash.com/premium_photo-1676299910876-747eeb0c11dc?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     }
    // ];

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
        }

        fetchData();

        const getAccessToken = async () => {
            const credentials = Buffer.from(`${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`).toString('base64');
        
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials'
                })
            });

            const responseJSON = await response.json();
            const data = await responseJSON.access_token;

            console.log(data);

            return data;
        }

        async function getTrackDetails(access_token, song_id, track_link) {
            const temp = track_link.split('/');
            const track_id = temp[temp.length - 1];

            console.log(track_link);
            console.log(track_id);

            try {
                const response = await fetch(`https://api.spotify.com/v1/tracks/${track_id}`, {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                });

                if (response.status == 404) { // track not found

                    console.log("Track not found!");

                    setTrackInfoList([...trackInfoList, {
                        id: song_id,
                        name: "Oops", 
                        link: track_link,
                        img: "https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }])
                    
                } else {
                    const responseJSON = await response.json();

                    console.log(responseJSON.album.images[0].url);
    
                    setTrackInfoList([...trackInfoList, {
                        id: song_id,
                        name: responseJSON.name, 
                        link: track_link,
                        img: responseJSON.album.images[0].url
                    }]);
                }
            }

            catch (e) {
                console.log(e);
            }
        }

        getAccessToken().then((token) => {
            trackList.forEach((track) => {
                getTrackDetails(token, track.id, track.song_link);
            });
        })

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
                    <SpotifyLinkPlayer trackList={trackInfoList} setTrackList={setTrackInfoList} curTrack={curTrack} setCurTrack={setCurTrack} />

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