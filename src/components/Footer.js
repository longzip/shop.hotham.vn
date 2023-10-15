import React, { useState } from "react";
import Link from "next/link";
import isEmpty from "../validator/isEmpty";
import {
  FB_PAGE_URL,
  INPUT_SECRET,
  INSTAGRAM_PAGE_URL,
  MAILCHIMP_FORM_URL,
  TIKTOK_PAGE_URL,
  YOUTUBE_PAGE_URL,
  ZALO_PAGE_URL,
} from "../../lib/constants";

const Footer1 = ({
  siteSeo: { logo, siteName, homeUrl },
  footerMenu,
  footerMenu2,
}) => {
  const [email, setEmail] = useState("");
  const handleOnChange = async (event) => {
    const { target } = event || {};
    const newValue = !isEmpty(target.value) ? target.value : "";
    setEmail(newValue);
  };
  return (
    <div className="mx-auto container py-16 xl:px-20 lg:px-12 sm:px-6 px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 gap-4">
        <div className="flex flex-col flex-shrink-0">
          <h2 className="text-base font-semibold leading-4 text-gray-800">
            {siteName}
          </h2>
          {/* <div
            className="mt-1 zalo-follow-only-button"
            data-oaid="907870636305349915"
          ></div> */}
          <div
            className="mt-5"
            dangerouslySetInnerHTML={{ __html: logo.caption }}
          />
          <div className="flex items-center gap-x-4 mt-12">
            <div className="opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a href={FB_PAGE_URL} target="_blank">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 512 512"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
            <div className="opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a href={TIKTOK_PAGE_URL} target="_blank">
                <svg
                  width="17"
                  height="18"
                  viewBox="0 0 448 512"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
            <div className="opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a href={YOUTUBE_PAGE_URL} target="_blank">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 576 512"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
            <div className="opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a href={INSTAGRAM_PAGE_URL} target="_blank">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 448 512"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
            <div className="opacity-50 w-8 h-8 flex-shrink-0 bg-gray-800 cursor-pointer hover:bg-gray-700 rounded-full flex items-center justify-center">
              <a href={ZALO_PAGE_URL} target="_blank">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="sm:ml-0 ml-8">
          <h2 className="text-base font-semibold leading-4 text-gray-800">
            {footerMenu[0]?.name ?? "Footer Menu 1"}
          </h2>
          <ul>
            {footerMenu[0]?.menuItems?.nodes
              ? footerMenu[0].menuItems.nodes.map((menuItem) => (
                  <li
                    key={menuItem.id}
                    className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer"
                  >
                    <Link key={menuItem.id} href={menuItem.path}>
                      <a dangerouslySetInnerHTML={{ __html: menuItem.label }} />
                    </Link>
                  </li>
                ))
              : null}
          </ul>
        </div>
        <div>
          <h2 className="text-base font-semibold leading-4 text-gray-800">
            {footerMenu2[0]?.name ?? "Footer Menu 2"}
          </h2>
          <ul>
            {footerMenu2[0]?.menuItems?.nodes
              ? footerMenu2[0].menuItems.nodes.map((menuItem) => (
                  <li
                    key={menuItem.id}
                    className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer"
                  >
                    <Link key={menuItem.id} href={menuItem.path}>
                      <a dangerouslySetInnerHTML={{ __html: menuItem.label }} />
                    </Link>
                  </li>
                ))
              : null}
          </ul>
        </div>
        <div className="mt-10 lg:block hidden">
          <form
            action={MAILCHIMP_FORM_URL}
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            target="_self"
          >
            <label className="text-xl font-medium leading-5 text-gray-800">
              Đăng Ký Trở Thành Khách Hàng Thân Thiết
            </label>
            <input
              className="invisible"
              type="text"
              name={INPUT_SECRET}
              tabIndex="-1"
              value=""
              readOnly
            ></input>
            <div className="cursor-pointer flex items-center justify-between border border-gray-800 mt-4">
              <input
                type="email"
                value={email}
                onChange={handleOnChange}
                name="EMAIL"
                className="text-base leading-4 p-4 w-full focus:outline-none text-gray-800 placeholder-gray-800"
                placeholder="Email"
                required
              />

              <button
                type="submit"
                value="Subscribe"
                className="mr-4 cursor-pointer relative z-40"
              >
                <svg
                  className="fill-current text-gray-800 hover:text-gray-500"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.8934 7.39673L14.8884 7.39457L1.54219 1.9166C1.42993 1.87011 1.30778 1.85187 1.18666 1.86353C1.06554 1.87519 0.949225 1.91637 0.848125 1.9834C0.741311 2.05266 0.653573 2.14711 0.592805 2.25826C0.532037 2.36941 0.500145 2.49376 0.5 2.62013V6.12357C0.50006 6.29633 0.561019 6.46366 0.67237 6.59671C0.783722 6.72976 0.938491 6.82021 1.11 6.85246L8.38906 8.18438C8.41767 8.18974 8.44348 8.20482 8.46205 8.22701C8.48062 8.2492 8.49078 8.2771 8.49078 8.30591C8.49078 8.33472 8.48062 8.36263 8.46205 8.38481C8.44348 8.407 8.41767 8.42208 8.38906 8.42744L1.11031 9.75936C0.938851 9.79153 0.784092 9.88185 0.67269 10.0148C0.561288 10.1477 0.500219 10.3149 0.5 10.4876V13.9917C0.499917 14.1124 0.530111 14.2312 0.587871 14.3374C0.645632 14.4437 0.729152 14.5341 0.830938 14.6006C0.953375 14.6811 1.09706 14.7241 1.24406 14.7243C1.34626 14.7242 1.4474 14.7039 1.54156 14.6646L14.8875 9.21787L14.8934 9.21509C15.0731 9.13869 15.2262 9.01185 15.3337 8.85025C15.4413 8.68866 15.4986 8.49941 15.4986 8.30591C15.4986 8.11241 15.4413 7.92316 15.3337 7.76157C15.2262 7.59997 15.0731 7.47313 14.8934 7.39673Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-10 lg:hidden">
        <form
          action={MAILCHIMP_FORM_URL}
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_self"
        >
          <label className="text-xl font-medium leading-5 text-gray-800">
            Đăng Ký Trở Thành Khách Hàng Thân Thiết
          </label>
          <input
            className="invisible"
            type="text"
            name={INPUT_SECRET}
            tabIndex="-1"
            value=""
            readOnly
          ></input>
          <div className="flex items-center justify-between border border-gray-800 mt-4">
            <input
              type="email"
              value={email}
              onChange={handleOnChange}
              name="EMAIL"
              required
              className="text-base leading-4 p-4 relative z-0 w-full focus:outline-none text-gray-800 placeholder-gray-800"
              placeholder="Nhập email để nhận ưu đãi"
            />
            <button
              type="submit"
              value="Subscribe"
              className="mr-4 cursor-pointer relative z-40"
            >
              <svg
                className="fill-current text-gray-800 hover:text-gray-500"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.8934 7.39673L14.8884 7.39457L1.54219 1.9166C1.42993 1.87011 1.30778 1.85187 1.18666 1.86353C1.06554 1.87519 0.949225 1.91637 0.848125 1.9834C0.741311 2.05266 0.653573 2.14711 0.592805 2.25826C0.532037 2.36941 0.500145 2.49376 0.5 2.62013V6.12357C0.50006 6.29633 0.561019 6.46366 0.67237 6.59671C0.783722 6.72976 0.938491 6.82021 1.11 6.85246L8.38906 8.18438C8.41767 8.18974 8.44348 8.20482 8.46205 8.22701C8.48062 8.2492 8.49078 8.2771 8.49078 8.30591C8.49078 8.33472 8.48062 8.36263 8.46205 8.38481C8.44348 8.407 8.41767 8.42208 8.38906 8.42744L1.11031 9.75936C0.938851 9.79153 0.784092 9.88185 0.67269 10.0148C0.561288 10.1477 0.500219 10.3149 0.5 10.4876V13.9917C0.499917 14.1124 0.530111 14.2312 0.587871 14.3374C0.645632 14.4437 0.729152 14.5341 0.830938 14.6006C0.953375 14.6811 1.09706 14.7241 1.24406 14.7243C1.34626 14.7242 1.4474 14.7039 1.54156 14.6646L14.8875 9.21787L14.8934 9.21509C15.0731 9.13869 15.2262 9.01185 15.3337 8.85025C15.4413 8.68866 15.4986 8.49941 15.4986 8.30591C15.4986 8.11241 15.4413 7.92316 15.3337 7.76157C15.2262 7.59997 15.0731 7.47313 14.8934 7.39673Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <p className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023{" "}
        <a href={homeUrl} className="hover:underline">
          {siteName}™
        </a>
        . All Rights Reserved. Thiết kế website hiện đại cùng{" "}
        <a
          className="text-underlinefont-semibold text-gray-900 underline dark:text-white decoration-indigo-500 hover:underline"
          target="_blank"
          href="https://www.hotham.vn/"
        >
          Hồ Thị Thắm
        </a>{" "}
        |{" "}
        <a
          className="text-underlinefont-semibold text-gray-900 underline dark:text-white decoration-indigo-500 hover:underline"
          target="_blank"
          href="https://www.amycos.shop/"
        >
          Mỹ phẩm Amycos
        </a>
      </p>
    </div>
  );
};

export default Footer1;
