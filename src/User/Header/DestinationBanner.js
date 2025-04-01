import { Box, Stack, Typography, Button, Fade, Slide } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styles from "../Header/DestinationBanner.module.css";

export const DestinationBanner = () => {
  const router = useRouter();
  const { locations } = useSelector((state) => state.locations);

  const handleCityClick = (id, stateName, cityName) => {
    sessionStorage.setItem("setStorageId", id);
    router.push(`/place-to-visit/${stateName}/${cityName}`);
  };

  const handleClick = () => {
    router.push("/places");
  };

  return (
    <Fade in={true} timeout={1000}>
      <Box className={styles.DestinationBanner}>

        <Box sx={{padding:"30px"}} className={styles.destinationTop}>

  <Box sx={{position:"absolute", left:"13%"}} >

      <Typography className={styles.DesHeading} variant="h4" sx={{ fontWeight: 700}}>
        Destination
      </Typography>
      <Typography variant="body1" paragraph>
        for every bucket list
      </Typography>

  </Box>
  <Button sx={{position:"absolute", right:"13%"}}
      onClick={handleClick}
      className={styles.discoverMorBtn}
      color="error"
      variant="contained"
    >
      Discover More
    </Button>

</Box>


        <Box className={styles.desOuterDiv}
        sx={{

        }}
        >
          {locations
            .filter((location) => location.parent_id !== null)
            .slice(0, 6)
            .map((location, index) => (
              <Box className={styles.desDiv} key={index} onClick={() => handleCityClick(location._id, location.name, location.parent_id.name)}>
  <Box className={styles.imgContainer}>
    <img className={styles.desImg} src={location.picture} alt="Destination" />
    <Box className={styles.overlay}>
      <Box className={styles.overlayContent}>
        <Typography className={styles.overlayText} variant="h6">
          {location.name.charAt(0).toUpperCase() + location.name.slice(1)}
        </Typography>
        <Typography className={styles.overlayText} variant="subtitle1">
          {location.parent_id.name.charAt(0).toUpperCase() + location.parent_id.name.slice(1)}
        </Typography>
        <Button className={styles.overlayButton} variant="contained" color="error">
          Explore
        </Button>
      </Box>
    </Box>
  </Box>
</Box>

            ))}
        </Box>
      </Box>
    </Fade>
  );
};
