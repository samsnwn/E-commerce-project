import React, {useState} from 'react'
import { useSelector } from "react-redux";
import AddOutlined from "@mui/icons-material/AddOutlined";
import RemoveOutlined from "@mui/icons-material/RemoveOutlined";

const CartProduct = () => {

  const cart = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState();


  const handleQuantity = (method) => {
    if(method === 'decrease') {
      quantity > 1 && setQuantity(quantity - 1)
    } else {
      setQuantity(quantity + 1);
    }
  }

  return (
    <div className="info flex-[3]">
            {cart.products.map((product, i) => (
              <div className="product flex justify-between" key={i}>
                <div className="productDetail flex flex-[2 2 0%]">
                  <img
                    className="w-[200px]"
                    src={product.image}
                    alt=""
                  />
                  <div className="details flex flex-col p-5 justify-around">
                    <span className="productName">
                      {" "}
                      <b>Product:</b> {product.title}
                    </span>
                    <span className="productId">
                      {" "}
                      <b>ID:</b> {product._id}
                    </span>
                    <div className="productColor w-[20px] h-[20px] rounded-full bg-gray-400">
                      {product.color}
                      {" "}
                    </div>
                    <div className="productSize">
                      {" "}
                      <b>Size:</b> {product.size}
                    </div>
                  </div>
                </div>

                <div className="priceDetail flex items-center justify-center flex-1 flex-col">
                  <div className="amountContainer flex items-center mb-5">
                    <button>
                    <RemoveOutlined onClick={()=>console.log(product.quantity)}/>
                    </button>
                    <div className="productAmount text-2xl m-0.5">{product.quantity}</div>

                    <button >
                    <AddOutlined onClick={()=>handleQuantity('increase')}/>
                    </button>
                  </div>
                  <div className="productPrice text-3xl font-extralight">
                    {product.price*product.quantity}€
                  </div>
                </div>
              </div>
            ))}
          </div>
  )
}

export default CartProduct