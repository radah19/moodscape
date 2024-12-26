import { useEffect, useState } from "react";
import PropTypes from 'prop-types';


const RoomPage = (props) => {
    
    useEffect(() => {

    }, []);

    return (
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
    )
}

RoomPage.propTypes = {
    id: PropTypes.number,
    user: PropTypes.object
};

export default RoomPage;