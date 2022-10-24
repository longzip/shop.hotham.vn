import { isEmpty, isArray } from "lodash";
import { useState, useRef } from "react";

const GalleryCarousel = ({ gallery }) => {
  if (isEmpty(gallery) || !isArray(gallery)) {
    return null;
  }

  return (
    <div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
      <div className=" w-full lg:w-8/12  flex justify-center items-center">
        <img src={gallery[0].url} alt={gallery[0].altText} />
      </div>
      <div className=" w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
        {gallery.map((item, index) => {
          return (
            <div
              key={item?.id}
              className="bg-gray-100 flex justify-center items-center"
            >
              <img
                src={item?.sourceUrl}
                loading="lazy"
                alt={item?.altText ? item?.altText : item?.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryCarousel;
