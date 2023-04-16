import React, { useContext, useState } from "react";
import client from "../src/components/ApolloClient";
import Layout from "../src/components/Layout";
import NAV_QUERY from "../src/queries/nav";
import DonHang from "../src/components/DonHang";
import { AppContext } from "../src/components/context/AppContext";

const ThanhToan = ({
  siteSeo,
  mainMenu,
  mobileMenu,
  footerMenu,
  footerMenu2,
  productCategories,
}) => {
  const [cart, setCart] = useContext(AppContext);

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      hoVaTen: event.target.hoVaTen.value,
      soDienThoai: event.target.soDienThoai.value,
    };
    console.log(data);
  };

  return (
    <Layout
      siteSeo={siteSeo}
      mainMenu={mainMenu}
      mobileMenu={mobileMenu}
      footerMenu={footerMenu}
      footerMenu2={footerMenu2}
      productCategories={productCategories}
    >
      <div className="2xl:container 2xl:mx-auto lg:px-20 m md:px-6 px-4 ">
        <nav
          class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Breadcrumb"
        >
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <a
                href="/"
                class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Trang chủ
              </a>
            </li>
            <li>
              <div class="flex items-center">
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <a
                  href="#"
                  class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Thanh toán
                </a>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      {cart ? (
        <div className="overflow-y-hidden">
          <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
            <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
              <form onSubmit={handleSubmit}>
                <div className="flex w-full  flex-col justify-start items-start">
                  <div className>
                    <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                      Thanh toán
                    </p>
                  </div>
                  <div className="mt-2">
                    <a
                      href="javascript:void(0)"
                      className="text-base leading-4 underline  hover:text-gray-800 text-gray-600"
                    >
                      Quay lại giỏ hàng
                    </a>
                  </div>
                  <div className="mt-12">
                    <p className="text-xl font-semibold leading-5 text-gray-800">
                      Thông tin thanh toán
                    </p>
                  </div>
                  <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                    <input
                      className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                      type="text"
                      name="hoVaTen"
                      placeholder="Họ và tên"
                    />
                    <input
                      className="focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4   w-full"
                      type="text"
                      name="soDienThoai"
                      placeholder="Số điện thoại"
                    />
                    <input
                      className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                      type="email"
                      placeholder="Địa chỉ email"
                    />
                    <input
                      className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                      type="text"
                      required
                      placeholder="Địa chỉ"
                    />
                  </div>
                  <button className="focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-gray-800 leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800">
                    Đặt hàng
                  </button>
                  <div className="mt-4 flex justify-start items-center w-full">
                    <a
                      href="javascript:void(0)"
                      className="text-base leading-4 underline focus:outline-none focus:text-gray-500  hover:text-gray-800 text-gray-600"
                    >
                      Quay lại giỏ hàng
                    </a>
                  </div>
                </div>
              </form>
              <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">
                <DonHang />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Layout>
  );
};
export default ThanhToan;

export async function getStaticProps() {
  const {
    data: {
      mainMenu,
      footerMenu,
      footerMenu2,
      mobileMenu,
      siteSeo,
      productCategories,
    },
  } = await client.query({
    query: NAV_QUERY,
  });

  return {
    props: {
      mainMenu: mainMenu.nodes,
      footerMenu: footerMenu.nodes,
      footerMenu2: footerMenu2.nodes,
      mobileMenu: mobileMenu.nodes,
      siteSeo: siteSeo.schema,
      productCategories: productCategories.nodes,
    },
    revalidate: 1,
  };
}
