import Head from "next/head";
import Layout from "../src/components/Layout";
import ProductList from "../src/components/ProductList";
import client from "../src/components/ApolloClient";
import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";
import NAV_QUERY from "../src/queries/nav";
import HeroCarousel from "../src/components/home/hero-carousel";

import parse from "html-react-parser";
import ProductCategoriesList from "../src/components/ProductCategoriesList";
import { PAGE_BY_SLUG_QUERY } from "../src/queries/page-by-slug";
import PostBody from "../src/components/post-body";
import Video from "../src/components/Video";

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
    page,
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
      {/*Products OnSale*/}
      {/* <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
        <h1 className="font-semibold lg:text-4xl text-center text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">
          {page.title}
        </h1>
        <PostBody content={page.content} />
      </div> */}

      {/*Categories*/}
      <ProductCategoriesList productCategories={productCategories} />
      <Video
        videos={heroCarousel
          .map((v) => ({ video: v.image.description }))
          .filter((v) => v.video)}
      />

      <ProductList products={productOnSales} title="Flash Sale" />

      {/*Products*/}
      <ProductList products={products} title="Sản phẩm bán chạy" />
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

    const {
      data: { page },
    } = await client.query({
      query: PAGE_BY_SLUG_QUERY,
      variables: { slug: "/" },
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
      page,
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
    revalidate: 3600,
  };
}
