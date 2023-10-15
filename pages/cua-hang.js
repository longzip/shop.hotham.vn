import Layout from "../src/components/Layout";
import ProductList from "../src/components/ProductList";
import client from "../src/components/ApolloClient";
import CUA_HANG_QUERY from "../src/queries/cua-hang";
import NAV_QUERY from "../src/queries/nav";

export default function CuaHang({
  products,
  siteSeo,
  mainMenu,
  mobileMenu,
  footerMenu,
  footerMenu2,
  productCategories,
}) {
  return (
    <Layout
      siteSeo={siteSeo}
      mainMenu={mainMenu}
      mobileMenu={mobileMenu}
      footerMenu={footerMenu}
      footerMenu2={footerMenu2}
      productCategories={productCategories}
    >
      {/*Products*/}
      <div className="container mx-auto px-1">
        <h1 className="products-main-title main-title mb-5 text-xl uppercase">
          <span className="main-title-inner">Sản phẩm</span>
        </h1>
        <ProductList products={products} />
      </div>
    </Layout>
  );
}

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
    query: CUA_HANG_QUERY,
  });

  return {
    props: {
      mainMenu: mainMenu.nodes,
      footerMenu: footerMenu.nodes,
      footerMenu2: footerMenu2.nodes,
      mobileMenu: mobileMenu.nodes,
      siteSeo: siteSeo.schema,
      productCategories: productCategories.nodes,
      products: data?.products?.nodes ? data.products.nodes : [],
    },
    revalidate: 604800,
  };
}
