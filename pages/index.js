import Head from "next/head";
import Layout from "../src/components/Layout";
import ProductList from "../src/components/ProductList";
import client from "../src/components/ApolloClient";
import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";
import NAV_QUERY from "../src/queries/nav";
import HeroCarousel from "../src/components/home/hero-carousel";
import ParentCategoriesBlock from "../src/components/category/category-block/ParentCategoriesBlock";
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
      productCategories={productCategories}
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

async function loadData() {
  try {
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
      query: PRODUCTS_AND_CATEGORIES_QUERY,
    });
    return {
      mainMenu: mainMenu.nodes,
      footerMenu: footerMenu.nodes,
      footerMenu2: footerMenu2.nodes,
      mobileMenu: mobileMenu.nodes,
      siteSeo: siteSeo.schema,
      productCategories: productCategories.nodes,
      productOnSales: data?.productOnSales?.nodes
        ? data.productOnSales.nodes
        : [],
      products: data?.products?.nodes ? data.products.nodes : [],
      heroCarousel: data?.heroCarousel?.nodes[0]?.children?.nodes
        ? data.heroCarousel.nodes[0].children.nodes
        : [],
      homePage: data?.pageBy,
    };
  } catch (error) {
    return null;
  }
}

export async function getStaticProps() {
  let data = await loadData();
  if (!data) data = await loadData();
  if (!data) data = await loadData();
  if (!data) data = await loadData();
  if (!data) data = await loadData();
  return {
    props: data,
    revalidate: 1,
  };
}
