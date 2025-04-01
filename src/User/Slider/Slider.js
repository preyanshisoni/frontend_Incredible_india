import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "./Slider.module.css";

export const Slider = () => {
  const { places } = useSelector((state) => state.places);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const filteredhistoricalPlaces = places.filter(
    (filtered) => filtered.category_id.name === "Heritage"
  );

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % filteredhistoricalPlaces.length
      );
    }, 2000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [filteredhistoricalPlaces.length]);

  const resetAutoSlide = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      startAutoSlide();
    }, 3000);
  };

  const handlePrev = () => {
    resetAutoSlide();
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredhistoricalPlaces.length) %
        filteredhistoricalPlaces.length
    );
  };

  const handleNext = () => {
    resetAutoSlide();
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % filteredhistoricalPlaces.length
    );
  };

  const handleclick = () => {
    router.push(`/places`);
  };

  const handleplaceNavigate = (id) => {
    router.push(`/placeDetails/${id}`);
  };

  const visibleSlides = (index) => {
    const total = filteredhistoricalPlaces.length;
    return [
      filteredhistoricalPlaces[(index - 1 + total) % total],
      filteredhistoricalPlaces[index % total],
      filteredhistoricalPlaces[(index + 1) % total],
    ];
  };

  return (
    <>
      <Box className={styles.sliderWrapper}>
        <Typography
          variant="h4"
          className={styles.sliderTitle}
          sx={{ fontFamily: "Helvetica", fontWeight: "700", mt: 2 }}
        >
          ATTRACTIONS
        </Typography>
        <Typography variant="body1" className={styles.sliderSubtitle}>
          worth a thousand stories
        </Typography>

        <Box className={styles.sliderContainer}>
          <Button sx={{fontSize:"20px", backgroundColor:"#003366", color:"white"}}
            onClick={handlePrev}
            className={`${styles.sliderButton} ${styles.prevButton}`}
            aria-label="Previous Slide"

          >
            <FaArrowLeft />
          </Button>

          <Box className={styles.slider}>
            {visibleSlides(currentIndex).map((image, index) => (
              <Box
                onClick={() => handleplaceNavigate(image._id)}
                key={index}
                className={`styles.sliderItem ${index === 1 ? "styles.centerImage" : ""}`}
              >
                <img
                  src={image?.image_id.pictures[0]}
                  alt={image?.name}
                  className={styles.sliderImage}
                />
                {index === 1 && (
                  <Typography variant="body1" className={styles.sliderCaption}>
                    {image?.name}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>

          <Button sx={{fontSize:"20px", backgroundColor:"#003366", color:"white"}}
            onClick={handleNext}
            className={`${styles.sliderButton} ${styles.nextButton}`}
            aria-label="Next Slide"
          >
            <FaArrowRight/>
          </Button>
        </Box>
        <Button onClick={handleclick} color="error" variant="contained" sx={{ my: 3 }}>
          Discover More
        </Button>
      </Box>
    </>
  );
};

export default Slider;
