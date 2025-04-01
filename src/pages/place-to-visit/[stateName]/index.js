import React, { useState, useEffect, useRef } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Grid2,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategories } from "@/redux/slice/categorySlice";
import { fetchLocation, getLocationById } from "@/redux/slice/locationSlice";
import { useRouter } from "next/router";
import { getChildLocationsByParentId } from "@/redux/slice/locationSlice";
import "@fontsource/inter";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BASE_URL } from "@/constant/contant";
import { NextSeo } from "next-seo";
import DescriptionRenderer from "@/ckEditorConfiguration/DescriptionRenderer";

const statePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [id, setCityId] = useState(null);
  const [checkStoredId, setcheckStoredId] = useState(false);
  const { getLocationDetailsById, loading, error } = useSelector(
    (state) => state.locations
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { getChildLocationsById } = useSelector((state) => state.locations);
  console.log("getChildLocationsById", getChildLocationsById);

  useEffect(() => {
    const storedId = sessionStorage.getItem("setStorageId");
    setCityId(storedId);
    setcheckStoredId(true);
  }, [router.asPath]);

  useEffect(() => {
    if (id) {
      dispatch(getLocationById(id));
      dispatch(getChildLocationsByParentId(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchLocation());
  }, [dispatch]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const { stateName, cityName } = router.query;
  const { locations, loading: locationsLoading } = useSelector(
    (state) => state.locations
  );

  const filteredstate = locations?.filter(
    (location) => location.parent_id === null
  );

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + getChildLocationsById.data.length) %
        getChildLocationsById.data.length
    );
  };

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % getChildLocationsById.data.length
    );
  };

  const handleCityClick = (id, stateName) => {
    console.log("id, cityName, stateName", id, stateName);
    sessionStorage.setItem("setStorageId", id);
    router.push(`/place-to-visit/${stateName}`);
  };

  const visibleSlides = (index) => {
    const total = getChildLocationsById.data.length;
    return [
      getChildLocationsById.data[(index - 1 + total) % total],
      getChildLocationsById.data[index % total],
      getChildLocationsById.data[(index + 1) % total],
    ];
  };

  const seoTitle = cityName && stateName ? `${cityName}, ${stateName} - Best Places to Visit` : 'Explore Incredible Places in India';
  const seoDescription = cityName && stateName 
    ? `Discover top tourist attractions, historical sites, and must-visit places in ${cityName}, ${stateName}. Plan your trip today!` 
    : 'Explore the best places to visit in India!';
  
  const seoUrl = `${BASE_URL}/place-to-visit/${stateName}/${cityName}`;
  const seoImage = getChildLocationsById?.data?.[0]?.image || 'https://www.yourwebsite.com/default-image.jpg';

  return (
    <>
     <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={seoUrl}
        openGraph={{
          type: 'article',
          url: seoUrl,
          title: seoTitle,
          description: seoDescription,
          images: [
            {
              url: seoImage,
              width: 1200,
              height: 630,
              alt: getChildLocationsById?.data?.[0]?.name || 'Incredible India',
            },
          ],
          site_name: 'Incredible India',
        }}
        twitter={{
          handle: '@IncredibleIndia',
          site: '@IncredibleIndia',
          cardType: 'summary_large_image',
        }}
      />
      
      <Box sx={{ position: "relative", mt: 0, p: 0 }}>
        <Image
          width={1365}
          height={450}
          src={getLocationDetailsById.picture}
          alt={getLocationDetailsById.name}
          style={{ objectFit: "fill"}}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "1%",
            left: "1%",
            transform: "translateY(-50%)",
           
            // background: "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",

            background:"linear-gradient(to right, rgba(0, 0,0,0.8),rgba(0,0,0,0))",
            padding: "5px 10px",
            borderRadius: "8px",
            display: "inline-block",
          }}
        >
          <Typography
            sx={{
              fontSize: "50px",
              fontWeight: "bold",
              color: "#fff",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            {getLocationDetailsById.name}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ marginTop: "20px", display: "flex", gap: "100px" }}>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            alignItems: "start",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ margin: 0 }}>
            {/* {getLocationDetailsById.description} */}
            <DescriptionRenderer description={getLocationDetailsById.description} />
          </Typography>
        </Box>

        <Box
          sx={{
            width: 350,
            height: 350,

            overflow: "hidden",
            boxShadow: 3,
            bgcolor: "#EEEEEE",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#45a9ea",
              fontWeight: "bold",
              p:1,
              mb: 1,
              textTransform: "uppercase",
              [theme.breakpoints.down("sm")]: {
                fontSize: "1.75rem",
              },
            }}
          >
            Top Cities To Visit
          </Typography>
          <Box>
            {getChildLocationsById?.data &&
              getChildLocationsById.data.length > 0 ? (
              getChildLocationsById?.data?.map((data, index) => (
                <Box key={index} sx={{}}>
                  <ul>
                    <li>{data.name}</li>
                  </ul>
                </Box>
              ))
            ) : (
              <Typography>No data available</Typography>
            )}
          </Box>
        </Box>
      </Box>

      <div
        style={{
          textAlign: "center",
          marginTop: -20,
          padding: 10,
          // backgroundImage: 'url("/assets/4848108 1.jpg")',
          backgroundImage:
            'url("/assets/colorful-abstract-textured-background-design 2.png")',
        }}
      >
        <Typography
          sx={{ p: 3 }}
          variant="h4"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          ATTRACTIONS
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
            marginBottom: "10px",
            position: "relative",
          }}
        >
          <Button
            onClick={handlePrev}
            sx={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              minWidth: "50px",
              minHeight: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000",
              fontSize: "20px",
              border: "none",
              cursor: "pointer",
              marginRight: "20px",
            }}
          >
            <FaArrowLeft />
          </Button>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "30px",
              overflow: "hidden",
            }}
          >
            {getChildLocationsById?.data &&
              getChildLocationsById.data.length > 0 ? (
              visibleSlides(currentIndex)
                .filter((attr) => attr.name !== "")
                .map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      transition: "transform 0.5s ease, opacity 0.5s ease",
                      width: index === 1 ? "300px" : "350px",
                      height: index === 1 ? "420px" : "300px",
                      zIndex: index === 1 ? 2 : 1,
                      transform: index === 1 ? "scale(1.1)" : "scale(0.9)",
                      // Negative margin lifts the center image up
                      marginTop: index === 1 ? "-40px" : "0px",
                    }}
                  >
                    <img
                      src={image.picture}
                      alt={image?.name}
                      style={{
                        width: "100%",

                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {index === 1 && (
                      <Typography
                        variant="body1"
                        sx={{
                          position: "absolute",

                          bottom: "15px",
                          left: 0,
                          width: "94%",
                          textAlign: "center",
                          background: "rgba(0, 0, 0, 0.6)",
                          color: "white",
                          p: 1,
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {image?.name}
                      </Typography>
                    )}
                  </Box>
                ))
            ) : (
              <Typography>No data available</Typography>
            )}
          </Box>

          <Button
            onClick={handleNext}
            sx={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              minWidth: "50px",
              minHeight: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000",
              fontSize: "20px",
              border: "none",
              cursor: "pointer",
              marginLeft: "20px",
            }}
          >
            <FaArrowRight />
          </Button>
        </Box>
      </div>

      {/* ---------------------About City--------------------------- */}

      <Box
        component="section"
        sx={{
          position: "relative",
          width: "100%",
          height: isMobile ? 300 : 450,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,

            bgcolor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            p: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              mb: 1,
              textTransform: "uppercase",
              [theme.breakpoints.down("sm")]: {
                fontSize: "1.75rem",
              },
            }}
          >
            Explore {getLocationDetailsById.name}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              // fontWeight: "bold",
              mb: 2,
              [theme.breakpoints.down("sm")]: {
                fontSize: "1.2rem",
              },
            }}
          >
            {/* Explore Other Places by Visiting the State Website */}
          </Typography>

          <Button
            variant="contained"
            sx={{
              bgcolor: "error.main",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            Explore the state
          </Button>
        </Box>
      </Box>
      {/* ------------------------Explore other cities------------------------- */}
      <Box
        component="section"
        sx={{
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 },
          backgroundColor: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          gutterBottom
          sx={{
            mb: 3,
            textTransform: "uppercase",
          }}
        >
          Explore Other States
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {filteredstate
            .filter((state) => state.name !== getLocationDetailsById.name)
            .slice(0, 4)
            .map((state, index) => (
              <Card
                onClick={() => handleCityClick(state._id, state.name)}
                key={index}
                sx={{
                  position: "relative",
                  width: 300,
                  height: 400,
                  borderRadius: 2,
                  boxShadow: 3,
                  overflow: "hidden",
                  textAlign: "left",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-12px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  image={state.picture}
                  alt={state.name}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    color: "#fff",
                    p: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {state.name}
                  </Typography>
                </Box>
              </Card>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default statePage;
