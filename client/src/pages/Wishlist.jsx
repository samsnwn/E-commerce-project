import WishlistItem from "../components/Products/WishlistItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductComponent from "../components/Products/ProductComponent";
import axios from "axios";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

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
    <div className="min-h-[80vh]">
      {wishlistItems.length <= 0 ? (
        <div className="flex flex-col items-center m-6 gap-5">
          <h1 className="text-3xl">Your wishlist is empty</h1>
          <Link
            to="/products"
            className="p-3 font-semibold cursor-pointer border border-black-400"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <WishlistItem />
      )}
      <div className="mt-20">
        <h3 className="text-xl text-center">Check out our new releases</h3>
      </div>
      <div className="flex p-4 flex-wrap justify-between my-5">
        {newArrivalsItems &&
          newArrivalsItems.map((item) => (
            <ProductComponent product={item} key={item._id} />
          ))}
      </div>
    </div>
  );
};

export default Wishlist;
