import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import { Spotify } from 'react-spotify-embed';

const SpotifyLinkPlayer = (props) => {
    const [spotifyLink, setSpotifyLink] = useState("https://open.spotify.com/track/6cT2EfDtHeBkZR7e4cCSY5?play=true");

    const embedRef = useRef(null);
    const embedControllerRef = useRef(null);

    useEffect(() => {
        // Load the Spotify IFrame API script
        const script = document.createElement("script");
        script.src = "https://open.spotify.com/embed-podcast/iframe-api/v1";
        script.async = true;
        document.body.appendChild(script);

        // Initialize the API when the script loads
        window.onSpotifyIframeApiReady = (IFrameAPI) => {
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

    return (
        <div className="w-full max-w-xl">
            <div id="embed-iframe" ref={embedRef} className="rounded-lg"/>
            <div className="flex gap-2 mt-4">
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
        </div>
    );
}

SpotifyLinkPlayer.propTypes = {
    
}

export default SpotifyLinkPlayer;