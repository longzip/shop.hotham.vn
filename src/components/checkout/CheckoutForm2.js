import { useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import CHECKOUT_MUTATION from "../../mutations/checkout";
import GET_CART from "../../queries/get-cart";
import isEmpty from "../../validator/isEmpty";
import InputField2 from "./form-elements/InputField2";
import InputFieldEmail from "./form-elements/InputFieldEmail";
import validator from "validator";
import DonHang from "../DonHang";
import { AppContext } from "../context/AppContext";

const CheckoutForm2 = () => {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState({});
  const [orderData, setOrderData] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [cart, setCart] = useContext(AppContext);
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
  const [checkout, { loading: checkoutLoading }] = useMutation(
    CHECKOUT_MUTATION,
    {
      variables: {
        input: orderData,
      },
      onCompleted: () => {
        setSuccess(true);
      },
      onError: (error) => {
        if (error) {
          setRequestError(error?.graphQLErrors?.[0]?.message ?? "");
        }
      },
    }
  );

  const handleOnChange = async (event) => {
    const { target } = event || {};
    const newValue = !isEmpty(target.value) ? target.value : "";
    if (!newValue) {
      const newErrors = { ...errors, [target.name]: "Không được để trống." };
      setErrors(newErrors);
    } else {
      const newErrors = { ...delete errors[target.name] };
      setErrors(newErrors);
    }
    if ("email" === target.name && validator.isEmail(target.value)) {
      const newErrors = { ...delete errors[target.name] };
      setErrors(newErrors);
    }

    const newState = { ...input, [target.name]: newValue };
    setInput(newState);
  };

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    const { email = "info@noithatzip.vn", phone, address1, lastName } = input;
    if (!validator.isEmail(email)) {
      const newErrors = { ...errors, email: "Địa chỉ email không hợp lệ" };
      setErrors(newErrors);
    } else {
      const newErrors = { ...delete errors.email };
      setErrors(newErrors);
    }
    if (!isEmpty(errors)) return null;

    const checkOutData = {
      paymentMethod: "cod",
      billing: {
        address1,
        email,
        phone,
        lastName,
        //   firstName: "Lỗ ",
        //   country: "VN",
        //   city: "Hà Nội",
        //   state: "HN"
      },
    };

    setRequestError("");

    setOrderData(checkOutData);
  };

  useEffect(() => {
    if (null === orderData) return;
    // Call the checkout mutation when the value for orderData changes/updates.
    checkout();
  }, [orderData]);
  if (success)
    return (
      <div className="bg-gray-100 h-screen">
        <div className="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Đặt hàng thành công!
            </h3>
            <p className="text-gray-600 my-2">
              Cảm ơn bạn đã đặt hàng, chúng tôi sẽ liên hệ lại với bạn để xác
              nhận đơn hàng.
            </p>
            <p> Chúc bạn một ngày tuyệt vời! </p>
            <div className="py-10 text-center">
              <a
                href="/"
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                Quay về cửa hàng
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  if (!cart?.contents?.itemCount)
    return (
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
        <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
          Trang chủ / Thanh Toán
        </p>
        <h1 className="mb-5 text-2xl uppercase">
          Hãy thêm sản phẩm vào giỏ hàng trước khi thanh toán đơn hàng.
        </h1>
      </div>
    );
  return (
    <div className="lg:container lg:mx-auto grid grid-cols-9 lg:grid-cols-12">
      <div className="col-span-9 lg:col-span-8 xl:col-span-9 bg-white h-auto lg:h-screen relative lg:px-10 p-6 lg:py-12">
        <h3 className="font-semibold text-gray-800 text-4xl mt-2">
          Thanh toán
        </h3>

        <div className="mt-7 lg:mt-20">
          <p className="font-normal text-sm text-gray-600 mb-3">
            Thông tin thanh toán
          </p>
          <h3 className="text-2xl text-gray-800 font-medium">
            Nhập thông tin của bạn
          </h3>

          <form onSubmit={handleSubmit} className="mt-8" autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <InputField2
                type="text"
                inputValue={input?.lastName}
                name="lastName"
                placeholder="Tên người nhận hàng"
                handleOnChange={handleOnChange}
                errors={errors}
              />
              <InputField2
                type="text"
                inputValue={input?.phone}
                name="phone"
                placeholder="Số điện thoại nhận hàng"
                handleOnChange={handleOnChange}
                errors={errors}
              />
              <InputField2
                type="text"
                inputValue={input?.address1}
                name="address1"
                placeholder="Địa chỉ nhận hàng"
                handleOnChange={handleOnChange}
                errors={errors}
              />
              <InputFieldEmail
                type="email"
                inputValue={input?.email}
                name="email"
                placeholder="Email nhận hóa đơn (nếu có)."
                handleOnChange={handleOnChange}
                errors={errors}
              />
            </div>
            {checkoutLoading ? (
              <button
                disabled
                className="bg-gray-800 hover:bg-gray-900 text-white p-4 text-lg my-3 mt-10 w-full md:w-auto"
              >
                Đang xử lý ...
              </button>
            ) : (
              <button className="bg-gray-800 hover:bg-gray-900 text-white p-4 text-lg my-3 mt-10 w-full md:w-auto">
                Đặt hàng
              </button>
            )}

            <p className="text-red-500 text-xs italic">{requestError}</p>
          </form>
          <p font-normal text-sm text-gray-600 mb-3>
            Quý khách có thể thanh toán bằng hình thức chuyển khoản hoặc giao
            hàng thu tiền tại nhà! <br />
            Vui lòng kiểm tra kỹ các thông tin một lần nữa, sau đó nhấn nút "
            ĐẶT HÀNG " để gửi đơn đặt hàng của quý khách.
            <br />
            Chú ý I: Nhân viên sẽ liên hệ để xác minh đơn hàng một lần nữa, vì
            vậy Quý khách vui lòng chú ý điện thoại. Chi phí giao hàng sẽ được
            nhân viên thông báo khi liên hệ.
          </p>
        </div>
      </div>
      <div className="relative col-span-9 lg:col-span-4 xl:col-span-3 bg-gray-100 lg:h-auto xl:h-screen px-8 py-14 xl:px-12 xl:py-20">
        <DonHang cart={cart} />
      </div>
    </div>
  );
};

export default CheckoutForm2;
