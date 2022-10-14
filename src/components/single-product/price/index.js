import {isEmpty} from "lodash";

const Price = ({ regularPrice = 0, salesPrice }) => {

    if ( isEmpty( salesPrice ) ) {
    	return null;
    }

    /**
     * Get discount percent.
     *
     * @param {String} regularPrice
     * @param {String} salesPrice
     */
    const discountPercent = ( regularPrice, salesPrice ) => {
        if( isEmpty( regularPrice ) || isEmpty(salesPrice) ) {
            return null;
        }

        const formattedRegularPrice = parseInt( regularPrice?.substring(1) );
        const formattedSalesPrice = parseInt( salesPrice?.substring(1) );

        const discountPercent = ( ( formattedRegularPrice - formattedSalesPrice ) / formattedRegularPrice ) * 100;

        return {
            discountPercent: formattedSalesPrice !== formattedRegularPrice ? `(${discountPercent.toFixed(2)}%) GIẢM` : null,
            strikeThroughClass: formattedSalesPrice < formattedRegularPrice ? 'product-regular-price mr-2 line-through text-sm text-gray-600 font-normal' : ''
        }
    }

    const productMeta = discountPercent( regularPrice, salesPrice );

    return (
        <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">
            {/* Regular price */}
            { productMeta?.discountPercent ? <span className="product-price mr-2">{salesPrice}</span> : null }

            {/* Discounted price */}
            <span className={productMeta?.strikeThroughClass}>{ regularPrice }</span>

            {/* Discount percent */}
            <span className="product-discount text-green-600 font-bold text-sm font-normal">{productMeta?.discountPercent}</span>
        </p>
    )
}

export default Price
