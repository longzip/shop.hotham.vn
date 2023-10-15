import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../src/components/Layout";
import { useRouter } from "next/router";
import client from "../../src/components/ApolloClient";
import AddToCartButton from "../../src/components/cart/AddToCartButton";
import {
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS,
} from "../../src/queries/product-by-slug";
import NAV_QUERY from "../../src/queries/nav";
import { forEach, isEmpty } from "lodash";
import GalleryCarousel from "../../src/components/single-product/gallery-carousel";
import Price from "../../src/components/single-product/price";
import parse from "html-react-parser";
import ProductList from "../../src/components/ProductList";
import PostBody from "../../src/components/post-body";
import { WEBSITE_URL, WORDPRESS_URL } from "../../lib/constants";
import MailChimpForm from "../../src/components/MailchimpForm";

export default function Product({
  product,
  siteSeo,
  mainMenu,
  mobileMenu,
  footerMenu,
  footerMenu2,
  productCategories,
}) {
  const [rotate, setRotate] = useState(false);
  const [count, setCount] = useState(1);

  const addCount = () => {
    setCount((prev) => prev + 1);
  };

  const minusCount = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const fullHead = parse(product?.seo.fullHead);
  const otheProductsRaw = product.productCategories.nodes
    .map(({ products }) => products.nodes)
    .flat();

  const getProductOthers = new Map();
  otheProductsRaw.forEach((node) => {
    if (product.productId !== node.productId)
      getProductOthers.set(node.productId, node);
  });
  const otheProducts = [...getProductOthers.values()];
  return (
    <Layout
      siteSeo={siteSeo}
      mainMenu={mainMenu}
      mobileMenu={mobileMenu}
      footerMenu={footerMenu}
      footerMenu2={footerMenu2}
      productCategories={productCategories}
    >
      {product ? (
        <>
          <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
            <Head>{fullHead}</Head>
            <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
              Trang chủ / Cửa hàng / {product.name}
            </p>
            <div className="flex justify-center items-center lg:flex-row flex-col gap-8 mt-6">
              {!isEmpty(product?.galleryImages?.nodes) ? (
                <GalleryCarousel
                  gallery={product?.galleryImages?.nodes}
                  image={product?.image}
                />
              ) : !isEmpty(product.image) ? (
                <div className="w-full lg:w-4/12">
                  <img
                    src={product?.image?.sourceUrl}
                    alt="Product Image"
                    width="100%"
                    height="auto"
                    // srcSet={ product?.image?.srcSet }
                  />
                </div>
              ) : null}
              <div className=" w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
                <h1 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">
                  {product.name}
                </h1>

                <div className=" flex flex-row justify-between  mt-5">
                  <div className=" flex flex-row space-x-3">
                    <svg
                      className=" cursor-pointer"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                        fill="#1F2937"
                      />
                    </svg>
                    <svg
                      className=" cursor-pointer"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                        fill="#1F2937"
                      />
                    </svg>
                    <svg
                      className=" cursor-pointer"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                        fill="#1F2937"
                      />
                    </svg>
                    <svg
                      className=" cursor-pointer"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                        fill="#1F2937"
                      />
                    </svg>
                    <svg
                      className=" cursor-pointer"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20ZM9.99976 15.1C10.1601 15.0959 10.3186 15.1338 10.4598 15.21L14.2298 17.21L13.5098 13C13.4818 12.8392 13.4936 12.6741 13.5442 12.5189C13.5947 12.3638 13.6825 12.2234 13.7998 12.11L16.7998 9.17996L12.5998 8.55996C12.4457 8.52895 12.3012 8.46209 12.1778 8.3648C12.0545 8.2675 11.9558 8.14251 11.8898 7.99996L9.99976 4.24996L8.10976 7.99996C8.03741 8.14366 7.93145 8.26779 7.80089 8.3618C7.67032 8.45581 7.51899 8.51692 7.35976 8.53996L3.15976 9.15996L6.15976 12.09C6.27704 12.2034 6.36478 12.3438 6.41533 12.4989C6.46588 12.6541 6.4777 12.8192 6.44976 12.98L5.72976 17.14L9.49976 15.14C9.65951 15.0806 9.83261 15.0667 9.99976 15.1Z"
                        fill="#1F2937"
                      />
                    </svg>
                  </div>
                  <a
                    href={`https://${WORDPRESS_URL}?p=${product.productId}`}
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer"
                  >
                    {product.productId} reviews
                  </a>
                </div>
                <div className=" flex flex-row justify-between  mt-5">
                  <div className="flex item-center">
                    Mã sản phẩm: {product.sku}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `${product.name}\r\n\nMã sản phẩm: ${product.sku}\r\n\nGiá ưu đãi: ${product.price}\r\n\nMua hàng chính hãng ưu đãi hấp dẫn tại ${WEBSITE_URL}/cua-hang/${router.query.slug}/`
                        )
                      }
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>
                  </div>
                  {/* <div
                    className="zalo-share-button"
                    data-href={`${WEBSITE_URL}/cua-hang/${router.query.slug}/`}
                    data-oaid="907870636305349915"
                    data-layout="1"
                    data-color="blue"
                    data-customize="false"
                  ></div> */}
                </div>

                <div
                  className=" font-normal text-base leading-6 text-gray-600 mt-7"
                  dangerouslySetInnerHTML={{
                    __html: product.shortDescription,
                  }}
                />

                <Price
                  salesPrice={product?.price}
                  regularPrice={product?.regularPrice}
                />
                {product?.stockQuantity && (
                  <div className="mt-5 flex items-center text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                      />
                    </svg>
                    <span>còn {product.stockQuantity} hàng</span>
                  </div>
                )}
                {product?.stockStatus === "OUT_OF_STOCK" && (
                  <div className="mt-5 flex items-center text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                      />
                    </svg>
                    <span>hết hàng</span>
                  </div>
                )}

                <div className="lg:mt-11 mt-10">
                  <div className="flex flex-row justify-between">
                    <p className=" font-medium text-base leading-4 text-gray-600">
                      Chọn số lượng
                    </p>
                    <div className="flex">
                      <span
                        onClick={minusCount}
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1"
                      >
                        -
                      </span>
                      <input
                        id="counter"
                        aria-label="input"
                        className="border border-gray-300 h-full text-center w-14 pb-1"
                        type="text"
                        value={count}
                        onChange={(e) => e.target.value}
                      />
                      <span
                        onClick={addCount}
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1 "
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <hr className=" bg-gray-200 w-full my-2" />
                </div>
                <AddToCartButton product={product} quantity={count} />
                {/* {product.stockStatus === "IN_STOCK" && (
                  
                )} */}
              </div>
            </div>

            <PostBody content={product.description} />
            {/* <div
              className="mt-5 zalo-comment-plugin"
              data-appid="4012174264882708298"
              data-size="5"
              data-href=""
            ></div> */}
            <div className="bg-gray-300 p-5 ">
              <MailChimpForm />
            </div>
          </div>
          <ProductList products={otheProducts} title="Sản phẩm khác" />
        </>
      ) : (
        ""
      )}
    </Layout>
  );
}

async function loadData(slug) {
  try {
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

    const {
      data: { product },
    } = await client.query({
      query: PRODUCT_BY_SLUG_QUERY,
      variables: { slug },
    });

    return {
      mainMenu,
      footerMenu,
      footerMenu2,
      mobileMenu,
      siteSeo,
      productCategories,
      product,
    };
  } catch (error) {
    return null;
  }
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const {
    mainMenu,
    footerMenu,
    footerMenu2,
    mobileMenu,
    siteSeo,
    productCategories,
    product,
  } = await loadData(slug);

  return {
    props: {
      mainMenu: mainMenu.nodes,
      footerMenu: footerMenu.nodes,
      footerMenu2: footerMenu2.nodes,
      mobileMenu: mobileMenu.nodes,
      siteSeo: siteSeo.schema,
      productCategories: productCategories.nodes,
      product: product,
    },
    revalidate: 300,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: PRODUCT_SLUGS,
  });

  const pathsData = [];

  data?.products?.nodes &&
    data?.products?.nodes.map((product) => {
      if (!isEmpty(product?.slug)) {
        pathsData.push({ params: { slug: product?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
}
