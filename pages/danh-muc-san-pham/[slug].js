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

export default function CategorySingle({
  categoryName,
  products,
  seo,
  siteSeo,
  mainMenu,
  mobileMenu,
  footerMenu,
  footerMenu2,
  productCategories,
}) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const fullHead = parse(seo?.fullHead);

  return (
    <Layout
      siteSeo={siteSeo}
      mainMenu={mainMenu}
      mobileMenu={mobileMenu}
      footerMenu={footerMenu}
      footerMenu2={footerMenu2}
      productCategories={productCategories}
    >
      <Head>{fullHead}</Head>
      <div className="mx-auto container px-6 xl:px-0">
        <div className="flex flex-col">
          {categoryName ? (
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col justify-start items-start">
                {/* <p className="text-sm leading-none text-gray-600">
                  {" "}
                  <a href="/">Trang chủ</a> - {categoryName}
                </p> */}
                <p className="mt-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
                  Trang chủ / {categoryName}
                </p>
                <div className="mt-2 flex flex-row justify-end items-center space-x-3">
                  <h1 className="text-2xl font-semibold leading-normal text-gray-800">
                    {categoryName}
                  </h1>
                  <p className="text-base leading-4 text-gray-600 mt-2">
                    ({products.length} sản phẩm.)
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

  const { data } = await client.query({
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

  return {
    props: {
      mainMenu: mainMenu.nodes,
      footerMenu: footerMenu.nodes,
      footerMenu2: footerMenu2.nodes,
      mobileMenu: mobileMenu.nodes,
      siteSeo: siteSeo.schema,
      productCategories: productCategories.nodes,
      categoryName: data?.productCategory?.name ?? "",
      image: data?.productCategory?.image ?? {},
      seo: data?.productCategory?.seo ?? "",
      products: data?.productCategory?.products?.nodes ?? [],
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: PRODUCT_CATEGORIES_SLUGS,
  });

  const pathsData = [];

  data?.productCategories?.nodes &&
    data?.productCategories?.nodes.map((productCategory) => {
      if (!isEmpty(productCategory?.slug)) {
        pathsData.push({ params: { slug: productCategory?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
}
