// import React from 'react';
// import { useState } from 'react';
import './HomeCard.css'
import PropTypes from 'prop-types';

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

HomeCard.propTypes = {
    font: PropTypes.string,
    title: PropTypes.string,
    color_gradient: PropTypes.string
};

export default HomeCard;