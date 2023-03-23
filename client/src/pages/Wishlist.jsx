import { wishlistActions } from "../redux/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  console.log()
  return (
    <div className="min-h-[80vh]">
      {wishlist && wishlist.map((item) => {
        return <div key={item._id}>
          <h2>{item.title}</h2>
          <p>{item.price}</p>
          <button
            onClick={() =>
              dispatch(wishlistActions.removeFromWishlist(item))
            }
          >
            Remove
          </button>
        </div>;
      })}
    </div>
  );
};

export default Wishlist;
