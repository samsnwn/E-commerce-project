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
import cloudinaryConfig from "../../config/cloudinary";
import ProductCarousel from "../../components/Products/ProductCarousel";
import { Container } from "@mui/material";
import { toast } from "react-toastify";

const ProductPage = () => {
  const { cloudName, apiKey, apiSecret } = cloudinaryConfig;
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
    toast.success("item added to cart");
  };
  const handleRemoveFromCart = async (id) => {
    setIsIncluded(false);
    dispatch(removeFromCart(id));
  };

  const handleAddToWishlist = async () => {
    setIsInWishlist(true);
    dispatch(addToWishlist({ ...data }));
    toast.success("item added to Wishlist");
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
        <div className="p-4 md:p-8 lg:flex lg:max-w-[1800px] ">
          {isLoading ? <Loader /> : <ProductCarousel />}
          <div className="p-5 sm:max-w-[500px] sm:mx-auto">
            <h2 className="text-2xl text-center">{data.title}</h2>
            <div className="flex flex-col gap-7 p-7">
              <p className="font-light"> {data.description}</p>
              <span className="font-extralight text-4xl">{data.price}€</span>
              <div className="flex justify-between">
                  <span className="text-xl font-extralight">
                    Size {data.size}
                  </span>
                  <span className="text-xl font-extralight">
                    Brand {data.brand}
                  </span>
              </div>
              {/* Filter Container */}

              {/* Add Container */}
              <div className="flex items-center justify-between">
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
        </div>
      )}
    </>
  );
};

export default ProductPage;
