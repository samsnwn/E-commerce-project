import { Link } from "react-router-dom";

const CategoryItem = ({ item }) => {
  return (
    <div className="flex-1 m-1 h-[40vh] relative min-w-[200px] rounded-lg">
      <Link to={`/products/${item.cat}`}>
        <img src={item.img} alt="" className="w-full h-full object-cover rounded-lg" />
        <div className="absolute h-full w-full top-0 left-0 flex items-center justify-center flex-col">
          <h1 className="text-white mb-4 text-extrabold text-xl"><b>{item.title}</b></h1>
          <button className="p-4 border-none bg-white text-gray-500 font-semibold hover:opacity-90 rounded">
            SHOP NOW
          </button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
