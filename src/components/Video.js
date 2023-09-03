const Video = ({ videos, title = "Video" }) => {
  if (videos.length == 0) return;
  return (
    <div className="bg-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-semibold lg:text-4xl text-center text-3xl lg:leading-9 leading-7 text-gray-800 pt-12">
          {title}
        </h2>
        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-6">
          {videos
            .filter((v) => v.video)
            .map(({ video }) => {
              return (
                <div
                  className="aspect-w-16 aspect-h-9"
                  dangerouslySetInnerHTML={{
                    __html: video?.slice(3).slice(0, -5),
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Video;
