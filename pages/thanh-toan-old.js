import Layout from "../src/components/Layout";
import CheckoutForm from "../src/components/checkout/CheckoutForm";
// import GET_COUNTRIES from "../src/queries/get-countries";
import NAV_QUERY from "../src/queries/nav";
import client from "../src/components/ApolloClient";

const Checkout = ({
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
    <div className="checkout container mx-auto my-32 px-4 xl:px-0">
      <h1 className="mb-5 text-2xl uppercase">Thanh toán</h1>
      <CheckoutForm />
    </div>
  </Layout>
);

export default Checkout;

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
