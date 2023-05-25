import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutSteps from "../../components/CheckoutSteps";
import { toast } from "react-toastify";
import Message from "../../components/UI/Message";
import Loader from "../../components/UI/Loader";
import { useCreateOrderMutation } from "../../redux/ordersApiSlice";
import { clearCartItems } from "../../redux/cartSlice";
import OrderSummary from "../../components/OrderSummary";
import Button from "../../components/UI/Button";
import axios from "axios";
import baseUrl from "../../config/config";

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
      }
      const res = await createOrder(finalOrder).unwrap()
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex justify-between">
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address} , {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items:</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup>
                  {cart.cartItems.map((item, index) => (
                    <div key={index}>
                      <div className="flex">
                        <div md={1}>
                          <Image src={item.image} alt={item.name} />
                        </div>
                        <div>
                          <Link to={`/product/${item._id}`}>{item.title}</Link>
                        </div>
                        <div>{item.price}€</div>
                      </div>
                    </div>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <OrderSummary>
            <div className="flex justify-between">
              <h2>Shipping</h2>
              <p>{cart.shippingPrice}€</p>
            </div>
            <div className="flex justify-between">
              <h2>Taxes</h2>
              <p>{cart.taxPrice}€</p>
            </div>
            <div className="flex justify-between">
              <h2>
                <strong>Total</strong>
              </h2>
              <strong>{cart.totalPrice}€</strong>
            </div>
            <div>{error && <Message />}</div>
            <Button
              disabled={cart.cartItems.length === 0}
              label="Place Order"
              onClick={placeOrderHandler}
            ></Button>
            {isLoading && <Loader />}
          </OrderSummary>
        </Col>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
