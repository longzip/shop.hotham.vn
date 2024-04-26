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
          ? " text-sm text-gray-600 cursor-auto ml-2 line-through"
          : "text-lg font-semibold text-black cursor-auto my-3 text-red-600",
    };
  };

  const productMeta = discountPercent(regularPrice, salesPrice);

  return (
    <>
      {productMeta?.discountPercent ? (
        <span className="text-lg font-semibold text-black cursor-auto my-3 text-red-600">
          {salesPrice}
        </span>
      ) : null}
      <span className={productMeta?.strikeThroughClass}>{regularPrice}</span>
      {productMeta?.discountPercent ? (
        <span className="text-xs absolute top-0 right-0 bg-red-200 p-1 text-red-600">
          {productMeta?.discountPercent}
        </span>
      ) : null}
    </>
  );
};

export default Price;
