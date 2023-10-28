import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps";
import Message from "../../components/UI/Message";
import Loader from "../../components/UI/Loader";
import { useCreateOrderMutation } from "../../redux/ordersApiSlice";
import { clearCartItems } from "../../redux/cartSlice";
import OrderSummary from "../../components/OrderSummary";
import Button from "../../components/UI/Button";
import OrderItem from "../../components/Products/OrderItem";
import Container from "../../components/UI/Container";

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    } else {
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const finalOrder = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      };
      const res = await createOrder(finalOrder).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sm:w-[80%] lg:w-2/3 mx-auto p-5 md:px-2 max-w-[1500px]">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex flex-col md:flex-row gap-10">
        <div className="lg:flex-1">
          <div className="mb-4">
            <h2>Shipping information</h2>
            <p>
              <strong>Address: </strong>
              {cart.shippingAddress.address} , {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>
        <div className="border border-slate-200 h-[2px] rounded-md mb-2"></div>

          <ul>
            <h2 className="mb-2">Order Items:</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your Cart is empty</Message>
            ) : (
              <li>
                {cart.cartItems.map((item, index) => (
                  <OrderItem item={item} key={index} />
                ))}
              </li>
            )}
          </ul>
        </div>

        <div className="border border-slate-200 h-[2px] rounded-md mb-2"></div>
        <OrderSummary>
          <div className="flex justify-between">
            <h2>Shipping</h2>
            <p>{cart.shippingPrice}€</p>
          </div>
          <div className="flex justify-between">
            <h2>Taxes</h2>
            <p>{cart.taxPrice}€</p>
          </div>
          <div className="flex justify-between mb-4">
            <h2>
              <strong>Total</strong>
            </h2>
            <strong>{cart.totalPrice}€</strong>
          </div>
          <div>{error && <Message />}</div>
          <Button
          outline
            disabled={cart.cartItems.length === 0}
            label="Go to payment"
            onClick={placeOrderHandler}
          ></Button>
          {isLoading && <Loader />}
        </OrderSummary>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
