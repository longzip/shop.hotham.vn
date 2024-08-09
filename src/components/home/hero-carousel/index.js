import { isEmpty, isArray } from "lodash";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

/* Install pure-react-carousel using -> npm i pure-react-carousel */

export default function Index({ heroCarousel }) {
  if (isEmpty(heroCarousel) || !isArray(heroCarousel)) {
    return null;
  }
  return (
    <CarouselProvider
      className="relative block"
      autoPlay={true}
      naturalSlideWidth={80}
      isIntrinsicHeight={true}
      totalSlides={heroCarousel.length}
      visibleSlides={1}
      step={1}
      infinite={true}
    >
      <div className="w-full relative flex items-center justify-center">
        <ButtonBack
          role="button"
          aria-label="slide backward"
          className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-strongGray focus:ring-2 focus:ring-offset-2 focus:ring-strongGray cursor-pointer"
          id="prev"
        >
          <svg
            className="m-4"
            width={12}
            height={18}
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1L1 7L7 13"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ButtonBack>
        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
          <Slider>
            {heroCarousel.map((item, index) => {
              return (
                <Slide key={item?.id} index={index}>
                  <div className="relative flex w-full">
                    <a
                      target="_blank"
                      href={`https://blog.hotham.vn/${item.slug}/`}
                    >
                      <img
                        className="flex object-cover object-center w-full"
                        src={item?.image?.sourceUrl.replace("https://", "https://i0.wp.com/")}
                        alt={item?.image?.altText}
                      />
                    </a>
                  </div>
                </Slide>
              );
            })}
          </Slider>
        </div>
        <ButtonNext
          role="button"
          aria-label="slide forward"
          className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-strongGray focus:ring-2 focus:ring-offset-2 focus:ring-strongGray"
          id="next"
        >
          <svg
            className="m-4"
            width={12}
            height={18}
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L1 13"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ButtonNext>
      </div>
    </CarouselProvider>
  );
}
