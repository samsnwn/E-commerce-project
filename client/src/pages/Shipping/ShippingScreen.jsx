import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Container from "../../components/UI/Container";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../redux/cartSlice";
import CheckoutSteps from "../../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector(state => state.cart);
  const {shippingAddress} = cart

  const [shippingInfo, setShippingInfo] = useState({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    postalCode: shippingAddress?.postalCode || "",
    country: shippingAddress?.country || "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const value = e.target.value.trim();
    setShippingInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shippingInfo))
    navigate("/payment")
  };

  return (
    <Container>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-2">
          <Form.Label className="">Address </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={shippingInfo?.address}
            onChange={onChangeHandler}
            name="address"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-2">
          <Form.Label className="">City </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your city"
            value={shippingInfo?.city}
            onChange={onChangeHandler}
            name="city"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label className="">Postal Code </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your postal code"
            value={shippingInfo?.postalCode}
            onChange={onChangeHandler}
            name="postalCode"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="my-2">
          <Form.Label className="">Country </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your country"
            value={shippingInfo?.country}
            onChange={onChangeHandler}
            name="country"
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </Container>
  );
};

export default ShippingScreen;
