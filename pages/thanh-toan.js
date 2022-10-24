import Layout from "../src/components/Layout";
import CheckoutForm from "../src/components/checkout/CheckoutForm";
// import GET_COUNTRIES from "../src/queries/get-countries";
import HEADER_FOOTER_QUERY from "../src/queries/header-footer";
import client from "../src/components/ApolloClient";

const Checkout = ({
  siteSeo,
  mainMenu,
  mobileMenu,
  footerMenu,
  footerMenu2,
}) => (
  <Layout
    siteSeo={siteSeo}
    mainMenu={mainMenu}
    mobileMenu={mobileMenu}
    footerMenu={footerMenu}
    footerMenu2={footerMenu2}
  >
    <div className="checkout container mx-auto my-32 px-4 xl:px-0">
      <h1 className="mb-5 text-2xl uppercase">Thanh toán</h1>
      <CheckoutForm />
    </div>
  </Layout>
);

export default Checkout;

export async function getStaticProps() {
  // const { data } = await client.query({
  // 	query: GET_COUNTRIES
  // });

  // return {
  // 	props: {
  // 		data: data || {}
  // 	},
  // 	revalidate: 1
  // };
  const { data } = await client.query({
    query: HEADER_FOOTER_QUERY,
  });

  return {
    props: {
      mainMenu: data?.mainMenu?.nodes ? data.mainMenu.nodes : {},
      footerMenu: data?.footerMenu?.nodes ? data.footerMenu.nodes : {},
      footerMenu2: data?.footerMenu2?.nodes ? data.footerMenu2.nodes : {},
      mobileMenu: data?.mobileMenu?.nodes ? data.mobileMenu.nodes : {},
      siteSeo: data?.siteSeo?.schema ? data.siteSeo.schema : {},
    },
    revalidate: 1,
  };
}
