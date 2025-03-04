import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputAdornment,
  Button,
  Grid,
} from "@mui/material";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slice/categorySlice";
import { fetchLocation } from "@/redux/slice/locationSlice";
import { fetchPlace } from "@/redux/slice/PlaceSlice";

const Place = () => {
  const { categories } = useSelector((state) => state.categories);
  const { locations } = useSelector((state) => state.locations);
  const { places } = useSelector((state) => state.places);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchLocation());
    dispatch(fetchPlace());
  }, [dispatch]);

  const handleCategoryChange = (id) => {
    setSelectedCategory((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLocationChange = (id) => {
    setSelectedLocation((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Banner Section */}
      <Box sx={{ position: "relative", height: "400px", width: "100%" }}>
        <Image src="/assets/AttractionBanner.png" alt="Banner" layout="fill" objectFit="cover" />
        <Typography
          variant="h2"
          sx={{
            position: "absolute",
            bottom: 20,
            left: 20,
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Attractions
        </Typography>
      </Box>

      <Box sx={{ display: "flex", padding: 2 }}>
        {/* Sidebar */}
        <Box sx={{ width: "30%", paddingRight: 2 }}>
          {/* Search Places */}
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom>
              Search Places
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IoSearchOutline />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Categories Filter */}
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            {categories.map((category) => (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    checked={selectedCategory.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                }
                label={category.name}
              />
            ))}
          </Box>

          {/* Locations Filter */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Locations
            </Typography>
            {locations.slice(0, 5).map((location) => (
              <FormControlLabel
                key={location.id}
                control={
                  <Checkbox
                    checked={selectedLocation.includes(location.id)}
                    onChange={() => handleLocationChange(location.id)}
                  />
                }
                label={location.name}
              />
            ))}
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ width: "70%" }}>
          {/* Top Bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#f9f9f9",
              padding: 2,
              borderRadius: 1,
              marginBottom: 2,
              boxShadow: 1,
            }}
          >
            <Typography variant="h6">Sort By</Typography>
            
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              displayEmpty
              sx={{ width: "200px" }}
            >
              {/* <MenuItem value="">None</MenuItem> */}
              <MenuItem value="">Favorite</MenuItem>
              <MenuItem value="recent">Most Recent</MenuItem>
            </Select>
          </Box>

          {/* Places Grid */}
          <Grid container spacing={2}>
            {places.map((place) => (
              <Grid item xs={12} sm={6} md={4} key={place.id}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 1,
                  }}
                >
                  <Image
                    src={place.image_id.pictures[0]}
                    alt={place.name}
                    width={300}
                    height={200}
                    layout="responsive"
                  />
                  <Box sx={{ padding: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {place.name}
                    </Typography>

                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Place;
