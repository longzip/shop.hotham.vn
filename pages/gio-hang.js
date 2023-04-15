import Layout from "../src/components/Layout";
import CartItemsContainer from "../src/components/cart/cart-page/CartItemsContainer";
import client from "../src/components/ApolloClient";
import NAV_QUERY from "../src/queries/nav";

const Cart = ({
  siteSeo,
  mainMenu,
  productCategories,
  mobileMenu,
  footerMenu,
  footerMenu2,
}) => {
  return (
    <Layout
      siteSeo={siteSeo}
      mainMenu={mainMenu}
      mobileMenu={mobileMenu}
      footerMenu={footerMenu}
      footerMenu2={footerMenu2}
      productCategories={productCategories}
    >
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

export default Cart;
