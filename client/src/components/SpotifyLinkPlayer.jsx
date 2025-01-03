import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
// import { Spotify } from 'react-spotify-embed';

const SpotifyLinkPlayer = (props) => {
    const [spotifyLink, setSpotifyLink] = useState("https://open.spotify.com/track/6cT2EfDtHeBkZR7e4cCSY5");

    const [cookies, setCookies] = useState(JSON.parse(Cookies.get('spotify_cookies', false)));
    const [toastOpen, setToastOpen] = useState(JSON.parse(Cookies.get('toastOpen', true)));

    const embedRef = useRef(null);
    const embedControllerRef = useRef(null);

    useEffect(() => {
        // Load the Spotify IFrame API script
        const script = document.createElement("script");
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;
        document.body.appendChild(script);

        // Initialize the API when the script loads
        window.onSpotifyIframeApiReady = (IFrameAPI) => {

            console.log(toastOpen);
            console.log(cookies);

            const element = document.getElementById('embed-iframe');
            const options = {
                width: '100%',
                height: '150',
                uri: spotifyLink
            };

            const callback = (EmbedController) => {
                embedControllerRef.current = EmbedController;
                
                // Add listeners for player events
                EmbedController.addListener('playback_update', e => {
                    console.log('Playback update:', e);
                });

                EmbedController.addListener('ready', () => {
                    console.log('Embed ready');
                });
            };

            IFrameAPI.createController(element, options, callback);
        };

        // Cleanup
        return () => {
            document.body.removeChild(script);
        };
    }, []);


    const initializeEmbed = () => {

        Cookies.set('spotify_cookies', true);
        Cookies.set('toastOpen', false);
        closeToast();

        window.location.reload();

        // const element = document.getElementById('embed-iframe');

        // console.log(embedControllerRef);
        // if (embedControllerRef.current) {
        //     embedControllerRef.current.destroy();
        //     console.log(embedControllerRef.current);
        // }

        // window.onSpotifyIframeApiReady = (IFrameAPI) => {

        //     console.log(cookies);

        //     const options = {
        //         width: '100%',
        //         height: '150',
        //         uri: spotifyLink
        //     };

        //     const callback = (EmbedController) => {
        //         embedControllerRef.current = EmbedController;
                
        //         // Add listeners for player events
        //         EmbedController.addListener('playback_update', e => {
        //             console.log('Playback update:', e);
        //         });

        //         EmbedController.addListener('ready', () => {
        //             console.log('Embed ready');
        //         });
        //     };

        //     IFrameAPI.createController(element, options, callback);
            
        //     console.log(embedRef.current.getAttribute('allow'));
        // };
        
    }

    const togglePlay = () => {
        if (embedControllerRef.current) {
            embedControllerRef.current.togglePlay();
        }
    };

    const toggleStop = () => {
        if (embedControllerRef.current) {
            embedControllerRef.current.pause();
        }
    };

    const newLink = () => {
        if (embedControllerRef.current) {
            embedControllerRef.current.loadUri('spotify:track:0xPQY512qhU5uEZuptw1jP');
        }
    };

    const closeToast = () => {
        setToastOpen(false);
    };

    const enableCookies = () => {
        setCookies(true);
        initializeEmbed();
    };

    return (
        <div className="w-full max-w-xl">


            <div id="embed-iframe" ref={embedRef} allow={`encrypted-media; autoplay; clipboard-write${cookies ? "; set-cookies" : ""}`} className="rounded-lg"/>
            <div className="flex gap-2 mt-0">
                <button 
                    onClick={togglePlay}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Play/Pause
                </button>
                <button 
                    onClick={toggleStop}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Stop
                </button>
                <button 
                    onClick={newLink}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    New Track
                </button>
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
}

export default SpotifyLinkPlayer;