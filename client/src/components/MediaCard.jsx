import { useState, useEffect } from 'react';
import { Description } from '@headlessui/react';
import PropTypes from 'prop-types';

const MediaCard = (props) => {
    
    const [text, setText] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        setText(props.text);
        setImage(props.image);
    }, [props]);
    
    return (
        <div className="h-9 w-5/6 mx-2 my-1 bg-white rounded-sm shadow-md transition duration-200 hover:scale-105 hover:shadow-lg" id="card">
            <Description id="text"><p className="truncate overflow-hidden">{text}</p></Description>
            <img src={image} className="rounded-r-sm"/>
        </div>
    )
}

MediaCard.propTypes = {
    text: PropTypes.string,
    image: PropTypes.string,
}

export default MediaCard;