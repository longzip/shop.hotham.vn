import Layout from "../src/components/Layout";
import ProductList from "../src/components/ProductList";
import client from "../src/components/ApolloClient";
import CUA_HANG_QUERY from "../src/queries/cua-hang";

export default function CuaHang({
  products,
  siteSeo,
  mainMenu,
  mobileMenu,
  footerMenu,
  footerMenu2,
}) {
  return (
    <Layout
      siteSeo={siteSeo}
      mainMenu={mainMenu}
      mobileMenu={mobileMenu}
      footerMenu={footerMenu}
      footerMenu2={footerMenu2}
    >
      {/*Products*/}
      <div className="container mx-auto px-1">
        <h2 className="products-main-title main-title mb-5 text-xl uppercase">
          <span className="main-title-inner">Sản phẩm</span>
        </h2>
        <ProductList products={products} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: CUA_HANG_QUERY,
  });

  return {
    props: {
      mainMenu: data?.mainMenu?.nodes ? data.mainMenu.nodes : {},
      footerMenu: data?.footerMenu?.nodes ? data.footerMenu.nodes : {},
      footerMenu2: data?.footerMenu2?.nodes ? data.footerMenu2.nodes : {},
      mobileMenu: data?.mobileMenu?.nodes ? data.mobileMenu.nodes : {},
      siteSeo: data?.siteSeo?.schema ? data.siteSeo.schema : {},
      products: data?.products?.nodes ? data.products.nodes : [],
    },
    revalidate: 1,
  };
}
