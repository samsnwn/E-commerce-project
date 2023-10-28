import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { sliderItems } from "../assets/api/salesData";
import { Link } from "react-router-dom";

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:900px)");

  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
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
      autoPlay={true} // make true forauto play
      interval={3500}
      transitionTime={1000}
    >
      {sliderItems.map((item, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={item.img}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: "700px",
              objectFit: "cover",
              backgroundAttachment: "fixed",
            }}
          />
          <Box
            color="white"
            padding="20px"
            borderRadius="10px"
            textAlign={isNonMobile ? "left" : "center"}
            backgroundColor="rgb(0, 0, 0, 0.4)"
            position="absolute"
            top="46%"
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "60%"}
          >
            {/* <Typography >{item.desc}</Typography> */}
            <Typography fontSize={isNonMobile ? "4rem" : "2rem"}>{item.title}</Typography>
            <Typography
              fontWeight="bold"
              // color={shades.secondary[300]}
              sx={{ textDecoration: "underline" }}
            >
              <Link to="/products">DISCOVER ALL</Link>
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;