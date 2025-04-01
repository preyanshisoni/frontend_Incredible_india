import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Card, CardContent, CardMedia, Container, Divider, Grid, Grid2, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slice/categorySlice";
import { fetchLocation } from "@/redux/slice/locationSlice";
import { useRouter } from "next/router";
import { getNearByPlaces, getPlaceById } from "@/redux/slice/PlaceSlice";
import { fetchtransport } from "@/redux/slice/transportSlice";
import "@fontsource/inter"; // Import Inter font
import FlightIcon from "@mui/icons-material/Flight"; // Flight icon
import TrainIcon from "@mui/icons-material/Train"; // Train icon
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RouteIcon from "@mui/icons-material/Route"; // Alternative for Distance



import Image from "next/image";
import { NextSeo } from "next-seo";
import DescriptionRenderer from "@/ckEditorConfiguration/DescriptionRenderer";

const PlaceCarousel = () => {

  const dispatch = useDispatch();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const { id } = router.query;
  const { placeDetailsById, loading, error } = useSelector((state) => state.places);
  const {nearByPlaces} = useSelector((state)=>state.places);

  const {transport} = useSelector((state)=>state.transport);




  const transportIconMap = {
    "Railway Station": TrainIcon,
    "Airport": FlightIcon,
    "Bus stand": DirectionsBusFilledIcon,
  };


useEffect(() => {
    if (id) {
      dispatch(getPlaceById(id));
      dispatch(getNearByPlaces(id));
      dispatch(fetchtransport(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchLocation());
  }, []);

  const settings = {
    dots: false,
    infinite: placeDetailsById?.image_id?.pictures?.length > 1,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: placeDetailsById?.image_id?.pictures?.length > 1,
    autoplaySpeed: 3000,
    centerMode: false,
    beforeChange: (_, next) => setActiveIndex(next),
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const seoTitle = placeDetailsById?.name
  ? `${placeDetailsById?.name} - Best Places to Visit`
  : 'Explore Incredible Places in India';

const seoDescription = placeDetailsById?.description
  ? `Explore ${placeDetailsById?.name}, a must-visit place in India. Find top tourist attractions, historical sites, and hidden gems.`
  : 'Discover top tourist destinations in India with our guide to the best places to visit.';

const seoUrl = `https://www.yourwebsite.com/place-to-visit/${placeDetailsById?.state_name}/${placeDetailsById?.city_name}/${placeDetailsById?.name}`;
const seoImage = placeDetailsById?.image_id?.pictures?.[0]?.url || 'https://www.yourwebsite.com/default-image.jpg';

// const handleAttractionNearBy = (id)=>{
//   console.log("id", id);
//   router.push(`/placeDetails/${id}`);
// }

  return<>

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
              // width: 1200,
              // height: 630,
              alt: placeDetailsById?.name || 'Incredible India',
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
<Box sx={{position: "relative", marginTop: "0", overflow: "hidden", width: "100%",
      height: "450px"}}>
  <Container
    maxWidth="xl"
    sx={{
      width: "100%",
      height: "100%",
      padding: "0",
      margin: "0",
      position: "relative",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Slider with Custom Arrows */}
    <Box sx={{ width: "100%", height:"100%", position: "relative", overflow: "hidden" }}>
      <Slider ref={sliderRef} {...settings}>
        {placeDetailsById?.image_id?.pictures?.map((src, index) => (
          <Box
            key={index}
            sx={{

              width:"100%",
              height:"450px",
              position: "relative",
            }}
          >
            <img
              src={src}
              alt={`Place ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "3%",
                left: "3%",
                background: "rgba(0, 0, 0, 0.5)",
                padding: "5px",
                borderRadius: "8px",
              }}
            >
              <Typography sx={{ fontSize: "30px", color: "white" }}>
                {placeDetailsById?.location_id?.name}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "Inter",
                  letterSpacing: "2px",
                  color: "white",
                  fontWeight: "500",
                }}
              >
                {placeDetailsById?.name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>



      <IconButton
        onClick={() => sliderRef.current.slickPrev()}
        sx={{
          position: "absolute",
          top: "70%",
          left: "82%",
          transform: "translateY(-50%)",
          zIndex: 10,
          bgcolor: "white",
          color: "black",
          fontSize: "20px",
          "&:hover": { bgcolor: "white" },

        }}
      >
        <ArrowBackIos />
      </IconButton>

      <IconButton
        onClick={() => sliderRef.current.slickNext()}
        sx={{
          position: "absolute",
          top: "70%",
          right: "10%",
          transform: "translateY(-50%)",
          zIndex: 10,
          bgcolor: "white",
          color: "black",
          fontSize: "20px",
          "&:hover": { bgcolor: "white" },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>

    {/* Thumbnail Previews */}
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: "10px",
        position: "absolute",
        bottom: "15px",
        right: "20px",
        display: "flex",
        gap: "10px",
        borderRadius: "8px",
      }}
    >
      {placeDetailsById?.image_id?.pictures?.map((src, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
            cursor: "pointer",
            opacity: activeIndex === index ? 1 : 0.5,
            transition: "0.3s",
            "&:hover": { opacity: 1 },
          }}
          onClick={() => sliderRef.current.slickGoTo(index)}
        >
          <img
            src={src}
            alt={`Thumbnail ${index + 1}`}
            style={{
              width: "70px",
              height: "65px",
              borderRadius: "5px",
              objectFit: "cover",
            }}
          />
        </Box>
      ))}
    </Box>
  </Container>
</Box>

<Box sx={{display:"flex", gap:"60px", padding:"60px"}}>
    <Box sx={{ width:"50%", display:"flex", alignItems:"start", flexDirection:"column"}} >
          {/* <Typography>{placeDetailsById.description}</Typography> */}
          {/* <DescriptionRenderer description={placeDetailsById.description} /> */}

        <Image
                    width={600}
                    height={350}
                  src={placeDetailsById?.image_id?.pictures[0]}
                  alt={placeDetailsById.name}
        />
        </Box>
<Box sx={{ width: 600, borderRadius: 2, overflow: "hidden", boxShadow: 3, bgcolor: "white" }}>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: "#f5f5f5" }}>
        <Typography sx={{ color: "red", fontWeight: 600 }}>Today</Typography>
        <Typography sx={{ fontSize: "14px", color: "gray" }}>| Monthly</Typography>
        <Typography sx={{ fontWeight: "bold" }}>25.4 °C</Typography>
      </Box>


      <Box>
        <Image src="/assets/map.png" width={600} height={350} alt="Map" />
      </Box>

{transport?.data && transport.data.length > 0 ? (
  transport.data.map((transport, index) => {
    const TransportIcon = transportIconMap[transport.transport_type] || FlightIcon;

    return (
      <Box key={index} sx={{ p: 0.6, bgcolor: "#f9f9f9" }}>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <TransportIcon sx={{ backgroundColor: "red", color: "white", p: 1, borderRadius: "50%" }} />
          <Typography sx={{ fontWeight: "bold", color: "red", ml: 1 }}>
            {transport.transport_type}
          </Typography>
        </Box>

        <Typography sx={{ fontSize: 14, ml: 5.5 }}>
    {transport.transport_name}
  </Typography>


  <Box display="flex" alignItems="center" sx={{ ml: 5.5, mt: 1 }}>
    <LocationOnIcon sx={{ fontSize: 18, color: "gray", mr: 1 }} />
    <Typography>{transport.distance_km}</Typography>
  </Box>

  <Divider />
</Box>

    );
  })
) : (
  <Typography sx={{ fontStyle: "italic", color: "gray", textAlign: "center" }}>
    No transport available in this place
  </Typography>
)}



          </Box>
</Box>


<div style={{textAlign: "center",marginTop:-20, padding:10,   backgroundImage: 'url("/assets/4848108 1.jpg")',}}>
      <Typography sx={{p:3}} variant="h4" fontWeight="bold" color="primary" gutterBottom>
        ATTRACTIONS NEARBY
      </Typography>

<Grid
  container
  spacing={3}
  sx={{  display: "flex", justifyContent: "center" }}
>
  {nearByPlaces?.data?.map((attraction, index) => (
    <Grid
      item
      xs={12} sm={6} md={4}
      key={index}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      {/* <Card  onClick={()=>handleAttractionNearBy(attraction._id)} */}
      <Card
        sx={{
          boxShadow: 3,
          mb: 7,

          height: "350px",
          width: "100%",
          maxWidth: "340px",
          position: "relative",
          overflow: "hidden",
          "&:hover .overlay": { opacity: 1 },
          "&:hover .next-text": { bottom: "80%", opacity: 1 },
        }}
      >

        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>

          <CardMedia
            component="img"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            image={attraction.nearbyplace_id.image_id.pictures[0]}
            alt={attraction.place_id.name}
          />


          <Box
            className="overlay"
            sx={{
              position: "absolute",

              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
              opacity: 0,
              transition: "opacity 0.4s ease-in-out",
            }}
          >
            <Box
  sx={{

    color:"black",
    backgroundColor: "#f5f5f5",
    padding: "8px 12px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {

    },
  }}
>
  <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <LocationOnIcon sx={{ color: "#ff3d00" }} />
    <Typography variant="body1" fontWeight="bold">
      {attraction.nearbyplace_id.name}
    </Typography>
  </Box>
  <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
    <RouteIcon sx={{ color: "#1976d2" }} />
    <Typography variant="body2" color="textSecondary">
      {attraction.distance_km} km
    </Typography>
  </Box>
</Box>

          </Box>
        </Box>

        <CardContent sx={{ color: "black", textAlign: "center" }}></CardContent>
      </Card>
    </Grid>
  ))}
</Grid>




    </div>

  </>
};

export default PlaceCarousel;
