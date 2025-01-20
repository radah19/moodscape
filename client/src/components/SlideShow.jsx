import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'flowbite';


const SlideShow = (props) => {

    const [mediaList, setMediaList] = useState([]);

    const carousel = useRef(null);
    const [slideNo, setSlideNo] = useState(0);
    const prev = useRef(null);
    const next = useRef(null);

    useEffect(() => {

        setMediaList(props.mediaList);

        prev.current.addEventListener('click', prevSlide);
        next.current.addEventListener('click', nextSlide);

        console.log(mediaList);

    }, [props, slideNo]);

    const prevSlide = () => {
        setSlideNo(slideNo - 1 < 0 ? mediaList.length - 1 : slideNo - 1);
    }

    const nextSlide = () => {
        setSlideNo(slideNo + 1 > mediaList.length - 1 ? 0 : slideNo + 1);
    }

    return (

        <div>

            <div style={{display: "grid", gridTemplateColumns: "10% 80% 10%", gridGap: "5px"}}>

                <button ref={prev} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                </button>

                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    {
                        mediaList.map((item, index) => (
                            <div key={index} id={`carousel-item-${index}`} className={`${slideNo === index ? "visible" : "invisible"} rounded-lg`}>
                                <img src={item.img_link} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-lg" alt="..." />
                                <div className="absolute bg-slate-100 bg-opacity-70 w-3/4 rounded-lg text-center -translate-x-1/2 -translate-y-1/3 bottom-1/3 left-1/2" style={{fontFamily: props.font}}>
                                    {
                                        item.txt !== ""
                                    ?
                                        <div>
                                            <p>{item.txt}</p>
                                        </div>
                                    :
                                        <div></div>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

                <button ref={next} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </button>

            </div>
            
        </div>
    )
}

export default SlideShow;

SlideShow.propTypes = {
    mediaList: PropTypes.array,
    font: PropTypes.string,
    color1: PropTypes.string,
    color2: PropTypes.string
}