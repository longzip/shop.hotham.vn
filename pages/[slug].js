import Head from "next/head";
import Layout from "../src/components/Layout";
import client from "../src/components/ApolloClient";

import { PAGE_BY_SLUG_QUERY, PAGE_SLUGS } from "../src/queries/page-by-slug";
import NAV_QUERY from "../src/queries/nav";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import parse from "html-react-parser";

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
      <div className="mx-auto container px-6 xl:px-0">
        <div className="flex flex-col">
          {page ? (
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col justify-start items-start">
                <p className="text-sm leading-none text-gray-600">
                  {" "}
                  <a href="/">Trang chủ</a> - {page.title}
                </p>
                <div className="mt-2 flex flex-col justify-end items-center space-x-3">
                  <h1 className="text-2xl font-semibold leading-normal text-gray-800">
                    {page.title}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: page.content,
                    }}
                    className=""
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
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
    revalidate: 1,
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
