import React, { useState } from "react";
import { isEmpty, isArray } from 'lodash';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

/* Install pure-react-carousel using -> npm i pure-react-carousel */

export default function Index({heroCarousel}) {
    if ( isEmpty(heroCarousel) || ! isArray( heroCarousel ) ) {
    	return null;
    }
    return (
        <>
            {/* Carousel for Small-Sized Screen */}
            <CarouselProvider className="relative block" autoPlay={true} naturalSlideWidth={80} isIntrinsicHeight={true} totalSlides={heroCarousel.length} visibleSlides={1} step={1} infinite={true}>
            <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                    <Slider>
                        {
                            heroCarousel.map( ( item, index ) => {
                                return (
                                    <Slide key={item?.id} index={index}>
                                        
                                        <div class="relative flex w-full">
                                            <img className="flex object-cover object-center w-full lg:w-3/4" src={item?.image?.sourceUrl} alt={item?.image?.altText} />
                                            <div className="absolute w-full lg:right-0 bottom-0 lg:h-full lg:w-1/4 lg:px-5 lg:pt-[200px] bg-black text-center py-5">
                                                <h2 className="uppercase leading-5 text-xl text-white lg:text-2xl lg:leading-9">{item?.image?.title}</h2>
                                                <p className="text-white pt-2" dangerouslySetInnerHTML={ {
                                                    __html: item?.description,
                                                } } />
                                                <a href={`/danh-muc-san-pham/${item.slug}`} className="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none rounded text-gray-800 border border-gray-300 px-6 py-2 uppercase text-sm">Mua ngay</a>
                                            </div>
                                        </div>           
                                    </Slide>
                                )
                            })
                        }
                    </Slider>
                    </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
            </CarouselProvider>

            {/* Carousel for Medium and Large-Sized Screen */}
            

            <style>
                {`
                    .gallery-cell {
                        height: 386px;
                        padding-right:15px;
                    }
                    @media (min-width: 300px) and (max-width: 420px) {
                        .gallery-cell {
                            height: 286px !important;
                            
                        }
                    }
                    
                    @media (max-width: 640px) {
                        .gallery-cell {
                            padding-right:0;
                        }
                    }

                    .carousel__sliderLarge {
                        padding-left: 20%;
                        padding-right: 20%;
                    }

                    /* gives us the illusion of spaces between the slides */
                    .carousel__inner-slideLarge {
                        width: calc(100% - 20px);
                        height: calc(100% - 20px);
                        left: 10px;
                        top: 10px;
                        
                    }
                `}
            </style>
        </>
    );
}
