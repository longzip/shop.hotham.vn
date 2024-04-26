import Head from "next/head";
import Layout from "../src/components/Layout";
import ProductList from "../src/components/ProductList";
import client from "../src/components/ApolloClient";
import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";
import NAV_QUERY from "../src/queries/nav";
import HeroCarousel from "../src/components/home/hero-carousel";

import parse from "html-react-parser";

export default function Home({
  homePage,
  productCategories,
  heroCarousel,
  fbPageId,
  siteSeo,
  mainMenu,
  mobileMenu,
  footerMenu,
  footerMenu2,
}) {
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
      {productCategories.map(({ name, image, products, slug }) => (
        <div key={slug}>
          <div className="mx-auto max-w-2xl lg:max-w-6xl">
            <img
              src={image?.sourceUrl}
              alt={image?.altText}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <ProductList
            products={products.nodes}
            title={name}
            xemThem={`/danh-muc-san-pham/${slug}/`}
          ></ProductList>
        </div>
      ))}
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
  return {
    props: data,
    revalidate: 3600,
  };
}
