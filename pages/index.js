import Head from 'next/head'
import {CMS_NAME,CMS_URL,FB_PAGE_ID} from "../lib/constants"
import Layout from "../src/components/Layout";
import Product from "../src/components/Product";
import client from '../src/components/ApolloClient';
import ParentCategoriesBlock from "../src/components/category/category-block/ParentCategoriesBlock";
import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";
import HeroCarousel from "../src/components/home/hero-carousel";
import parse from 'html-react-parser';


export default function Home (props) {

	const { homePage, products, productOnSales, productCategories, heroCarousel, cmsName, fbPageId, siteSeo, mainMenu, mobileMenu, footerMenu } = props || {};
	const fullHead = parse(homePage?.seo?.fullHead);

	return (
			<Layout fbPageId={fbPageId} siteSeo={siteSeo} mainMenu={mainMenu} mobileMenu={mobileMenu} footerMenu={footerMenu}>
				<Head>
					{ fullHead }
				</Head>
				{/*Hero Carousel*/}
				<HeroCarousel heroCarousel={heroCarousel}/>
				{/*Categories*/ }
				<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
						<h2 class="text-2xl font-bold text-gray-900">Danh mục</h2>
						<ParentCategoriesBlock productCategories={ productCategories }/>
					</div>
				</div>
				{/*Products OnSale*/ }
				<div className="products container mx-auto my-32 px-4 xl:px-0">
					<h2 className="products-main-title main-title mb-5 text-xl uppercase"><span className="main-title-inner">Flash Sale</span></h2>
					<div className="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center">
						{ productOnSales.length ? (
							productOnSales.map( product => <Product key={ product.id } product={ product }/> )
						) : '' }
					</div>
				</div>
				{/*Products*/ }
				<div className="products container mx-auto my-32 px-4 xl:px-0">
					<h2 className="products-main-title main-title mb-5 text-xl uppercase"><span className="main-title-inner">Được khuyến nghị</span></h2>
					<div className="mt-10 grid lg:grid-cols-2 gap-x-8 gap-y-8 items-center">
						{ products.length ? (
							products.map( product => <Product key={ product.id } product={ product }/> )
						) : '' }
					</div>
				</div>

			</Layout>
	)
};

export async function getStaticProps () {

	const { data } = await client.query( {
		query: PRODUCTS_AND_CATEGORIES_QUERY,
	} );

	return {
		props: {
			mainMenu: data?.mainMenu?.nodes ? data.mainMenu.nodes : {},
			footerMenu: data?.footerMenu?.nodes ? data.footerMenu.nodes : {},
			mobileMenu: data?.mobileMenu?.nodes ? data.mobileMenu.nodes : {},
			siteSeo: data?.siteSeo?.schema ? data.siteSeo.schema : {},
			productCategories: data?.productCategories?.nodes ? data.productCategories.nodes : [],
			productOnSales: data?.productOnSales?.nodes ? data.productOnSales.nodes : [],
			products: data?.products?.nodes ? data.products.nodes : [],
			heroCarousel: data?.heroCarousel?.nodes[0]?.children?.nodes ? data.heroCarousel.nodes[0].children.nodes : [],
			homePage: data?.pageBy,
			cmsName: CMS_NAME,
			fbPageId: FB_PAGE_ID
		},
		revalidate: 1
	}

};
