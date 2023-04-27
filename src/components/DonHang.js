const DonHang = ({ cart }) => {
  return cart ? (
    <>
      <div>
        <h1 className="text-2xl font-semibold leading-6 text-gray-800">
          Đơn hàng của bạn
        </h1>
      </div>
      <div className="flex mt-7 flex-col items-end w-full space-y-6">
        <div className="flex justify-between w-full items-center">
          <p className="text-lg leading-4 text-gray-600">Sản phẩm</p>
          <p className="text-lg font-semibold leading-4 text-gray-600">
            Tạm tính
          </p>
        </div>
        {cart?.contents?.itemCount &&
          cart.contents.nodes.map((item) => (
            <div
              key={item.key}
              className="flex justify-between w-full items-center"
            >
              <p className="text-lg leading-4 text-gray-600">
                {item.product.node.name}{" "}
                <strong>{` x ${item.quantity}`}</strong>
              </p>
              <p className="text-lg font-semibold leading-4 text-gray-600">
                {item.total}
              </p>
            </div>
          ))}
        <div className="flex justify-between w-full items-center">
          <p className="text-lg leading-4 text-gray-600">Tạm tính</p>
          <p className="text-lg font-semibold leading-4 text-gray-600">
            {cart.subtotal}
          </p>
        </div>
        <div className="flex justify-between w-full items-center">
          <p className="text-lg leading-4 text-gray-600">Giảm giá</p>
          <p className="text-lg font-semibold leading-4 text-gray-600">
            {cart.discountTotal}
          </p>
        </div>
        {/* <div className="flex justify-between w-full items-center">
          <p className="text-lg leading-4 text-gray-600">Giao hàng </p>
          <p className="text-lg font-semibold leading-4 text-gray-600"></p>
        </div> */}
      </div>
      <div className="flex justify-between w-full items-center mt-32">
        <p className="text-xl font-semibold leading-4 text-gray-800">Tổng </p>
        <p className="text-lg font-semibold leading-4 text-gray-800">
          {cart.total}
        </p>
      </div>
    </>
  ) : null;
};

export default DonHang;
