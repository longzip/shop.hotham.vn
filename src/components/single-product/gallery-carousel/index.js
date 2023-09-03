import { isEmpty, isArray } from "lodash";
// import { useState, useRef } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";

const GalleryCarousel = ({ gallery, image }) => {
  if (isEmpty(gallery) || !isArray(gallery)) {
    return null;
  }

  return (
    <div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex  flex-col lg:gap-8 sm:gap-6 gap-4">
      {image.description ? (
        <div
          className="aspect-w-16 aspect-h-9"
          dangerouslySetInnerHTML={{
            __html: image.description.slice(3).slice(0, -5),
          }}
        />
      ) : (
        <div className=" w-full flex justify-center items-center">
          <img src={image.url} alt={image.altText} />
        </div>
      )}

      <LightGallery
        plugins={[lgZoom, lgVideo]}
        mode="lg-fade"
        elementClassNames="w-full grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-6"
      >
        {gallery.map((item) => {
          return (
            <a
              className="gallery-item bg-gray-100 flex justify-center items-center"
              data-src={item.description || item?.url}
              key={item.id}
            >
              <img className="img-responsive" alt="" src={item?.sourceUrl} />
            </a>
          );
        })}
      </LightGallery>
    </div>
  );
};

export default GalleryCarousel;
