import Price from "./single-product/price";

export default function ProductList({ products, title = "", xemThem }) {
  if (products.length == 0) return;
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8">
        {xemThem ? (
          <div className="border-b mb-5 flex justify-between text-sm">
            <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
              <a href={xemThem} className="font-semibold inline-block">
                {title}
              </a>
            </div>
            <a className="text-red-600" href={xemThem}>
              Xem tất cả
            </a>
          </div>
        ) : (
          <div className="text-center p-10">
            <h2 className="font-bold text-4xl mb-4">{title}</h2>
          </div>
        )}
        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded overflow-hidden shadow-lg flex flex-col"
            >
              <a href={`/cua-hang/${product?.slug}/`}>
                <div className="relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-white">
                    <img
                      src={product.image?.sourceUrl}
                      alt={product.image?.altText}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <div className="px-1 py-1">
                    {/* <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span> */}
                    <p className="text-xl text-gray-700 line-clamp-2">
                      {product.name}
                    </p>
                    <div className="flex items-center">
                      <Price
                        salesPrice={product?.price}
                        regularPrice={product?.regularPrice}
                      />
                      <div className="ml-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-bag-plus"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                          />
                          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
