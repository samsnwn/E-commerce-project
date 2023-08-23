import { useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useGetProductQuery } from "../../redux/productsApiSlice";
import Loader from "../../components/UI/Loader";
import Message from "../../components/UI/Message";

const ProductPage = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useGetProductQuery(productId);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [isIncluded, setIsIncluded] = useState(
    cartItems.some((product) => product._id === productId)
  );

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const [isInWishlist, setIsInWishlist] = useState(
    wishlistItems.some((product) => product._id === productId)
  );

  const handleAddToCart = async () => {
    setIsIncluded(true);
    dispatch(addToCart({ ...data }));
  };
  const handleRemoveFromCart = async (id) => {
    setIsIncluded(false);
    dispatch(removeFromCart(id));
  };

  const handleAddToWishlist = async () => {
    setIsInWishlist(true);
    dispatch(addToWishlist({ ...data }));
  };
  const handleRemoveFromWishlist = async (id) => {
    setIsInWishlist(false);
    dispatch(removeFromWishlist(id));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="p-5 flex">
          <div className="flex-1 ">
            <img
              src={data.image}
              alt=""
              className="w-full h-[90vh] object-cover"
            />
          </div>
          <div className="flex-1 px-5">
            <h1 className="font-extralight">{data.title}</h1>
            <p className="my-4"> {data.description}</p> 
            <span className="font-thin text-4xl">{data.price}€</span>
            {/* Filter Container */}
            <div className="flex justify-between w-[50%] my-3">
              <div className="filter">
                <span className="text-xl font-extralight">
                  Size {data.size}
                </span>
              </div>
            </div>
            {/* Add Container */}
            <div className="flex items-center w-1/2 justify-between">
              {isIncluded ? (
                <button
                  className="p-3 border border-teal-300 rounded-lg font-semibold hover:bg-[#fae9e9]"
                  onClick={() => handleRemoveFromCart(data._id)}
                >
                  Remove from cart
                </button>
              ) : (
                <button
                  className="p-3 border border-teal-300 rounded-lg font-semibold hover:bg-[#fae9e9]"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              )}
              {isInWishlist ? (
                <button
                  className="p-3 border border-teal-300 rounded-lg font-semibold hover:bg-[#fae9e9]"
                  onClick={() => handleRemoveFromWishlist(data._id)}
                >
                  <FavoriteIcon color="error" />
                </button>
              ) : (
                <button
                  className="p-3 border border-teal-300 rounded-lg font-semibold hover:bg-[#fae9e9]"
                  onClick={handleAddToWishlist}
                >
                  <FavoriteBorderIcon />
                </button>
              )}
            </div>
            {/* <div>
            <Link to={`/products/${product.categories.filter(cat => cat === )}`} relative="path" className="p-3 border border-teal-300 rounded-lg font-semibold hover:bg-[#fae9e9]">See more of this category</Link>
          </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
