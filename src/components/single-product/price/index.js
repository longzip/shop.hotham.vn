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
            discountPercent: formattedSalesPrice !== formattedRegularPrice ? `${discountPercent.toFixed(0)}% GIẢM` : null,
            strikeThroughClass: formattedSalesPrice < formattedRegularPrice ? 'line-through' : 'text-red-600 font-bold'
        }
    }

    const productMeta = discountPercent( regularPrice, salesPrice );

    return (
        <p className="flex my-4 space-x-3 items-center justify-center">
            {/* Regular price */}
            { productMeta?.discountPercent ? <span className="text-red-600 font-bold">{salesPrice}</span> : null }

            {/* Discounted price */}
            <span className={productMeta?.strikeThroughClass}>{ regularPrice }</span>

            {/* Discount percent */}
            { productMeta?.discountPercent ? <span className="absolute px-3 py-2 border border-red-600 top-0 right-0 text-red-600 bg-white rounded">{productMeta?.discountPercent}</span> : null}
        </p>
    )
}

export default Price
