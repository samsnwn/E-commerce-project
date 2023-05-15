import { useDispatch, useSelector } from "react-redux";
import RemoveOutlined from "@mui/icons-material/RemoveOutlined";
import { cartActions } from "../../redux/cartSlice";

const CartProduct = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCart = (product) => {
    dispatch(cartActions.removeFromCart(product));
  };

  return (
    <>
    <div className="info flex-[3]">
      {cart.products.length > 0 && cart.products.map((product, i) => (
        <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-4 w-[80%]">
      <div className="flex items-center space-x-4">
        <img
          src={product.image}
          alt={product.title}
          className=" h-[200px] object-cover rounded-md w-[200px]"
        />
        <div>
          <h3 className="text-lg font-medium">{product.title}</h3>
          <p className="text-gray-500 text-sm mt-1">${product.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="text-gray-600 hover:text-gray-800" onClick={()=> removeFromCart(product)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-minus-circle"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </button>
      
      </div>
    </div>
      ))}
      </div>
    </>
    // <div className="info flex-[3]">
    //         {cart.products.map((product, i) => (
    //           <div className="product flex justify-between" key={i}>
    //             <div className="productDetail flex flex-[2 2 0%]">
    //               <img
    //                 className="w-[200px]"
    //                 src={product.image}
    //                 alt=""
    //               />
    //               <div className="details flex flex-col p-5 justify-around">
    //                 <span className="productName">
    //                   {" "}
    //                   <b>Product:</b> {product.title}
    //                 </span>
    //                 <span className="productId">
    //                   {" "}
    //                   <b>ID:</b> {product._id}
    //                 </span>
    //                 <div className="productColor w-[20px] h-[20px] rounded-full bg-gray-400">
    //                   {product.color}
    //                   {" "}
    //                 </div>
    //                 <div className="productSize">
    //                   {" "}
    //                   <b>Size:</b> {product.size}
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="priceDetail flex items-center justify-center flex-1 flex-col">
    //               <div className="amountContainer flex items-center mb-5">
    //                 <button onClick={()=> removeFromCart(product)}>
    //                 <RemoveOutlined />Remove
    //                 </button>
    //               </div>
    //               <div className="productPrice text-3xl font-extralight">
    //                 {product.price}€
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
  );
};

export default CartProduct;
