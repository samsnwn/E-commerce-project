import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Col } from "react-bootstrap";
import Container from "../../components/UI/Container";
import CheckoutSteps from "../../components/CheckoutSteps";
import { savePaymentMethod } from "../../redux/cartSlice";
import Button from "../../components/UI/Button"



const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const {shippingAddress} = cart

  useEffect(() => {
    if(!shippingAddress) {
      navigate("/shipping")
    }
  }, [shippingAddress, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
      dispatch(savePaymentMethod(paymentMethod))
      navigate("/placeorder")
  }

  return (
    <div className="sm:w-[80%] lg:w-2/3 mx-auto p-5 md:px-9 max-w-[1500px]">
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-2xl">Payment Method</h1>
      <Form onSubmit={submitHandler} className="mt-4">
        <Form.Group>
          <Form.Label>Select Method:</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button submit outline  className="my-2 w-full" label={"Confirm Order"}>
        </Button>
      </Form>
    </div>
  );
};

export default PaymentScreen;
