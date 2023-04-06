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
      <CartItemsContainer />
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
