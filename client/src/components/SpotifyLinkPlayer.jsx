import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import { Spotify } from 'react-spotify-embed';

const SpotifyLinkPlayer = (props) => {
    const [spotifyLink, setSpotifyLink] = useState("https://open.spotify.com/track/6cT2EfDtHeBkZR7e4cCSY5");

    const embedRef = useRef(null);
    const embedControllerRef = useRef(null);

    useEffect(() => {
        // const element = document.getElementById('embed-iframe');
        // setPlayer(element);

        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = embedRef.current;

            const options = {
                height: '150',
                uri: spotifyLink
            };

            const callback = (controller) => {
                embedControllerRef.current = controller;

                controller.addListener('ready', () => {
                    console.log('The Embed has initialized');
                    console.log(controller);
                    controller.play();
                });
            };

            IFrameAPI.createController(element, options, callback);
        };

    }, []);

    const togglePlay = () => {
        console.log('Apt apt apt');
        embedControllerRef.current.play();
    };

    const toggleStop = () => {
        console.log('STOPPPPP NOOO');
        embedControllerRef.current.pause();
    };

    const newLink = () => {
        console.log('Next please !!');
        embedControllerRef.current.loadUri('https://open.spotify.com/track/0xPQY512qhU5uEZuptw1jP', false, 0);
    };

    return (
        <div>
            <iframe
                ref={embedRef}
                src={spotifyLink}
                width="100%"
                height="150"
                frameBorder="0"
                allow="encrypted-media; autoplay; clipboard-write"
                className="rounded-lg"
            />
            <button onClick={togglePlay}>Toggle Play</button>
            <button onClick={toggleStop}>Toggle Stop</button>
            <button onClick={newLink}>New Link</button>
        </div>
    );
}

SpotifyLinkPlayer.propTypes = {
    
}

export default SpotifyLinkPlayer;