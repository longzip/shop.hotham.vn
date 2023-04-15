import { Fragment } from "react";
import CheckoutCartItem from "./CheckoutCartItem";

const YourOrder = ({ cart }) => {
  return (
    <Fragment>
      {cart ? (
        <Fragment>
          {/*Product Listing*/}
          <table className="checkout-cart table table-hover w-full mb-10">
            <thead>
              <tr className="woo-next-cart-head-container text-left">
                <th className="woo-next-cart-heading-el" scope="col">
                  Tên hàng
                </th>
                <th className="woo-next-cart-heading-el" scope="col">
                  Thành tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.contents.itemCount &&
                cart.contents.nodes.map((item) => (
                  <CheckoutCartItem key={item.key} item={item} />
                ))}
              {/*Total*/}
              <tr className="bg-gray-200">
                <td className="woo-next-checkout-total font-normal text-xl">
                  Tổng cộng
                </td>
                <td className="woo-next-checkout-total font-bold text-xl">
                  {cart.total}
                </td>
              </tr>
              {/* <tr className="">
							<td className=""/>
							<td className="woo-next-checkout-total">Total</td>
							<td className="woo-next-checkout-total">{ cart.totalProductsPrice }</td>
						</tr> */}
            </tbody>
          </table>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default YourOrder;
