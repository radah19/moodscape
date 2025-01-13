import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'flowbite';

const SlideShow = (props) => {

    const [mediaList, setMediaList] = useState([]);

    const carousel = useRef(null);

    useEffect(() => {

        setMediaList(props.mediaList);

        const temp_items = [];
        props.mediaList.forEach((item, index) => {
            temp_items.append({
                position: index,
                el: document.getElementById(`carousel-item-${index}`)
            })
        });

        const temp_options = {
            defaultPosition: 1,
            interval: 300,
        };

        // const temp_instance_options = {};

        const carouselElement = document.getElementById('carousel-example');

        carousel.current = new Carousel(carouselElement, temp_items, temp_options);
        

    }, [props]);

    return (

        <div>

            <div id="controls-carousel" className="relative w-full" data-carousel="static">
                {/* <!-- Carousel wrapper --> */}
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">

                    {
                        mediaList.map((item, index) => (
                            <div key={index} id={`carousel-item-${index}`} className="hidden items-center duration-300 ease-in-out rounded-md object-cover">
                                <img src={item.img_link} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
                            </div>
                        ))
                    }

                </div>
                {/* <!-- Slider controls --> */}
                <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
            
        </div>
    )
}

export default SlideShow;

SlideShow.propTypes = {
    mediaList: PropTypes.array
}