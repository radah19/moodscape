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

    const [loading, setLoading] = useState(false);

    // const [cookies, setCookies] = useState(false);
    // const [toastOpen, setToastOpen] = useState(true);
    
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


    // const closeToast = () => {
    //     setToastOpen(false);
    // };

    // const enableCookies = () => {
    //     setCookies(true);
    //     setToastOpen(false);
    // };


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

                    {/* <div style={{visibility:`${toastOpen ? "visible" : "hidden"}`}}>
                    <div id="toast-interactive" className="w-3/4 max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400 my-3" role="alert">
                        <div className="flex">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
                                <div>🍪</div>
                                <span className="sr-only">Cookie icon</span>
                            </div>
                            <div className="ml-2 text-sm font-normal">
                                <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Cookies</span>
                                <div className="mb-2 text-sm font-normal">Enable cookies to listen to full tracks?</div> 
                                <div className="grid grid-cols-2 gap-2 place-items-center">
                                    <button onClick={enableCookies} className="mt-0 inline-flex justify-center rounded-md bg-pink-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 sm:ml-3 w-3/4 hover:text-white">
                                        Yes
                                    </button>
                                    <button onClick={closeToast} className="mt-0 inline-flex justify-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 w-5/6 hover:text-black">
                                        No
                                    </button>
                                </div>    
                            </div>
                            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-interactive" aria-label="Close">
                                <span className="sr-only" onClick={closeToast}>Close</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    </div> */}

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