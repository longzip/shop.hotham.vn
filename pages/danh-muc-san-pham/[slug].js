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
            <div className="mx-auto container px-6 xl:px-0 py-12">
                <div className="flex flex-col">
                    { categoryName ? <div className="flex flex-col justify-center">
                        <div className="relative">
                            <img className="hidden sm:block w-full" src="https://i.ibb.co/HxXSY0j/jason-wang-Nx-Awry-Abt-Iw-unsplash-1-1.png" alt="sofa" />
                            <img className="sm:hidden w-full" src="https://i.ibb.co/B6qwqPT/jason-wang-Nx-Awry-Abt-Iw-unsplash-1.png" alt="sofa" />
                            <div className="absolute sm:bottom-8 bottom-4 pr-10 sm:pr-0 left-4 sm:left-8 flex justify-start items-start">
                                <p className="text-3xl sm:text-4xl font-semibold leading-9 text-white">{ categoryName }</p>
                            </div>
                        </div>
                    </div> : '' }
                    
                    <div className="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center">
                        { undefined !== products && products?.length ? (
                            products.map( product => <Product key={ product?.id } product={ product } /> )
                        ) : ''}
                    </div>
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
