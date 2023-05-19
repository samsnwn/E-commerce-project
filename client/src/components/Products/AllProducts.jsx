import ProductComponent from "./ProductComponent";
import { useGetProductsQuery } from "../../redux/productsApiSlice";
import Loader from "../UI/Loader";
import Message from "../UI/Message";


const Products = ({ cat, filters, sort }) => {
  // const [products, setProducts] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState([]);

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const res = await axios.get(
  //         cat
  //         ? `/api/products?category=${cat}`
  //         : `/api/products`
  //         );
  //       setProducts(res.data.products);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getProducts();
  // }, [cat]);

  const { data, isLoading, error } = useGetProductsQuery();

  // useEffect(() => {
  //   cat &&
  //     setFilteredProducts(
  //       products.filter((item) =>
  //         Object.entries(filters).every(([key, value]) =>
  //           item[key].includes(value)
  //         )
  //       )
  //     );
  // }, [cat, filters, products]);

  // useEffect(() => {
  //   if (sort === "newest") {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => a.createdAt - b.createdAt)
  //     );
  //   } else if (sort === "asc") {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => a.price - b.price)
  //     );
  //   } else {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => b.price - a.price)
  //     );
  //   }
  // }, [sort]);

  return (
    <div>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="flex p-4 flex-wrap justify-between">
          {data.products.map((product, index) => (
            <ProductComponent key={index} product={product} />
          ))}
        </div>
      )}
      {/* {cat ? filteredProducts.map((product, index) => ( 
        <ProductComponent key={index} product={product} />
      )): products.map((product, index) => (
        <ProductComponent key={index} product={product} />
     ))} */}
    </div>
  );
};

export default Products;
