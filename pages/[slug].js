import Head from "next/head";
import Layout from "../src/components/Layout";
import client from "../src/components/ApolloClient";

import { PAGE_BY_SLUG_QUERY, PAGE_SLUGS } from "../src/queries/page-by-slug";
import NAV_QUERY from "../src/queries/nav";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import PostBody from "../src/components/post-body";

export default function CategorySingle({
  page,
  seo,
  siteSeo,
  mainMenu,
  mobileMenu,
  footerMenu,
  footerMenu2,
  productCategories,
}) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const fullHead = parse(seo?.fullHead);
  if (!page) return null;

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
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
        <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
          Trang chủ / {page.title}
        </p>
        <h1 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">
          {page.title}
        </h1>
        <PostBody content={page.content} />
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
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
  const {
    params: { slug },
  } = context;

  const { data } = await client.query({
    query: PAGE_BY_SLUG_QUERY,
    variables: { slug },
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
      page: data?.page ?? {},
    },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: PAGE_SLUGS,
  });

  const pathsData = [];

  data?.pages?.nodes &&
    data?.pages?.nodes.map((page) => {
      if (!isEmpty(page?.slug)) {
        pathsData.push({ params: { slug: page?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
}
