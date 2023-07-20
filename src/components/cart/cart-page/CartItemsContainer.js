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
import APPLY_COUPON from "../../../mutations/apply-coupon";
import { isEmpty } from "lodash";
import InputField2 from "../../checkout/form-elements/InputField2";
import GET_CART from "../../../queries/get-cart";

const CartItemsContainer = () => {
  // @TODO wil use it in future variations of the project.
  const [cart, setCart] = useContext(AppContext);
  const [requestError, setRequestError] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});

  // const { data } = useQuery(GET_CART, {
  //   notifyOnNetworkStatusChange: true,
  //   onCompleted: () => {
  //     // Update cart in the localStorage.
  //     const { cart: updatedCart } = data;
  //     localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

  //     // Update cart data in React Context.
  //     setCart(updatedCart);
  //   },
  // });

  // Update Cart Mutation.
  const [
    updateCart,
    {
      data: updateCartResponse,
      loading: updateCartProcessing,
      error: updateCartError,
    },
  ] = useMutation(UPDATE_CART, {
    onError: (error) => {
      if (error) {
        const errorMessage = error?.graphQLErrors?.[0]?.message
          ? error.graphQLErrors[0].message
          : "";
        setRequestError(errorMessage);
      }
    },
  });

  const [applyCoupon, { loading: applyCouponLoading }] = useMutation(
    APPLY_COUPON,
    {
      update: (cache, { data: removeItemsFromCartRes }) => {
        const { cart: updatedCart } = removeItemsFromCartRes.applyCoupon;
        localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

        // Update cart data in React Context.
        setCart(updatedCart);
        setCode("");
        setRequestError("");
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

  const handleOnChange = async (event) => {
    const { target } = event || {};
    const newValue = !isEmpty(target.value) ? target.value : "";
    setCode(newValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const { target } = event || {};
      const newValue = !isEmpty(target.value) ? target.value : "";
      setCode(newValue);
      applyCoupon({
        variables: {
          input: {
            code: newValue,
          },
        },
      });
    }
  };

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    if (isEmpty(code)) return;
    applyCoupon({
      variables: {
        input: {
          code: code,
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
                          {clearCartProcessing ? (
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={(event) => handleClearCart(event, key)}
                              disabled
                            >
                              Đang xử lý...
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={(event) => handleClearCart(event, key)}
                            >
                              Loại bỏ
                            </button>
                          )}
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
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>
            Mã giảm giá:{" "}
            <strong>
              {cart.appliedCoupons?.map(({ code }) => code).join()}
            </strong>
          </p>
          <p>{cart.discountTotal}</p>
        </div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Còn phải thanh toán</p>
          <p>{cart.total}</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex justify-center text-center text-sm text-gray-500"
        >
          <input
            value={code}
            type="text"
            name="code"
            id="code"
            onChange={handleOnChange}
            placeholder="Mã ưu đãi"
            className="w-full border-b-2 border-gray-300 pb-3 text-base text-gray-600 font-normal placeholder-gray-600 focus:outline-none"
          />
          {applyCouponLoading ? (
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
              disabled
            >
              Đang áp dụng..
            </button>
          ) : (
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Áp dụng
            </button>
          )}
        </form>
        <p className="text-red-500 text-xs italic">{requestError}</p>
        <div className="mt-6">
          <a
            href="/thanh-toan"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Tiến hành thanh toán
          </a>
        </div>
      </div>
    </div>
  ) : null;
};

export default CartItemsContainer;
