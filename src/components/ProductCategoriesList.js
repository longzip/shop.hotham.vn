/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
export default function ProductCategoriesList({ productCategories }) {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="font-semibold lg:text-4xl text-center text-3xl lg:leading-9 leading-7 text-gray-800">
            Danh mục sản phẩm
          </h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-16">
            {productCategories
              .filter((c) => c.products.nodes.length)
              .map((category) => (
                <div key={category.id} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={category.image?.sourceUrl.replace("https://", "https://i0.wp.com/")}
                      alt={category.image?.altText}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={`/danh-muc-san-pham/${category.slug}/`}>
                      <span className="absolute inset-0" />
                      {category.count} sản phẩm
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {category.name}
                  </p>
                </div>
              ))}
          </div>
          {/* <a href="/danh-muc-san-pham/">Xem tất cả</a> */}
        </div>
      </div>
    </div>
  );
}
