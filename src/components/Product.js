import Link from 'next/link';
import AddToCartButton from '../components/cart/AddToCartButton';
import Price from "./single-product/price";
// import Image from "../image";
// import {DEFAULT_PRODUCT_HOME_IMG_URL} from "../constants/urls";

const Product = ( props ) => {
	const { product } = props;

	return (
		// @TODO Need to handle Group products differently.
		undefined !== product && 'GroupProduct' !== product.__typename ? (
			<div className="product shadow-md mb-5">


				<Link href={ `/cua-hang/${ product?.slug }`} >
					<a>
						<img
							className="object-cover bg-gray-100"
							width="308"
							height="308"
							loading="lazy"
							src={ product?.image?.sourceUrl ?? '' }
							// sourceUrl={ product?.image?.sourceUrl ?? '' }
							// defaultImgUrl={DEFAULT_PRODUCT_HOME_IMG_URL}
							altText={product?.image?.altText ?? product?.slug}
						/>
						<div className="product-info p-5">
							<h3 className="product-title mt-3 font-medium text-gray-800">
								{ product.name ? product.name : '' }
							</h3>
							{/* <div className="product-description text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: (product?.description)}}/> */}
							<Price salesPrice={product?.price} regularPrice={product?.regularPrice}/>
						</div>
					</a>
				</Link>
				<div className="product-info">
					<AddToCartButton product={ product }/>
				</div>
			</div>
		) : (
			''
		)
	);
};

export default Product;
