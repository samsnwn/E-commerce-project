import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";

const OrderItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromOrder = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="hover:bg-gray-100 flex justify-between items-center border border-gray-200 rounded-lg mb-2">
      <Link to={`/product/${item._id}`}>
        <div className="flex items-center space-x-4">
          <img
            className=" max-h-[50px] object-cover rounded-md max-w-[50px]"
            src={item.image[0]}
            alt={item.title}
          />
          <div>
            <h3 className="md:text-sm font-medium">{item.title}</h3>
            <p className=" text-xl mt-1">{item.price}€</p>
          </div>

        </div>
      </Link>
      <div className="p-2">
            <button
              className="font-semibold hover:text-red-500 text-gray-500 text-sm"
              onClick={() => handleRemoveFromOrder(item._id)}
            >
              X{" "}
            </button>
          </div>
    </div>
  );
};

export default OrderItem;
