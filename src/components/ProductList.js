import Product from "./Product";
const ProductList = ({ products }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
    {products?.length
      ? products.map((product) => (
          <Product key={product.id} product={product} />
        ))
      : ""}
  </div>
);

export default ProductList;
