import Head from 'next/head'
import Layout from "../../src/components/Layout";
import client from "../../src/components/ApolloClient";
import Product from "../../src/components/Product";
import {PRODUCT_BY_CATEGORY_SLUG, PRODUCT_CATEGORIES_SLUGS} from "../../src/queries/product-by-category";
import {isEmpty} from "lodash";
import {useRouter} from "next/router";
import parse from 'html-react-parser';

export default function CategorySingle( { categoryName, products, seo, siteSeo, mainMenu, mobileMenu, footerMenu, footerMenu2 } ) {

    const router = useRouter()

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const fullHead = parse(seo?.fullHead);

    return (
        <Layout siteSeo={siteSeo} mainMenu={mainMenu} mobileMenu={mobileMenu} footerMenu={footerMenu} footerMenu2={footerMenu2}>
            <Head>
				{ fullHead }
			</Head>
            <div className="mx-auto container px-6 xl:px-0">
                <div className="flex flex-col">
                    { categoryName ? <div className="flex justify-between items-center w-full">
                <div className="flex flex-col justify-start items-start">
                    <p className="text-sm leading-none text-gray-600"> <a href='/'>Trang chủ</a> - {categoryName}</p>
                    <div className="mt-2 flex flex-row justify-end items-center space-x-3">
                        <h1 className="text-2xl font-semibold leading-normal text-gray-800">{categoryName}</h1>
                        <p className="text-base leading-4 text-gray-600 mt-2">({products.length} sản phẩm.)</p>
                    </div>
                </div>

                <button className="hover:text-gray-500 text-gray-600 bg-gray-100 py-3.5 px-3 rounded-sm flex flex-row justify-center items-center space-x-3">
                    <svg className="fill-stroke" width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 14.6452V9.33875" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 6.30645V1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 14.6452V7.82263" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 4.79032V1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 14.6452V10.8549" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 7.82258V1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 9.33875H7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 4.79028H15" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M17 10.8549H23" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <p className="hidden md:block text-sm leading-none">Filters</p>
                </button>
            </div> : '' }
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
			footerMenu2: data?.footerMenu2?.nodes ? data.footerMenu2.nodes : {},
			mobileMenu: data?.mobileMenu?.nodes ? data.mobileMenu.nodes : {},
			siteSeo: data?.siteSeo?.schema ? data.siteSeo.schema : {},
            categoryName: data?.productCategory?.name ?? '',
            image: data?.productCategory?.image ?? {},
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
