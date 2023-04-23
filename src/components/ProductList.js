import Price from "./single-product/price";

export default function ProductList({ products }) {
  // console.log(products);
  return (
    <div className="bg-yellow-600">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-2xl font-bold text-gray-900">Danh sách sản phẩm</h2> */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a
              key={product.id}
              href={`/cua-hang/${product?.slug}`}
              className="group"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.image?.sourceUrl}
                  alt={product.image?.altText}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-xl text-gray-700">{product.name}</h3>
              {/* <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p> */}
              <Price
                salesPrice={product?.price}
                regularPrice={product?.regularPrice}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
