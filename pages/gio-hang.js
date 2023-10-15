import Layout from "../src/components/Layout";
import CartItemsContainer from "../src/components/cart/cart-page/CartItemsContainer";
import client from "../src/components/ApolloClient";
import NAV_QUERY from "../src/queries/nav";
import parse from "html-react-parser";
import { PAGE_BY_SLUG_QUERY } from "../src/queries/page-by-slug";
import { useRouter } from "next/router";
import Head from "next/head";

const Cart = ({
  seo,
  siteSeo,
  mainMenu,
  productCategories,
  mobileMenu,
  footerMenu,
  footerMenu2,
}) => {
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
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
        <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
          <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
            <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
              Trang chủ / Giỏ hàng
            </p>
            <CartItemsContainer />
          </div>
        </div>
      </div>
    </Layout>
  );
};
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
  const { data } = await client.query({
    query: PAGE_BY_SLUG_QUERY,
    variables: { slug: "wp-gio-hang" },
  });
  return {
    props: {
      mainMenu: mainMenu.nodes,
      footerMenu: footerMenu.nodes,
      footerMenu2: footerMenu2.nodes,
      mobileMenu: mobileMenu.nodes,
      siteSeo: siteSeo.schema,
      productCategories: productCategories.nodes,
      seo: data?.page?.seo ?? "",
    },
    revalidate: 604800,
  };
}

export default Cart;
