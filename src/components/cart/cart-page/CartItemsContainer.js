import Link from "next/link";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  getFormattedCart,
  getPriceVal,
  getUpdatedItems,
} from "../../../functions";
import CartItem from "./CartItem";
import { v4 } from "uuid";
import { useMutation, useQuery } from "@apollo/client";
import UPDATE_CART from "../../../mutations/update-cart";
import CLEAR_CART_MUTATION from "../../../mutations/clear-cart";
import { isEmpty } from "lodash";

const CartItemsContainer = () => {
  // @TODO wil use it in future variations of the project.
  const [cart, setCart] = useContext(AppContext);
  const [requestError, setRequestError] = useState(null);

  // Update Cart Mutation.
  const [
    updateCart,
    {
      data: updateCartResponse,
      loading: updateCartProcessing,
      error: updateCartError,
    },
  ] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message
          ? error.graphQLErrors[0].message
          : "";
        setRequestError(errorMessage);
      }
    },
  });

  // Update Cart Mutation.
  const [clearCart, { loading: clearCartProcessing }] = useMutation(
    CLEAR_CART_MUTATION,
    {
      update: (cache, { data: removeItemsFromCartRes }) => {
        const {
          cart: updatedCart,
        } = removeItemsFromCartRes.removeItemsFromCart;
        localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

        // Update cart data in React Context.
        setCart(updatedCart);
      },
      onError: (error) => {
        if (error) {
          const errorMessage = !isEmpty(error?.graphQLErrors?.[0])
            ? error.graphQLErrors[0]?.message
            : "";
          setRequestError(errorMessage);
        }
      },
    }
  );

  /*
   * Handle remove product click.
   *
   * @param {Object} event event
   * @param {Integer} Product Id.
   *
   * @return {void}
   */
  const handleRemoveProductClick = (event, cartKey, products) => {
    event.stopPropagation();
    if (products.length) {
      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems,
          },
        },
      });
    }
  };

  // Clear the entire cart.
  const handleClearCart = (event, keys) => {
    event.stopPropagation();

    if (clearCartProcessing) {
      return;
    }
    clearCart({
      variables: {
        input: {
          keys,
        },
      },
    });
  };

  return cart ? (
    <div className="flex flex-col bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <h1 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">
            Giỏ hàng
          </h1>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Close panel</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart.contents.nodes.map(
                ({ key, product, subtotal, quantity }) => (
                  <li key={key} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.node.image?.sourceUrl}
                        alt={product.node.image?.altText}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.node.slug}>{product.node.name}</a>
                          </h3>
                          <p className="ml-4">{subtotal}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Giá:{" "}
                          {(getPriceVal(subtotal) / quantity).toLocaleString()}đ
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">Số lượng {quantity}</p>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={(event) => handleClearCart(event, key)}
                            disabled={clearCartProcessing}
                          >
                            Loại bỏ
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Tạm tính</p>
          <p>{cart.subtotal}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500"></p>
        <div className="mt-6">
          <a
            href="/thanh-toan"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Tiến hành thanh toán
          </a>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            hoặc
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => {}}
            >
              Tiếp tục mua hàng
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  ) : null;

  // return (
  //   <div className="cart product-cart-container container mx-auto my-32 px-4 xl:px-0">
  //     {cart ? (
  //       <div className="woo-next-cart-wrapper container">
  //         <div className="cart-header grid grid-cols-2 gap-4">
  //           <h1 className="text-2xl mb-5 uppercase">Giỏ hàng</h1>
  //           {/*Clear entire cart*/}
  //           <div className="clear-cart text-right">
  //             <button
  //               className="px-4 py-1 bg-gray-500 text-white rounded-sm w-auto"
  //               onClick={(event) => handleClearCart(event)}
  //               disabled={clearCartProcessing}
  //             >
  //               <span className="woo-next-cart">Xóa giỏ hàng</span>
  //               <i className="fa fa-arrow-alt-right" />
  //             </button>
  //             {clearCartProcessing ? <p>Đang xóa...</p> : ""}
  //             {updateCartProcessing ? <p>Đang cập nhật...</p> : null}
  //           </div>
  //         </div>
  //         <div className="grid grid-cols-1 xl:grid-cols-4 gap-0 xl:gap-4 mb-5">
  //           <table className="cart-products table-auto col-span-3 mb-5">
  //             <thead className="text-left">
  //               <tr className="woo-next-cart-head-container">
  //                 <th className="woo-next-cart-heading-el" scope="col" />
  //                 <th className="woo-next-cart-heading-el" scope="col" />
  //                 <th className="woo-next-cart-heading-el" scope="col">
  //                   Tên hàng
  //                 </th>
  //                 <th className="woo-next-cart-heading-el" scope="col">
  //                   Giá
  //                 </th>
  //                 <th className="woo-next-cart-heading-el" scope="col">
  //                   Số lượng
  //                 </th>
  //                 <th className="woo-next-cart-heading-el" scope="col">
  //                   Thành tiền
  //                 </th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {cart.products.length &&
  //                 cart.products.map((item) => (
  //                   <CartItem
  //                     key={item.productId}
  //                     item={item}
  //                     updateCartProcessing={updateCartProcessing}
  //                     products={cart.products}
  //                     handleRemoveProductClick={handleRemoveProductClick}
  //                     updateCart={updateCart}
  //                   />
  //                 ))}
  //             </tbody>
  //           </table>

  //           {/*Cart Total*/}
  //           <div className="row woo-next-cart-total-container border p-5 bg-gray-200">
  //             <div className="">
  //               {/* <h2 className="text-2xl">Cart Total</h2> */}
  //               <table className="table table-hover mb-5">
  //                 <tbody>
  //                   <tr className="table-light flex flex-col">
  //                     <td className="woo-next-cart-element-total text-2xl font-normal">
  //                       Tổng cộng
  //                     </td>
  //                     <td className="woo-next-cart-element-amt text-2xl font-bold">
  //                       {"string" !== typeof cart.totalProductsPrice
  //                         ? cart.totalProductsPrice.toFixed(2)
  //                         : cart.totalProductsPrice}
  //                     </td>
  //                   </tr>
  //                   {/* <tr className="table-light">
  // 									<td className="woo-next-cart-element-total">Total</td>
  // 									<td className="woo-next-cart-element-amt">{ ( 'string' !== typeof cart.totalProductsPrice ) ? cart.totalProductsPrice.toFixed(2) : cart.totalProductsPrice }</td>
  // 								</tr> */}
  //                 </tbody>
  //               </table>
  //               <Link href="/thanh-toan">
  //                 <button className="bg-purple-600 text-white px-5 py-3 rounded-sm w-auto xl:w-full">
  //                   <span className="woo-next-cart-checkout-txt">
  //                     Tiến hành thanh toán
  //                   </span>
  //                   <i className="fas fa-long-arrow-alt-right" />
  //                 </button>
  //               </Link>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Display Errors if any */}
  //         {requestError ? (
  //           <div className="row woo-next-cart-total-container mt-5">
  //             {" "}
  //             {requestError}{" "}
  //           </div>
  //         ) : (
  //           ""
  //         )}
  //       </div>
  //     ) : (
  //       <div className="container mx-auto my-32 px-4 xl:px-0">
  //         <h2 className="text-2xl mb-5">No items in the cart</h2>
  //         <Link href="/">
  //           <button className="bg-purple-600 text-white px-5 py-3 rounded-sm">
  //             <span className="woo-next-cart-checkout-txt">
  //               Add New Products
  //             </span>
  //             <i className="fas fa-long-arrow-alt-right" />
  //           </button>
  //         </Link>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default CartItemsContainer;
