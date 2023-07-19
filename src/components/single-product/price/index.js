import { isEmpty } from "lodash";

const Price = ({ regularPrice = 0, salesPrice }) => {
  if (isEmpty(salesPrice)) {
    return null;
  }

  /**
   * Get discount percent.
   *
   * @param {String} regularPrice
   * @param {String} salesPrice
   */
  const discountPercent = (regularPrice, salesPrice) => {
    if (isEmpty(regularPrice) || isEmpty(salesPrice)) {
      return null;
    }

    const formattedRegularPrice = parseInt(
      regularPrice?.substring(1).replaceAll(".", "")
    );
    const formattedSalesPrice = parseInt(
      salesPrice?.substring(1).replaceAll(".", "")
    );

    const discountPercent =
      ((formattedRegularPrice - formattedSalesPrice) / formattedRegularPrice) *
      100;

    return {
      discountPercent:
        formattedSalesPrice !== formattedRegularPrice
          ? `-${discountPercent.toFixed(0)}%`
          : null,
      strikeThroughClass:
        formattedSalesPrice < formattedRegularPrice
          ? " text-sm line-through pl-1"
          : "font-semibold",
    };
  };

  const productMeta = discountPercent(regularPrice, salesPrice);

  return (
    <p className=" lg:text-2xl text-lg lg:leading-6 leading-5 font-medium text-gray-900 mt-2">
      {/* Regular price */}
      {productMeta?.discountPercent ? (
        <span className="font-semibold">{salesPrice}</span>
      ) : null}

      {/* Discounted price */}
      <span className={productMeta?.strikeThroughClass}>{regularPrice}</span>
      {productMeta?.discountPercent ? (
        <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-pink-700 ring-1 ring-inset ring-pink-700/10">
          {productMeta?.discountPercent}
        </span>
      ) : null}
    </p>
  );
};

export default Price;
