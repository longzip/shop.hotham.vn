import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { v4 } from "uuid";
import cx from "classnames";

import { AppContext } from "../context/AppContext";
import ADD_TO_CART from "../../mutations/add-to-cart";

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
      {/*	Check if its an external product then put its external buy link */}
      {"ExternalProduct" === product.__typename ? (
        <a
          href={product?.externalUrl ?? "/"}
          target="_blank"
          className="focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-5 lg:mt-12 mt-6"
        >
          Mua ngay
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
          {addToCartLoading
            ? "Đang kiểm tra số lượng tồn kho..."
            : "Thêm vào giỏ hàng"}
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
