import WishlistItem from "../components/Products/WishlistItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  console.log();
  return (
    <div className="min-h-[80vh]">
      {wishlistItems.length <= 0 ? (
        <div className="self-center">
          <h1>Your wishlist is empty</h1>
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
    </div>
  );
};

export default Wishlist;
