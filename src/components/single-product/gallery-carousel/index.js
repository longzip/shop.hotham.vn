import { isEmpty, isArray } from 'lodash';
import {useState, useRef} from 'react';

const GalleryCarousel = ({gallery}) => {

    if ( isEmpty(gallery) || ! isArray( gallery ) ) {
        return null;
    }

    const activeIndexRef = useRef( { activeIndex: 0 } );
    const slideRef = useRef( 0 );
    const [ slide, setSlide ] = useState( 0 );
    const [ restartSlide, setRestartSlide ] = useState( 0 );
    const { activeIndex } = activeIndexRef.current;

    /**
     * Change to next slide.
     */
    const nextSlide = () => {

        if ( 1 === gallery.length ) {
            return null;
        }

        /**
         * If if autoplay is set to true
         * and all slides are finished playing,
         * set the activeIndex to one and restart the slide from start.
         */
        if ( activeIndexRef.current.activeIndex === gallery.length - 1 ) {

            activeIndexRef.current.activeIndex = 0;
            setRestartSlide( restartSlide + 1 );

        } else {

            // If its not the last slide increment active index by one.
            activeIndexRef.current.activeIndex =
                activeIndexRef.current.activeIndex + 1;

        }

        slideRef.current = slideRef.current + 1;
        setSlide( slideRef.current );

    };

    return (
        <div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
            <div className=" w-full lg:w-8/12  flex justify-center items-center">
                <img src={gallery[0].url} alt="Wooden Chair Previw" />
            </div>
            <div className=" w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
                {
                    gallery.slice(0,3).map( ( item, index ) => {
                        
                        return (
                            <div key={item?.id} className="bg-gray-100 flex justify-center items-center">
                                <img
                                    src={item?.sourceUrl} loading="lazy" alt={ item?.altText ? item?.altText : item?.title }
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GalleryCarousel
