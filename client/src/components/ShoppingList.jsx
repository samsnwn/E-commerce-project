import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductComponent from "./Products/ProductComponent"
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";

const ShoppingList = ({cat}) => {
  const [value, setValue] = useState("all");
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
          ? `api/products?category=${cat}`
          : `api/products`
          );
        setProducts(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  // Sort incoming array by createdAt and the slice array and return 10 newest items
  const newArrivalsItems = products.sort(
    (a,b) => a.createdAt > b.createdAt
  ).slice(0,10);
  // const bestSellersItems = items.filter(
  //   (item) => item.attributes.category === "bestSellers"
  // );

  return (
    <Box width="80%" margin="80px auto">
      <h3 className="text-center text-5xl">
        Our Featured <b>Products</b>
      </h3>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        display="flex"
        flexWrap="wrap"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          products.map((item) => (
            <ProductComponent product={item} key={item._id} />
          ))}
        {value === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <ProductComponent product={item} key={item._id} />
          ))}
        {/* {value === "bestSellers" &&
          bestSellersItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))} */}
      </Box>
    </Box>
  );
};

export default ShoppingList;