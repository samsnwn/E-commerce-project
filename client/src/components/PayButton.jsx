import axios from "axios";
import { useSelector } from "react-redux";
import baseUrl from "../config/config";

const PayButton = ({ cart }) => {

  const handleCheckout = async (e) => {
    // try {
    //   if (user) {
    //     const res = await axios.post(
    //       `${baseUrl}/stripe/create-checkout-session`,
    //       { cart, userId: user._id }
    //     );
    //     if (res.data.url) {
    //       window.location.href = res.data.url;
    //     }
    //   } else {
    //     const res = await axios.post(
    //       `${baseUrl}/stripe/create-checkout-session`,
    //       cart
    //     );
    //     if (res.data.url) {
    //       window.location.href = res.data.url;
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const res = await axios.post(
        `${baseUrl}/stripe/create-checkout-session`,
        cart
      );
      // if(res) {
      //   const order = await axios.post(`${baseUrl}/orders/create`)
      // }
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={() => handleCheckout()}
        className="w-full p-2 bg-black text-white font-bold "
      >
        Checkout
      </button>
    </>
  );
};

export default PayButton;
