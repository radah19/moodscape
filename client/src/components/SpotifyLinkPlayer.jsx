import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import validator from 'validator';

const SpotifyLinkPlayer = (props) => {
    const [curIndex, setCurIndex] = useState(0);
    const [hidePlaylist, setHidePlaylist] = useState(true);

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
            const element = document.getElementById('embed-iframe');
            const options = {
                height:'80',
                uri: 'spotify:track:7Jnmgy3B3QK4DaTToC5Ejs' //getURIFromSpotifyLink(props.trackList[0])
            };

            const callback = (EmbedController) => {
                embedControllerRef.current = EmbedController;
                
                // Add listeners for player events
                // EmbedController.addListener('playback_update', e => {
                //     console.log('Playback update:', e);
                // });

                // EmbedController.addListener('ready', () => {
                //     console.log('Embed ready');
                // });
            };

            IFrameAPI.createController(element, options, callback);
        };

        // Cleanup
        return () => {
            document.body.removeChild(script);
        };
    }, [props.trackList]);

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

    return (
        <div className="w-full max-w-xl flex justify-center items-center flex-col">
            <div id="embed-iframe" ref={embedRef} allow="encrypted-media; autoplay; clipboard-write; set-cookies" className="rounded-none"/>

            <div className="w-11/12">
                {/* Options */}
                <div className="flex h-6">
                    <button className="w-full px-4 py-2 bg-green-500 text-white rounded-none hover:bg-green-600 flex justify-center items-center" onClick={() => {setHidePlaylist(!hidePlaylist);}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
                        </svg>
                    </button>

                    <button className="w-full px-4 py-2 bg-green-500 text-white rounded-none hover:bg-green-600 flex justify-center items-center" onClick={loadURI}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                        </svg>
                    </button>

                    <button className="w-full px-4 py-2 bg-green-500 text-white rounded-none hover:bg-green-600 flex justify-center items-center" onClick={loadURI}>
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
                            props.trackList.map((elem, ind) => 
                                <div key={elem.id} className="flex">

                                    <div className="mr-2 p-1">
                                        <img className="border-solid border-2 border-white h-12 w-12" src={elem.img} />
                                    </div>

                                    <p className="text-white content-center">{elem.name}</p>
                                    
                                    <button className="ml-auto mr-4" onClick={() => {
                                        if(curIndex != ind){
                                            loadURI(getURIFromSpotifyLink(elem.link));
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
                    </div>
                }
            </div>

        </div>
    );
}

SpotifyLinkPlayer.propTypes = {
    trackList: PropTypes.array,
    setTrackList: PropTypes.func,
    curTrack: PropTypes.number,
    setCurTrack: PropTypes.func,
}

export default SpotifyLinkPlayer;