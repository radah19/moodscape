import React from 'react';
import './HomeCard.css'

const HomeCard = (props) => {
    return (

        <div className="bg-white shadow-xl" id="tab">
            <div style={{fontFamily:`${props.font}`}} id="text">
                {props.title}
            </div>
            <div id="tabColor" style={{background:`${props.color_gradient}`}}></div>
        </div>
    )
}

export default HomeCard;