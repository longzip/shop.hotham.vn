import Head from "next/head";
import Layout from "../src/components/Layout";
import { useRouter } from "next/router";
import client from "../src/components/ApolloClient";
import { PAGE_BY_SLUG_QUERY, PAGE_SLUGS } from "../src/queries/page-by-slug";
import { isEmpty } from "lodash";
import parse from "html-react-parser";

export default function Product({
  page,
  siteSeo,
  mainMenu,
  mobileMenu,
  footerMenu,
  footerMenu2,
}) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const fullHead = parse(page.seo.fullHead);
  return (
    <Layout
      siteSeo={siteSeo}
      mainMenu={mainMenu}
      mobileMenu={mobileMenu}
      footerMenu={footerMenu}
      footerMenu2={footerMenu2}
    >
      {page ? (
        <div className="single-product container mx-auto my-32 px-4 xl:px-0">
          <Head>{fullHead}</Head>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="product-info">
              <h4 className="products-main-title text-2xl uppercase">
                {page.title}
              </h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: page.content,
                }}
                className="product-description mb-5"
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
}

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const { data } = await client.query({
    query: PAGE_BY_SLUG_QUERY,
    variables: { slug },
  });

  return {
    props: {
      mainMenu: data?.mainMenu?.nodes ? data.mainMenu.nodes : {},
      footerMenu: data?.footerMenu?.nodes ? data.footerMenu.nodes : {},
      footerMenu2: data?.footerMenu2?.nodes ? data.footerMenu2.nodes : {},
      mobileMenu: data?.mobileMenu?.nodes ? data.mobileMenu.nodes : {},
      siteSeo: data?.siteSeo?.schema ? data.siteSeo.schema : {},
      page: data?.page || {},
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: PAGE_SLUGS,
  });

  const pathsData = [];

  data?.products?.nodes &&
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
