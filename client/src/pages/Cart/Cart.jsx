import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PayButton from "../../components/PayButton";
import OrderSummary from "../../components/OrderSummary";
import CartItem from "../../components/Products/CartItem";
import Container from "../../components/UI/Container";
import Button from "../../components/UI/Button";
// import {useGetProductsQuery} from "../../redux/productsApiSlice"
import { useEffect, useState } from "react";
import ProductComponent from "../../components/Products/ProductComponent";
import axios from "axios";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  // const [data, {isLoading}] = useGetProductsQuery()

  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`/api/products`);
        setProducts(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const newArrivalsItems = products
    ?.sort((a, b) => a.createdAt > b.createdAt)
    .slice(0, 5);

  return (
    <section className="min-h-[90vh] max-w-[1600px] mx-auto">
      <div className="p-5">
        <h1 className="text-2xl m-6 text-center">Your BAG</h1>
        <div className="flex items-center p-4 justify-between">
          <Link
            to="/products"
            className="p-3 font-semibold cursor-pointer border border-black-400"
          >
            CONTINUE SHOPPING
          </Link>
          <Link to="/wishlist" className="underline cursor-pointer mx-2">
            Your Wishlist({wishlistItems.length})
          </Link>
        </div>
      </div>

      {cartItems.length <= 0 ? (
        <div className="text-center">
          <h1 className="text-3xl p-10">Your cart is empty</h1>
          <Link
            to="/products"
            className="p-3 font-semibold cursor-pointer border border-black-400 "
          >
            CONTINUE SHOPPING
          </Link>
          <div className="mt-20">
            <h3 className="text-xl">Or check out our new releases</h3>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row p-4 md:p-8 justify-between gap-10">
          <div className="lg:flex-1">
            {cartItems &&
              cartItems.map((item, i) => <CartItem item={item} key={i} />)}
          </div>
          <OrderSummary>
            {/* <PayButton cart={cartItems} /> */}
            <Link to="/shipping">
              {" "}
              <Button outline label={"Checkout"}></Button>
            </Link>
          </OrderSummary>
        </div>
      )}
      <div className="flex p-4 flex-wrap justify-between my-5">
        {newArrivalsItems &&
          newArrivalsItems.map((item) => (
            <ProductComponent product={item} key={item._id} />
          ))}
      </div>
    </section>
  );
};

export default Cart;
