  
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../TopSpiritualCarousel/TopSpiritualCarousel.css";
import { useRouter } from "next/router";

export const TopSpiritualCarousel = () => {
  const { places } = useSelector((state) => state.places);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const filteredPLaces = places.filter(filtered => filtered.category_id.name === "Spiritual");

  const getVisiblePlaces = (startIndex, data) => {
    const total = data.length;
    if (total === 0) return [];

    const endIndex = startIndex + 3;

    if (endIndex <= total) {
      return data.slice(startIndex, endIndex);
    } else {
      return [...data.slice(startIndex, total), ...data.slice(0, endIndex - total)];
    }
  };

  const visiblePlaces = getVisiblePlaces(activeIndex, filteredPLaces);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % filteredPLaces.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [filteredPLaces.length]);


  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % filteredPLaces.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + filteredPLaces.length) % filteredPLaces.length);
  };

  const handleClick =(id)=>{
      router.push(`/placeDetails/${id}`)
  }

  const handleDiscoverMore = ()=>{
    router.push('/places');
  }

  return (
    <Box className="Slider1-Outer">
      <Box sx={{marginLeft:"11%", display:"inline-block"}}>
        <Stack gap={1}>
          
          <Typography variant="h4" sx={{color: "#89874D", fontWeight: "700" }}>
            TOP SPIRITUAL PLACES
          </Typography>
          <Typography variant="body1" sx={{ color: "#89874D" }}>
            Discover the essence of India.
          </Typography>
          <Box>
            <Button onClick={handleDiscoverMore} sx={{ color: "black" }} color="inherit" variant="contained">
              Discover More
            </Button>
          </Box>
        </Stack>
      </Box>
      {/* -------------------------------------------------------------------------------------- */}
      <div className="custom-slider-container">
        <div className="custom-slider-wrapper">
          {visiblePlaces.map((image, index) => (
            <div onClick={()=>{handleClick(image._id)}}
              key={image.id}
              className={`custom-slider-image ${
                index === 2 ? "custom-slider-image-large" : "custom-slider-image-small"
              }`}
            >
              <div className="img-div">
                <img src={image.image_id.pictures[0]} alt={image.name} />
              </div>
              <div className="custom-slider-image-content">
                <Typography sx={{ fontWeight: "700" }} className="custom-slider-title">
                  {image.name}
                </Typography>
                <Typography sx={{ fontSize: "0.8rem", marginBottom: "2px" }} className="custom-slider-description">
                  {image.description.length > 100
                    ? `${image.description.slice(0, 140)}...`
                    : image.description}
                </Typography>
                <div className="custom-slider-footer">
                  <LocationOnIcon className="custom-slider-location-icon" />
                  <div className="custom-slider-location">
                    <Typography variant="body2" fontWeight="700" fontSize="0.9rem">
                      {image.location_id.name}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* -------------------------------------------------------------------------------------------- */}
        <div className="custom-navigation-buttons">
          <IconButton onClick={handlePrev}>
            <ArrowBackIosNewIcon sx={{ padding: "3px", fontSize: "20px", border: "2px solid black", borderRadius: "20px" }} />
          </IconButton>
          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon sx={{ padding: "3px", fontSize: "20px", border: "2px solid black", borderRadius: "20px" }} />
          </IconButton>
        </div>
      </div>
    </Box>
  );
};

export default TopSpiritualCarousel;
