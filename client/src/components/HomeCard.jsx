import React from 'react';
import { useState } from 'react';
import './HomeCard.css'

const HomeCard = (props) => {

    return (
        <div className="bg-white rounded-lg shadow-md transition duration-200 hover:scale-105 hover:shadow-lg" id="tab">
            <div style={{fontFamily:`${props.font}`}} id="text">
                {props.title}
            </div>
            <div style={{background:`${props.color_gradient}`}} id="tabColor"></div>
        </div>
    )
}

export default HomeCard;