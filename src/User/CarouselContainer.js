import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const destinations = [
  {
    image: "https://map.sahapedia.org/admin/assets/images/2021033013400727799_Banner.jpg?__imr__=bannerMuseum",
    title: "Explore the Rich Heritage of India",
  },
  {
    image: "https://t4.ftcdn.net/jpg/09/53/68/35/360_F_953683550_i2nqcsTKaOM2mcjJ9lJWlaV0djPi8etZ.jpg",
    title: "Majestic Palaces & Forts",
  },
  {
    image: "https://media.istockphoto.com/id/510795912/photo/india-gate.webp?b=1&s=170667a&w=0&k=20&c=Nts8vpG6WNkm8s3GSY-8LGmRGpwmzzJtowWLmSRvVks=",
    title: "Discover the Natural Wonders of India",
  },
];

export const CarouselContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // New state to track page visibility
  const slideRef = useRef();
  const intervalRef = useRef(null);

  const slides = [
    destinations[destinations.length - 1],
    ...destinations,
    destinations[0],
  ];

  // Detect tab visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  
  useEffect(() => {
    if (!isHovered && isVisible) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered, isVisible]);

  const handleTransitionEnd = () => {
    if (currentIndex === slides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(slides.length - 2);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => setIsTransitioning(true));
    }
  }, [isTransitioning]);

  const nextSlide = () => {
    if (isLocked) return;
    setIsLocked(true);
    setCurrentIndex((prev) => prev + 1);
    setTimeout(() => setIsLocked(false), 800);
  };

  const prevSlide = () => {
    if (isLocked) return;
    setIsLocked(true);
    setCurrentIndex((prev) => prev - 1);
    setTimeout(() => setIsLocked(false), 800);
  };

  const getIndicatorIndex = () => {
    if (currentIndex === 0) return destinations.length - 1;
    if (currentIndex === slides.length - 1) return 0;
    return currentIndex - 1;
  };

  return (
    <Box
      sx={{
        margin:0,
        padding:0,
        position: "relative",
        width: "100%",
        height: { xs: "60vh", md: "80vh" },
        overflow: "hidden",
        
        boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    
      <Box
        ref={slideRef}
        onTransitionEnd={handleTransitionEnd}
        sx={{
          display: "flex",
          height: "100%",
          transition: isTransitioning ? "transform 0.8s ease-in-out" : "none",
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Box key={index} sx={{ position: "relative", width: "100%", height: "100%", flexShrink: 0 }}>
            
            <Box
              component="img"
              src={slide.image}
              alt={`Slide ${index + 1}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1,
              }}
            />

            
            {index === currentIndex && (
              <Box
                sx={{
                  position: "absolute",
                  top: "70%",
                  left: { xs: "5%", md: "10%" },
                  transform: "translateY(-50%)",
                  color: "#fff",
                  zIndex: 2,
                  textAlign: "left",
                  opacity: 0,
                  animation: "fadeInText 1.2s ease-out forwards",
                  "@keyframes fadeInText": {
                    "0%": { opacity: 0, transform: "translateY(30px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                <Typography variant="h4" 
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "white", 
                    textShadow: "2px 2px 10px rgba(0,0,0,0.3)", 
                    mb: 2,
                  }}>
                  {slide.title}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      
      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",
          left: 20,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          zIndex: 10,
        }}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        onClick={nextSlide}
        sx={{
          position: "absolute",
          right: 20,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
          zIndex: 10,
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};
