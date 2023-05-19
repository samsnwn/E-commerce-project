import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { cartActions } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { wishlistActions } from "../../redux/wishlistSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useGetProductQuery } from "../../redux/productsApiSlice";
import Loader from "../../components/UI/Loader";
import Message from "../../components/UI/Message";

const ProductPage = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useGetProductQuery(productId);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  // const [product, setProduct] = useState({});
  const cart = useSelector((state) => state.cart);
  // const wishlist = useSelector((state) => state.wishlist.items);

  const [isIncluded, setIsIncluded] = useState(
    cart.products?.some((product) => product._id === id)
  );
  // let isInWishlist = wishlist.some((p) => p._id === product._id);

  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const res = await axios.get(`/api/products/${productId}`);
  //       setProduct(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getProduct();
  // }, [productId]);

  const handleAddToCart = () => {
    setIsIncluded(true);
    dispatch(cartActions.addToCart({...data}));
  };
  const handleRemoveFromCart = () => {
    setIsIncluded(false);
    dispatch(cartActions.removeFromCart(data));
  };

  // const handleAddToWishlist = () => {
  //   isInWishlist = true;
  //   dispatch(wishlistActions.addToWishlist(product));
  // };
  // const handleRemoveFromWishlist = (product) => {
  //   isInWishlist = false;
  //   dispatch(wishlistActions.removeFromWishlist(product));
  // };

  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
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
                onClick={handleRemoveFromCart}
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
            {/* {isInWishlist ? (
              <button
                className="p-3 border border-teal-300 rounded-lg font-semibold hover:bg-[#fae9e9]"
                onClick={()=>handleRemoveFromWishlist(product)}
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
            )} */}
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
