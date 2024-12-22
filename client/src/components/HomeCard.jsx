import React from 'react';
import { useEffect, useState } from 'react';
import './HomeCard.css'

const HomeCard = (props) => {

    useEffect(() => {
        console.log(props.font);
        console.log(props.color_gradient);
    }, [props]);

    return (
        <div className="bg-white rounded-lg shadow-md transition duration-500 hover:scale-105 hover:shadow-lg" id="tab">
            <div style={{fontFamily:`${props.font}`}} id="text">
                {props.title}
            </div>
            <div style={{borderWidth: "1px", background:`${props.color_gradient}`}} id="tabColor"></div>
        </div>
    )
}

export default HomeCard;