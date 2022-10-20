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
            <CarouselProvider className="relative block sm:hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={heroCarousel.length} visibleSlides={1} step={1} infinite={true}>
                <div className="js-flickity flex justify-center items-center">
                    <Slider>
                        {
                            heroCarousel.map( ( item, index ) => {
                                return (
                                    <Slide key={item?.id} index={index}>
                                        <div className="gallery-cell lg:mr-7 mr-6 lg:w-1/2 sm:w-96 w-full h-full">
                                            <div className="relative w-full h-full lg:hidden">
                                                <img src={item?.image?.sourceUrl} alt={item?.image?.altText} className="object-center object-cover w-full h-full" />
                                                <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
                                                    <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">{item?.image?.title}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </Slide>
                                )
                            })
                        }
                    </Slider>
                </div>
            </CarouselProvider>

            {/* Carousel for Medium and Large-Sized Screen */}
            <CarouselProvider className="relative hidden sm:block" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={3} visibleSlides={1} step={1} infinite={true} currentSlide={1}>
                <div className="js-flickity flex justify-center items-center">
                    <Slider className="carousel__sliderLarge">
                        {
                            heroCarousel.map( ( item, index ) => {
                                return (
                                    <Slide className="carousel__inner-slideLarge" index={index}>
                                        <div className="gallery-cell w-full h-full">
                                            <div className="relative w-full h-full lg:block hidden">
                                                <img src={item?.image?.sourceUrl} alt={item?.image?.altText} className="object-center object-cover w-full h-full" />
                                                <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
                                                    <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">{item?.image?.title}</h1>
                                                </div>
                                            </div>
                                            <div className="relative w-full h-full lg:hidden">
                                                <img src={heroCarousel[index+1]?.image?.sourceUrl ?? heroCarousel[0]?.image?.sourceUrl} alt={heroCarousel[index+1]?.image?.altText ?? heroCarousel[0]?.image?.altText} className="object-center object-cover w-full h-full" />
                                                <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
                                                    <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">{heroCarousel[index+1]?.image?.title ?? heroCarousel[0]?.image?.title}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </Slide>
                                )
                            })
                        }

                    </Slider>
                </div>
            </CarouselProvider>

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
