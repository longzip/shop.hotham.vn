import Layout from "../src/components/Layout";
import Product from "../src/components/Product";
import client from '../src/components/ApolloClient';
import CUA_HANG_QUERY from "../src/queries/cua-hang";

export default function CuaHang ({ products, siteSeo, mainMenu, mobileMenu, footerMenu, footerMenu2 }) {

	return (
			<Layout  siteSeo={siteSeo} mainMenu={mainMenu} mobileMenu={mobileMenu} footerMenu={footerMenu} footerMenu2={footerMenu2}>
				{/*Products*/ }
				<div className="products container mx-auto my-32 px-4 xl:px-0">
					<h2 className="products-main-title main-title mb-5 text-xl uppercase"><span className="main-title-inner">Được khuyến nghị</span></h2>
					<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
		query: CUA_HANG_QUERY,
	} );

	return {
		props: {
			mainMenu: data?.mainMenu?.nodes ? data.mainMenu.nodes : {},
			footerMenu: data?.footerMenu?.nodes ? data.footerMenu.nodes : {},
			footerMenu2: data?.footerMenu2?.nodes ? data.footerMenu2.nodes : {},
			mobileMenu: data?.mobileMenu?.nodes ? data.mobileMenu.nodes : {},
			siteSeo: data?.siteSeo?.schema ? data.siteSeo.schema : {},
			products: data?.products?.nodes ? data.products.nodes : []
		},
		revalidate: 1
	}

};
