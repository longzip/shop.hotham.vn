import { useState, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { v4 } from "uuid";
import cx from "classnames";

import { AppContext } from "../context/AppContext";
import ADD_TO_CART from "../../mutations/add-to-cart";
import GET_CART from "../../queries/get-cart";

const AddToCart = (props) => {
  const { product, quantity } = props;

  const productQryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId: product.productId,
    quantity,
  };

  const [cart, setCart] = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
  const [requestError, setRequestError] = useState(null);

  const { data } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const { cart: updatedCart } = data;
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Add to Cart Mutation.
  const [addToCart, { loading: addToCartLoading }] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQryInput,
    },
    update: (cache, { data: addToCartRes }) => {
      const { cart: updatedCart } = addToCartRes.addToCart;
      localStorage.setItem("woo-next-cart", JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
      setRequestError("");
    },
    onCompleted: () => {
      setShowViewCart(true);
    },
    onError: (error) => {
      if (error) {
        setRequestError(error?.graphQLErrors?.[0]?.message ?? "");
      }
    },
  });

  const handleAddToCartClick = async () => {
    setRequestError(null);
    await addToCart();
  };

  return (
    <div>
      <div
        className="text-red-500 text-xs italic"
        dangerouslySetInnerHTML={{
          __html: requestError,
        }}
      />
      {/*	Check if its an external product then put its external buy link */}
      {"ExternalProduct" === product.__typename ? (
        <a href={product?.externalUrl ?? "/"} target="_blank">
          <button className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-5 lg:mt-12 mt-6">
            {product?.buttonText ?? "Mua ngay"}
          </button>
        </a>
      ) : (
        <button
          disabled={addToCartLoading}
          onClick={handleAddToCartClick}
          className={cx(
            "focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-5 lg:mt-12 mt-6",
            {
              "hover:bg-purple-600 hover:text-white hover:border-purple-600": !addToCartLoading,
            },
            { "opacity-50 cursor-not-allowed": addToCartLoading }
          )}
        >
          {addToCartLoading ? "Đang thêm vào giỏ hàng..." : "Thêm vào giỏ hàng"}
        </button>
      )}
      {showViewCart ? (
        <Link href="/gio-hang/">
          <button className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-5 lg:mt-12 mt-6">
            Xem giỏ hàng
          </button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddToCart;
