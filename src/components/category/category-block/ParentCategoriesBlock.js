import ProductCategoryBlock from "./ParentCategoryBlock";

const ParentCategoriesBlock = (props) => {
  const { productCategories } = props || {};

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 space-y-7">
      {productCategories.length
        ? productCategories.map((productCategory, index) => (
            <ProductCategoryBlock
              key={productCategory?.id ?? index}
              category={productCategory}
            />
          ))
        : null}
    </div>
  );
};

export default ParentCategoriesBlock;
