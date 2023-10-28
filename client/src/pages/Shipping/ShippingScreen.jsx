import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "../../components/UI/Button"
import Container from "../../components/UI/Container";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { saveShippingAddress } from "../../redux/cartSlice";
import CheckoutSteps from "../../components/CheckoutSteps";
import { Input } from "@nextui-org/react";
import { savePaymentMethod } from "../../redux/cartSlice";



const ShippingScreen = () => {
  const cart = useSelector(state => state.cart);
  const {shippingAddress} = cart
  const [paymentMethod, setPaymentMethod] = useState("PayPal");


  const [shippingInfo, setShippingInfo] = useState({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    postalCode: shippingAddress?.postalCode || "",
    country: shippingAddress?.country || "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {search} = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect') || "/"

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
    dispatch(savePaymentMethod(paymentMethod))
    navigate("/placeorder")
  };

  return (
    <div className="sm:w-[80%] lg:w-2/3 mx-auto p-5 md:px-9 max-w-[1500px]">
      <CheckoutSteps step1 step2/>
      <h1 className="text-2xl">Shipping</h1>
      <form className="flex flex-col mt-4" onSubmit={submitHandler}>
          <Input
            onChange={onChangeHandler}
            type="text"
            clearable
            underlined
            label="Address"
            className="input"
            placeholder="Enter your address"
            name="address"
            value={shippingInfo?.address}
          />
          <Input
            onChange={onChangeHandler}
            underlined
            clearable
            label="City"
            placeholder="Enter your city"
            className="input"
            name="city"
            type="text"
            value={shippingInfo?.city}
          />
          <Input
            onChange={onChangeHandler}
            underlined
            clearable
            label="Postal code"
            placeholder="Enter your postal code"
            className="input"
            name="postalCode"
            type="text"
            value={shippingInfo?.postalCode}
          />
          <Input
            onChange={onChangeHandler}
            underlined
            clearable
            label="Country"
            placeholder="Enter your country"
            className="input"
            name="country"
            type="text"
            value={shippingInfo?.country}
          />
        <Button type="submit" className="my-5" label={"Order summary"} outline>

        </Button>
        </form>



      {/* <Form onSubmit={submitHandler}>
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
      </Form> */}
    </div>
  );
};

export default ShippingScreen;
