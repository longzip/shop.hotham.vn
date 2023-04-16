const CheckoutCartItem = ({ item: { key, product, quantity, total } }) => {
  return (
    <tr className="woo-next-cart-item" key={key}>
      {/* <td className="woo-next-cart-element">
				<img width="64" src={ item.image.sourceUrl } srcSet={ item.image.srcSet } alt={item.image.title}/>
			</td> */}
      <td className="woo-next-cart-element">
        {product.node.name}
        <strong>{` x ${quantity}`}</strong>
      </td>
      <td className="woo-next-cart-element">{total}</td>
    </tr>
  );
};

export default CheckoutCartItem;
