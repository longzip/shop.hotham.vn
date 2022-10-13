import Head from 'next/head'
import Layout from "../../src/components/Layout";
import client from "../../src/components/ApolloClient";
import Product from "../../src/components/Product";
import {PRODUCT_BY_CATEGORY_SLUG, PRODUCT_CATEGORIES_SLUGS} from "../../src/queries/product-by-category";
import {isEmpty} from "lodash";
import {useRouter} from "next/router";
import parse from 'html-react-parser';

export default function CategorySingle( { categoryName, products, seo, siteSeo, mainMenu, mobileMenu, footerMenu } ) {

    const router = useRouter()

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const fullHead = parse(seo?.fullHead);

    return (
        <Layout siteSeo={siteSeo} mainMenu={mainMenu} mobileMenu={mobileMenu} footerMenu={footerMenu}>
            <Head>
				{ fullHead }
			</Head>
            <div className="product-categories-container container mx-auto my-32 px-4 xl:px-0">
                { categoryName ? <h3 className="text-2xl mb-5 uppercase">{ categoryName }</h3> : '' }
                <div className="product-categories grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                    { undefined !== products && products?.length ? (
                        products.map( product => <Product key={ product?.id } product={ product } /> )
                    ) : ''}
                </div>
            </div>
        </Layout>
    )
};

export async function getStaticProps(context) {

    const {params: { slug }} = context

    const {data} = await client.query(({
        query: PRODUCT_BY_CATEGORY_SLUG,
        variables: { slug }
    }));

    return {
        props: {
            mainMenu: data?.mainMenu?.nodes ? data.mainMenu.nodes : {},
			footerMenu: data?.footerMenu?.nodes ? data.footerMenu.nodes : {},
			mobileMenu: data?.mobileMenu?.nodes ? data.mobileMenu.nodes : {},
			siteSeo: data?.siteSeo?.schema ? data.siteSeo.schema : {},
            categoryName: data?.productCategory?.name ?? '',
            seo: data?.productCategory?.seo ?? '',
            products: data?.productCategory?.products?.nodes ?? []
        },
        revalidate: 1
    }

}

export async function getStaticPaths () {
    const { data } = await client.query({
        query: PRODUCT_CATEGORIES_SLUGS
    })

    const pathsData = []

    data?.productCategories?.nodes && data?.productCategories?.nodes.map((productCategory) => {
        if (!isEmpty(productCategory?.slug)) {
            pathsData.push({ params: { slug: productCategory?.slug } })
        }
    })

    return {
        paths: pathsData,
        fallback: true
    }
}
