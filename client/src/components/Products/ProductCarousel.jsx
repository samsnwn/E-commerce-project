import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useGetProductQuery } from "../../redux/productsApiSlice";
import { useParams } from "react-router-dom";




const ProductCarousel = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useGetProductQuery(productId);


  return (
    <Carousel
    className="max-w-[500px] mx-auto"
      infiniteLoop={true}
      showThumbs={true}
      showIndicators={true}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      autoPlay={false} // make true forauto play
      interval={3500}
      transitionTime={1000}
    >
      {Object.values(data.image).map((image, index) => (
        <Box key={`carousel-image-${index}`}>
          <img 
          className="max-w-[700px]"
            src={image}
            alt={`carousel-${index}`}
            // style={{
            //   height: "500px",
            //   objectFit: "contain",
            //   // backgroundAttachment: "fixed",
            // }}
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;