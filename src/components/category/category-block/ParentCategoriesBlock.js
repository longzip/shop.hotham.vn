import ProductCategoryBlock from "./ParentCategoryBlock";

const ParentCategoriesBlock = ( props ) => {

	const { productCategories } = props || {};

	return (
		<div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
			{ productCategories.length ? (
				productCategories.map( ( productCategory, index ) => <ProductCategoryBlock key={ productCategory?.id ?? index }  category={ productCategory }/> )
			) : null }
		</div>
	)

};

export default ParentCategoriesBlock;
