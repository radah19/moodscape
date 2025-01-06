import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import validator from 'validator';
import { Buffer } from 'buffer';

const SpotifyLinkPlayer = (props) => {
    const [curIndex, setCurIndex] = useState(0);
    const [hidePlaylist, setHidePlaylist] = useState(true);

    const [addingElem, setAddingElem] = useState(false);
    const [loading, setLoading] = useState(false);
    const [spotLinkInputBox, setSpotLinkInputBox] = useState("");

    const [cookies, setCookies] = useState( (Cookies.get('spotify_cookies') != undefined) ? JSON.parse(Cookies.get('spotify_cookies')) : false );
    const [toastOpen, setToastOpen] = useState( (Cookies.get('toastOpen') != undefined) ? JSON.parse(Cookies.get('toastOpen')) : true );

    const [trackInfoList, setTrackInfoList] = useState([]);

    const embedRef = useRef(null);
    const embedControllerRef = useRef(null);

    useEffect(() => {
        // Bounce if tracklist is empty
        if(!props.trackList[0]){
            return;
        }

        // Load the Spotify IFrame API script
        const script = document.createElement("script");
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;
        document.body.appendChild(script);

        // Initialize the API when the script loads
        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = document.getElementById('embed-iframe');
            const options = {
                height:'80',
                uri: getURIFromSpotifyLink(props.trackList[0].song_link)
            };

            const callback = (EmbedController) => {
                embedControllerRef.current = EmbedController;
                
                // Add listeners for player events
                EmbedController.addListener('playback_update', e => {
                    // console.log('Playback update:', e);
                    if(e.data.position >= e.data.duration){
                        document.getElementById('spot-forward-button').click();
                    }
                });

                // EmbedController.addListener('ready', () => {
                //     // console.log('Embed ready');
                // });
            };

            IFrameAPI.createController(element, options, callback);
        };

        // Get track details & put them into an array
        async function getTrackDetails(arr) {

            const access_token = await getAccessToken();

            const temp_arr = Array(arr.length);

            arr.forEach(async (track, ind) => {

                const temp = track.song_link.split('/');
                const track_id = temp[temp.length - 1];

                try {
                    const response = await fetch(`https://api.spotify.com/v1/tracks/${track_id}`, {
                        method: 'GET',
                        headers: { 'Authorization': 'Bearer ' + access_token },
                    });

                    if (response.status == 400) { // track not found

                        console.log("Track not found!");

                        // temp_arr.push({
                        //     id: track.id,
                        //     name: "Oops", 
                        //     song_link: track.song_link,
                        //     img: "https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        // });
                        
                    } else {
                        const responseJSON = await response.json();
        
                        temp_arr[ind] = {
                            id: track.id,
                            name: responseJSON.name, 
                            song_link: track.song_link,
                            img: responseJSON.album.images[0].url
                        };
                    }
                }

                catch (e) {
                    console.log(e);
                };
            });
            
            console.log(temp_arr);
            return temp_arr;
        }



        // Function to get track info array and set trackInfoList to the returned array
        async function fetchTrackInfo() {
            const data = await getTrackDetails(props.trackList);
            setTrackInfoList(data);
        }
        fetchTrackInfo();



        // Cleanup
        return () => {
            document.body.removeChild(script);
        };
    }, [props]);

    
    // Get spotify access token
    const getAccessToken = async () => {
        const credentials = Buffer.from(`${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.
        env.VITE_SPOTIFY_CLIENT_SECRET}`).toString('base64');
    
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

        return data;
    }


    function getURIFromSpotifyLink(link){
        // I'll have to assume I've been given a spotify link..
        if(!validator.isURL(link))
            return link;

        let str = link;
        str = str.replace("https://open.spotify.com/", "spotify:");
        str = str.replace("/", ":");
        if(str.indexOf('?') != -1)
            str = str.slice(0, str.indexOf('?'));

        return str;
    }

    function loadURI(uri) {
        if (embedControllerRef.current) {
            embedControllerRef.current.loadUri(uri);
            embedControllerRef.current.play();
        }
    };

    function nextTrack() {
        let temp = curIndex+1;
        if(temp >= trackInfoList.length)
            temp = 0;

        setCurIndex(temp);
        loadURI(getURIFromSpotifyLink(trackInfoList[temp].song_link));
    }

    function prevTrack() {
        let temp = curIndex-1;
        if(temp < 0)
            temp = trackInfoList.length-1;

        setCurIndex(temp);
        loadURI(getURIFromSpotifyLink(trackInfoList[temp].song_link));
    }

    async function addNewTrack(link){
        const access_token = await getAccessToken();
        
        const temp = link.split('/');
        const track_id = temp[temp.length - 1];

        // Fetch Details about the Link
        const response = await fetch(`https://api.spotify.com/v1/tracks/${track_id}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token },
        });

        if (response.status == 400) { // track not found
            // Toast to say "Spotify track was not found! Please enter a valid link 😁"
        } else {
            const responseJSON = await response.json();
            // Post Request to add it in DB
            const csrfToken = Cookies.get('csrftoken');
            const postResponse = await fetch(`/api/song_links/${props.room_id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({
                    link:link
                })     
            });
            const json = await postResponse.json();

            // Update Front End if Link is valid!
            setTrackInfoList([...trackInfoList, {
                id: json.result[0].id,
                name: responseJSON.name, 
                song_link: link,
                img: responseJSON.album.images[0].url
            }]);            
        }

        setLoading(false);
        setAddingElem(false);
    }

    const shuffleTracklist = () => {
        const newArr = trackInfoList.sort( () => Math.random()-0.5 );
        setTrackInfoList([...newArr]);
        setCurIndex(0);
        loadURI(getURIFromSpotifyLink(trackInfoList[curIndex].song_link));
    }


    const initializeEmbed = () => {

        Cookies.set('spotify_cookies', true);
        Cookies.set('toastOpen', false);
        closeToast();

        window.location.reload();
        
    }

    const closeToast = () => {
        setToastOpen(false);
    };

    const enableCookies = () => {
        setCookies(true);
        initializeEmbed();
    };

    console.log(trackInfoList);

    return (

        <div>

            <div className="w-80 max-w-xl flex justify-center items-center flex-col">
            
                <div className="w-full rounded-t-xl bg-green-500">
                    <div id="embed-iframe" ref={embedRef} allow={`encrypted-media; autoplay; clipboard-write${cookies ? "; set-cookies" : ""}`}/>
                </div>

                <div className="w-full">
                    {/* Options */}
                    <div className="flex h-6">
                        {/* Playlist Toggle */}
                        <button className="w-full px-4 py-2 bg-green-500 text-white rounded-none hover:bg-green-600 flex justify-center items-center" onClick={() => {setHidePlaylist(!hidePlaylist);}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
                            </svg>
                        </button>

                        {/* Shuffle Function */}
                        <button className="w-full px-4 py-2 bg-green-500 text-white rounded-none hover:bg-green-600 flex justify-center items-center" onClick={shuffleTracklist}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                            </svg>
                        </button>

                        {/* Forward One Song */}
                        <button className="w-full px-4 py-2 bg-green-500 text-white rounded-none hover:bg-green-600 flex justify-center items-center" onClick={() => {prevTrack()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                            </svg>
                        </button>

                        {/* Back to Previous Song */}
                        <button className="w-full px-4 py-2 bg-green-500 text-white rounded-none hover:bg-green-600 flex justify-center items-center" onClick={() => {nextTrack()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                            </svg>
                        </button>
                    </div>

                    {/* Playlist */}
                    {
                        hidePlaylist ? <div></div> :
                        <div className="bg-slate-900 rounded-b-lg overflow-scroll h-44">
                            {
                                trackInfoList.map((elem, ind) => 
                                    <div key={elem.id} className="flex">

                                        <div className="mr-2 p-1">
                                            <img className="border-solid border-2 border-white h-12 w-12" src={elem.img} />
                                        </div>

                                        <p className="text-white content-center">{elem.name}</p>
                                        
                                        <button className="ml-auto mr-4" onClick={() => {
                                            if(curIndex != ind){
                                                loadURI(getURIFromSpotifyLink(elem.song_link));
                                                setCurIndex(ind);
                                            }
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={(curIndex == ind) ? "rgb(74 222 128)" : "white"} className="size-6">
                                                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                            </svg>
                                        </button>

                                    </div>
                                )
                            }
                            
                            <div className="h-14 flex justify-center items-center">
                            {
                                addingElem ?
                                // Input Box to Add Element
                                    loading ? 
                                    // Loading Bar
                                    <div>
                                        <svg className="animate-spin ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div> :
                                    // Input Box for Spotify Link
                                    <div className="w-full flex flex-col justify-center items-center text-xs mx-2">
                                        <input className="shadow px-2 appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                                id="spotify_link_input" type="text" placeholder="Enter a Spotify Link" onChange={(e)=>setSpotLinkInputBox(e.target.value)}></input>
                                        <div className="w-full flex mt-1 mx-2">
                                            <button className="w-full ml-16 rounded-lg bg-green-500 text-white hover:bg-green-600 flex justify-center items-center" onClick={() => {setLoading(true); addNewTrack(spotLinkInputBox);}}>Submit</button>
                                            <button className="w-full mr-16 ml-1 rounded-lg bg-red-500 text-white hover:bg-red-600 flex justify-center items-center" onClick={() => {setAddingElem(false);}}>Cancel</button>
                                        </div>
                                    </div>
                                :
                                // Add Button
                                <button onClick={() => {setAddingElem(true)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(100 116 139)" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </button>
                            }
                            </div>

                        </div>
                    }
                </div>

            </div>

            {/* Toast */}
            <div style={{visibility:`${toastOpen ? "visible" : "hidden"}`}}>
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
            </div>


        </div>
    );
}

SpotifyLinkPlayer.propTypes = {
    cookies: PropTypes.bool,
    trackList: PropTypes.array,
    setTrackList: PropTypes.func,
    room_id: PropTypes.number,
}

export default SpotifyLinkPlayer;