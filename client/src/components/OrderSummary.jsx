import React from 'react'
import { useSelector } from 'react-redux';
import PayButton from './PayButton';
import { Link } from 'react-router-dom';

const OrderSummary = ({children}) => {

  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart

  return (
    <div className="bottom flex justify-between">
    <div
      className={`summary flex-1 border border-thin rounded-xl p-4 ${
        cartItems.length <= 0 && "hidden"
      }`}
    >
      <div className="summaryTitle font-semibold text-2xl">
        ORDER SUMMARY
      </div>
      <div>
        {cartItems.length > 0 && cartItems.map((product) => (
          <div key={product._id} className="summaryItem">
            <span className="summaryItemText">1x {product.title}</span>
            <span className="summaryItemPrice">{product.price}€</span>
          </div>
        ))}
      </div>
      <div className="h-[5px] w-full border"></div>
      <div className="summaryItem  font-extrabold">
        <span className="summaryItemText">Subtotal</span>
        <span className="summaryItemPrice">{cartItems.reduce((acc,item) => acc + item.price, 0)}€</span>
      </div>
      {children}
    </div>
  </div>
  )
}

export default OrderSummary