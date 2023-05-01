import Link from "next/link";
import Price from "./single-product/price";
// import Image from "../image";
// import {DEFAULT_PRODUCT_HOME_IMG_URL} from "../constants/urls";

const Product = (props) => {
  const { product } = props;

  return (
    // @TODO Need to handle Group products differently.
    undefined !== product && "GroupProduct" !== product.__typename ? (
      <div className="group group-hover:opacity-60 transition duration-500 relative w-full border shadow-xl">
        <Link href={`/cua-hang/${product?.slug}/`}>
          <a className="relative block overflow-hidden">
            <img
              className="group-hover:opacity-60 transition duration-500 block h-full w-full object-cover object-center cursor-pointer"
              loading="lazy"
              src={product?.image?.sourceUrl ?? ""}
              alt={product?.image?.altText ?? product?.slug}
            />

            <div className="mt-4 text-center group-hover:opacity-60 transition duration-500">
              <h2 className="text-lg font-semibold">
                {product.name ? product.name : ""}
              </h2>
              {/* Price Container */}
              <Price
                salesPrice={product?.price}
                regularPrice={product?.regularPrice}
              />
            </div>
          </a>
        </Link>
      </div>
    ) : (
      ""
    )
  );
};

export default Product;
