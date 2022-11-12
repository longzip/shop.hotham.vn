import Head from "next/head";
import Layout from "../src/components/Layout";
import ProductList from "../src/components/ProductList";
import client from "../src/components/ApolloClient";
import ParentCategoriesBlock from "../src/components/category/category-block/ParentCategoriesBlock";
import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";
import HeroCarousel from "../src/components/home/hero-carousel";
import parse from "html-react-parser";

export default function Home(props) {
  const {
    homePage,
    products,
    productOnSales,
    productCategories,
    heroCarousel,
    fbPageId,
    siteSeo,
    mainMenu,
    mobileMenu,
    footerMenu,
    footerMenu2,
  } = props || {};
  const fullHead = parse(homePage?.seo?.fullHead);

  return (
    <Layout
      fbPageId={fbPageId}
      siteSeo={siteSeo}
      mainMenu={mainMenu}
      mobileMenu={mobileMenu}
      footerMenu={footerMenu}
      footerMenu2={footerMenu2}
    >
      <Head>{fullHead}</Head>
      {/*Hero Carousel*/}
      <HeroCarousel heroCarousel={heroCarousel} />

      {/*Categories*/}
      <div className="flex justify-center items-center">
        <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
          <div className="flex flex-col jusitfy-center items-center space-y-10">
            <div className="flex flex-col justify-center items-center space-y-2">
              <h2 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">
                Danh mục sản phẩm
              </h2>
            </div>
            <ParentCategoriesBlock
              productCategories={productCategories.filter(
                (c) => c.parentId === null
              )}
            />
          </div>
        </div>
      </div>

      {/*Products OnSale*/}
      <div className="flex justify-center items-center">
        <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
          <div className="flex flex-col jusitfy-center items-center space-y-10">
            <div className="flex flex-col justify-center items-center space-y-2">
              <h2 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">
                Flash Sale
              </h2>
            </div>
            <ProductList products={productOnSales} />
          </div>
        </div>
      </div>

      {/*Products*/}
      <div className="flex justify-center items-center">
        <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
          <div className="flex flex-col jusitfy-center items-center space-y-10">
            <div className="flex flex-col justify-center items-center space-y-2">
              <h2 className="text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 text-gray-800">
                Chúng tôi đề xuất
              </h2>
            </div>
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: PRODUCTS_AND_CATEGORIES_QUERY,
  });

  return {
    props: {
      mainMenu: data?.mainMenu?.nodes ? data.mainMenu.nodes : {},
      footerMenu: data?.footerMenu?.nodes ? data.footerMenu.nodes : {},
      footerMenu2: data?.footerMenu2?.nodes ? data.footerMenu2.nodes : {},
      mobileMenu: data?.mobileMenu?.nodes ? data.mobileMenu.nodes : {},
      siteSeo: data?.siteSeo?.schema ? data.siteSeo.schema : {},
      productCategories: data?.productCategories?.nodes
        ? data.productCategories.nodes
        : [],
      productOnSales: data?.productOnSales?.nodes
        ? data.productOnSales.nodes
        : [],
      products: data?.products?.nodes ? data.products.nodes : [],
      heroCarousel: data?.heroCarousel?.nodes[0]?.children?.nodes
        ? data.heroCarousel.nodes[0].children.nodes
        : [],
      homePage: data?.pageBy,
    },
    revalidate: 1,
  };
}
