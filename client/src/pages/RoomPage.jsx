import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useParams } from "react-router"
import PuffLoader from "react-spinners/PuffLoader";
import SpotifyLinkPlayer from "../components/SpotifyLinkPlayer";
// import { Buffer } from 'buffer';
import CustomizeRoomModal from "../components/CustomizeRoomModal";
import MediaModal from "../components/MediaModal";
import SlideShow from '../components/SlideShow';

const RoomPage = (props) => {
    const {id} = useParams();

    const [roomInfo, setRoomInfo] = useState({id:'', user:'', title:'', color_gradient:'', font:''});
    const [mediaList, setMediaList] = useState([]);
    const [curMedia, setCurMedia] = useState({image:'', text:''});
    const [trackList, setTrackList] = useState([]); // Class Template: {link:''}

    // const [trackInfoList, setTrackInfoList] = useState([]);

    const [curTrack, setCurTrack] = useState(-1);

    const [color1, setColor1] = useState("");
    const [color2, setColor2] = useState("");

    const [customizeRoomModalOpen, setCustomizeRoomModalOpen] = useState(false);
    const [mediaModalOpen, setMediaModalOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            const roomResponse = await fetch(`/api/vibe_rooms_room_id/${id}/`);
            const roomResponseJSON = await roomResponse.json();
            setRoomInfo(roomResponseJSON.result[0]);
            const temp = roomResponseJSON.result[0].color_gradient.split('#');
            const initialColor1 = (temp[1].split(','))[0];
            const initialColor2 = (temp[2].split(')'))[0];
            console.log(initialColor1, initialColor2);
            setColor1("#" + initialColor1);
            setColor2("#" + initialColor2);
            
            const mediaResponse = await fetch(`/api/media/${id}/`); 
            const mediaResponseJSON = await mediaResponse.json();
            setMediaList(mediaResponseJSON.result);
            setCurMedia(mediaResponseJSON.result[0]);

            const trackListResponse = await fetch(`/api/song_links/${id}/`);
            const trackListResponseJSON = await trackListResponse.json();
            setTrackList(trackListResponseJSON.result);

        }

        fetchData();

        setLoading(false);
    }, []);

    const setCustomizeRoomModalCallback = (state) => {
        setCustomizeRoomModalOpen(state);
    }

    const openCustomizeRoomModal = () => {
        setCustomizeRoomModalOpen(true);
    }

    const setMediaModalCallback = (state) => {
        setMediaModalOpen(state);
    }

    const openMediaModal = () => {
        setMediaModalOpen(true);
    }

    const setMediaListCallback = (state) => {
        setMediaList(state);
    }

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
                    
                    <div id="spotify_player">
                        {/* Spotify Player */}
                        <SpotifyLinkPlayer trackList={trackList} setTrackList={setTrackList} curTrack={curTrack} setCurTrack={setCurTrack} />
                    </div>
                    
                    <div id="slideshow">
                        {/* Slideshow */}
                        <SlideShow mediaList={mediaList}/>
                    </div>

                    <div id="customize_room">
                        {/* Button to change Colors, Title, Font */}
                        <button onClick={openCustomizeRoomModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                            </svg>
                        </button>
                        <CustomizeRoomModal
                            open={customizeRoomModalOpen}
                            setModalCallback={setCustomizeRoomModalCallback}
                            initial_title={roomInfo.title}
                            initial_font={roomInfo.font}
                            color1={color1}
                            color2={color2}
                            room_id={parseInt(id)}></CustomizeRoomModal>
                    </div>

                    <div id="add_media">
                        {/* Button to add Media - be it image or quote or something else :3 */}
                        <button onClick={openMediaModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </button>
                        <MediaModal
                            open={mediaModalOpen}
                            setModalCallback={setMediaModalCallback}
                            mediaList={mediaList}
                            setMediaListCallback={setMediaListCallback}
                            room_id={parseInt(id)}></MediaModal>
                    </div>

                </div>
            }
        </div> 
    )
}

RoomPage.propTypes = {
    user: PropTypes.object
};

export default RoomPage;