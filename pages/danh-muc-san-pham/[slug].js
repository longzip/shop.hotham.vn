import Head from "next/head";
import Layout from "../../src/components/Layout";
import client from "../../src/components/ApolloClient";
import ProductList from "../../src/components/ProductList";
import {
  PRODUCT_BY_CATEGORY_SLUG,
  PRODUCT_CATEGORIES_SLUGS,
} from "../../src/queries/product-by-category";
import NAV_QUERY from "../../src/queries/nav";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import PRODUCTS_QUERY from "../../src/queries/get-products";
import deepmerge from "deepmerge";

export default function CategorySingle({
  name,
  seo,
  siteSeo,
  mainMenu,
  mobileMenu,
  footerMenu,
  footerMenu2,
  productCategories,
  count,
  products,
}) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout
      siteSeo={siteSeo}
      mainMenu={mainMenu}
      mobileMenu={mobileMenu}
      footerMenu={footerMenu}
      footerMenu2={footerMenu2}
      productCategories={productCategories}
    >
      <Head>{parse(seo?.fullHead || "")}</Head>
      <div className="mx-auto container px-6 xl:px-0">
        <div className="flex flex-col">
          {name ? (
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col justify-start items-start">
                <p className="mt-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
                  Trang chủ / {name}
                </p>
                <div className="mt-2 flex flex-row justify-end items-center space-x-3">
                  <h1 className="text-2xl font-semibold leading-normal text-gray-800">
                    {name}
                  </h1>
                  <p className="text-base leading-4 text-gray-600 mt-2">
                    ({count} sản phẩm.)
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <ProductList products={products} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const {
    data: { productCategory },
  } = await client.query({
    query: PRODUCT_BY_CATEGORY_SLUG,
    variables: { slug },
  });

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

  let after = "";
  let hasNextPage = true;
  let data = {
    products: {
      pageInfo: {
        hasNextPage: true,
        endCursor: null,
      },
      nodes: [],
    },
  };

  while (hasNextPage) {
    const { data: next } = await client.query({
      query: PRODUCTS_QUERY,
      variables: {
        first: 100,
        after,
        where: {
          category: productCategory?.name,
        },
      },
    });

    data = deepmerge(data, next);
    after = next.products?.pageInfo.endCursor || "";
    hasNextPage = next.products?.pageInfo?.hasNextPage || false;
  }

  return {
    props: {
      ...productCategory,
      mainMenu: mainMenu.nodes,
      footerMenu: footerMenu.nodes,
      footerMenu2: footerMenu2.nodes,
      mobileMenu: mobileMenu.nodes,
      siteSeo: siteSeo.schema,
      productCategories: productCategories.nodes,
      products: data.products?.nodes ?? [],
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: PRODUCT_CATEGORIES_SLUGS,
  });

  const pathsData = [];

  data?.productCategories?.nodes &&
    data?.productCategories?.nodes.map((c) => {
      if (!isEmpty(c?.slug)) {
        pathsData.push({ params: { slug: c?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
}
