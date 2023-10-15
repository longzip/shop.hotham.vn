import Layout from "../src/components/Layout";
import client from "../src/components/ApolloClient";
import NAV_QUERY from "../src/queries/nav";
import CheckoutForm2 from "../src/components/checkout/CheckoutForm2";
import parse from "html-react-parser";
import { PAGE_BY_SLUG_QUERY } from "../src/queries/page-by-slug";
import { useRouter } from "next/router";
import Head from "next/head";

const Checkout3 = ({
  seo,
  siteSeo,
  mainMenu,
  mobileMenu,
  footerMenu,
  footerMenu2,
  productCategories,
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
      <CheckoutForm2 />
    </Layout>
  );
};

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

  const { data } = await client.query({
    query: PAGE_BY_SLUG_QUERY,
    variables: { slug: "wp-thanh-toan" },
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
