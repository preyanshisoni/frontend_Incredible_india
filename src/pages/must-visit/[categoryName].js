import React, { useEffect, useState } from "react";
import { fetchCategories } from "@/redux/slice/categorySlice";
import { fetchLocation, getLocationById } from "@/redux/slice/locationSlice";

import { fetchplaceByCategoryId, getPlaceById} from "@/redux/slice/PlaceSlice"; 
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  CircularProgress,
  Container,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";

const CategoryName = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [id, setCityId] = useState(null);

  const { getLocationDetailsById, loading: locationLoading } = useSelector(
    (state) => state.locations
  );
  const { placeByCategoryId, loading: placesLoading } = useSelector(
    (state) => state.places
  );
  const categoryName = placeByCategoryId?.data?.[0]?.category_id?.name || "Category Not Available";

  useEffect(() => {
    const storedId = sessionStorage.getItem("setCategoryId");
    setCityId(storedId);
  }, [router.asPath]);

  useEffect(() => {
    if (id) {
      dispatch(fetchplaceByCategoryId(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchLocation());
  }, [dispatch]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const bannerImage =
    placeByCategoryId?.data?.length > 0 &&
    placeByCategoryId.data[0]?.image_id?.pictures?.length > 0
      ? placeByCategoryId.data[0].image_id.pictures[0]
      : "/assets/map.png";

    const handleClick = (id)=>{
      router.push(`/placeDetails/${id}`);
    }
  return<>
    
      {/* Banner Section */}
      <Box sx={{ position: "relative", borderRadius: "12px", overflow: "hidden" }}>
        <Image
          width={1340}
          height={450}
          src={bannerImage}
          alt={getLocationDetailsById?.name || "No Name Provided"}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "450px",
            borderRadius: "12px",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "15%",
            left: "5%",
            background: "linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0,0,0,0))",
            padding: "16px 24px",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h3"}
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textShadow: "3px 3px 6px rgba(0,0,0,0.8)",
            }}
          >
            {placeByCategoryId?.data?.length > 0 &&
            placeByCategoryId.data[0]?.category_id?.name
              ? placeByCategoryId.data[0].category_id.name
              : "Category Not Available"}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: 4, mb: 2, textAlign: "center" }}>
  <Typography
    variant="h4"
    sx={{
      fontWeight: "bold",
      background: "linear-gradient(45deg, #2196F3, #21CBF3)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      transition: "transform 0.3s ease",
      "&:hover": { transform: "scale(1.05)" },
    }}
  >
    Explore Beautiful <span style={{ color: "#2196F3" }}>{categoryName} Places</span>
  </Typography>
  <Divider
    sx={{
      mt: 2,
      width: "600px",
      margin: "auto",
      borderBottomWidth: 2,
      borderColor: "#2196F3",
    }}
  />
</Box>


      
      {placesLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {placeByCategoryId?.data?.length > 0 ? (
            <Grid container spacing={3} sx={{mt: 4, mb:5 }}>
              {placeByCategoryId.data.map((place) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={place._id}>
                  <Card
                  onClick={()=>{handleClick(place._id)}}
                    sx={{
                      
                      borderRadius: "12px",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={
                          place?.image_id?.pictures?.[0] ||
                          "https://via.placeholder.com/345x200?text=No+Image+Available"
                        }
                        alt={place.name}
                        sx={{
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
                        }}
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            color: theme.palette.primary.main,
                          }}
                        >
                          {place.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {place.description?.length > 100
                            ? `${place.description.substring(0, 100)}...`
                            : place.description}
                        </Typography>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ mt: 2, borderRadius: "8px" }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper
              sx={{
                padding: 4,
                textAlign: "center",
                backgroundColor: theme.palette.grey[100],
                mt: 4,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No places found in this category.
              </Typography>
            </Paper>
          )}
        </>
      )}
    
    </>
  
};

export default CategoryName;
