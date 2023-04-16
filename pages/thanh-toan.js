import Layout from "../src/components/Layout";
import client from "../src/components/ApolloClient";
import NAV_QUERY from "../src/queries/nav";
import CheckoutForm2 from "../src/components/checkout/CheckoutForm2";

const Checkout3 = ({
  siteSeo,
  mainMenu,
  mobileMenu,
  footerMenu,
  footerMenu2,
  productCategories,
}) => (
  <Layout
    siteSeo={siteSeo}
    mainMenu={mainMenu}
    mobileMenu={mobileMenu}
    footerMenu={footerMenu}
    footerMenu2={footerMenu2}
    productCategories={productCategories}
  >
    <CheckoutForm2 />
  </Layout>
);

export default Checkout3;

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
