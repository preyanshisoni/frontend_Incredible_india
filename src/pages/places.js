import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid,
  Card,
  CardMedia,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import styles from  "../pages/places.module.css";
import { debounce } from "lodash";
import { IoSearchOutline } from "react-icons/io5";
import { fetchCategories } from "@/redux/slice/categorySlice";
import { fetchLocation } from "@/redux/slice/locationSlice";
import { fetchPlace, searchPlace } from "@/redux/slice/PlaceSlice";
import { useRouter } from "next/router";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdViewList,
  MdViewModule,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NextSeo } from "next-seo";
import { styled } from "@mui/system";

const Place = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { locations } = useSelector((state) => state.locations);
  const { places, searchedPlaces } = useSelector((state) => state.places);
  const { categories } = useSelector((state) => state.categories);

  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isOpen3, setIsOpen3] = useState(true);

  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [filterType, setFilterType] = useState("most_visited");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPage, setTotalPage] = useState(1);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const slideRef = useRef(null);

  const topAttractions = [
    {
      title: "Golden Temple",
      img: "https://s7ap1.scene7.com/is/image/incredibleindia/1-sri-harmandir-sahib-(golden-temple)-amritsar-punjab-attr-nearby?qlt=82&ts=1726662259743",
    },
    {
      title: "Shanti Stupa",
      img: "https://s7ap1.scene7.com/is/image/incredibleindia/shanti-stupa-leh-ladakh-1-attr-nearby?qlt=82&ts=1726667881441",
    },
    {
      title: "Hawa Mahal",
      img: "https://s7ap1.scene7.com/is/image/incredibleindia/hawa-mahal-jaipur-rajasthan-1-attr-nearby?qlt=82&ts=1726660181235",
    },
    {
      title: "Lotus Temple",
      img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/56/e2/7e/engineering-marvel-at.jpg?w=600&h=400&s=1",
    },
  ];

  const slides = [
    topAttractions[topAttractions.length - 1],
    ...topAttractions,
    topAttractions[0],
  ];

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchLocation());
    dispatch(fetchPlace());
  }, [dispatch]);

  const debouncedSearch = useCallback(
    debounce((term) => {
      dispatch(
        searchPlace({
          searchTerm: term,
          selectedCategories,
          selectedStates,
          selectedCities,
        })
      );
    }, 500),
    [dispatch, selectedCategories, selectedStates, selectedCities]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [
    searchTerm,
    selectedCategories,
    selectedStates,
    selectedCities,
    debouncedSearch,
  ]);

  useEffect(() => {
    if (
      searchTerm.trim() === "" &&
      selectedCategories.length === 0 &&
      selectedStates.length === 0 &&
      selectedCities.length === 0
    ) {
      const filtered = places.filter(
        (place) => place.location_id?.most_visited === true
      );
      setFilteredPlaces(filtered);
    }
  }, [places, searchTerm, selectedCategories, selectedStates, selectedCities]);

  useEffect(() => {
    let filtered = searchTerm.trim() ? searchedPlaces : places;

    if (!searchTerm.trim()) {
      if (filterType === "most_visited") {
        filtered = filtered.filter((place) => place.location_id?.most_visited);
      } else if (filterType === "favorite") {
        filtered = filtered.filter((place) => place.location_id.favorite);
      }
    }
    setFilteredPlaces(filtered);
  }, [searchTerm, searchedPlaces, places, filterType]);

  // ------------
  useEffect(() => {
    let filtered = searchTerm.trim() ? searchedPlaces : places;

    if (selectedStates.length > 0) {
      filtered = filtered.filter((place) =>
        selectedStates.includes(place.location_id.parent_id)
      );
    }

    if (selectedCities.length > 0) {
      filtered = filtered.filter((place) =>
        selectedCities.includes(place.location_id._id)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((place) =>
        selectedCategories.includes(place.category_id._id)
      );
    }

    setFilteredPlaces(filtered);
  }, [
    places,
    searchTerm,
    searchedPlaces,
    selectedStates,
    selectedCities,
    selectedCategories,
  ]);

  const handleFilterChange = (filter) => {
    setFilterType(filter);
  };

  useEffect(() => {
    const cities = locations
      .filter(
        (location) =>
          location.parent_id &&
          selectedStates.includes(location.parent_id._id) &&
          location.most_visited
      )
      .slice(0, 5);
    setFilteredCities(cities);
    setSelectedCities([]);
  }, [selectedStates, locations]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleStateChange = (stateId) => {
    setSelectedStates((prev) =>
      prev.includes(stateId)
        ? prev.filter((id) => id !== stateId)
        : [...prev, stateId]
    );
  };

  const handleCityChange = (cityId) => {
    setSelectedCities((prev) =>
      prev.includes(cityId)
        ? prev.filter((id) => id !== cityId)
        : [...prev, cityId]
    );
  };

  const handleNaviagate = (id) => {
    router.push(`/placeDetails/${id}`);
  };
  const seoTitle = `Explore Top Tourist Places ${
    searchTerm ? `for "${searchTerm}"` : ""
  }`;
  const seoDescription = `Discover the best tourist attractions, historical sites, and must-visit places in India${
    searchTerm ? ` related to "${searchTerm}"` : ""
  }. Plan your next adventure today!`;
  const seoUrl = `https://www.yourwebsite.com/places?search=${searchTerm}&states=${selectedStates.join(
    ","
  )}&cities=${selectedCities.join(",")}&categories=${selectedCategories.join(
    ","
  )}`;
  const seoImage =
    places?.[0]?.image_url || "https://www.yourwebsite.com/default-image.jpg";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleTransitionEnd = () => {
    if (currentIndex === slides.length - 1) {
      setTransitionEnabled(false);
      setCurrentIndex(1);
    }

    if (currentIndex === 0) {
      setTransitionEnabled(false);
      setCurrentIndex(slides.length - 2);
    }
  };

  useEffect(() => {
    if (!transitionEnabled) {
      const timer = setTimeout(() => setTransitionEnabled(true), 100);
      return () => clearTimeout(timer);
    }
  }, [transitionEnabled]);

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={seoUrl}
        openGraph={{
          type: "website",
          url: seoUrl,
          title: seoTitle,
          description: seoDescription,
          images: [
            {
              url: seoImage,
              width: 1200,
              height: 630,
              alt: "Top Tourist Places in India",
            },
          ],
          site_name: "Your Website",
        }}
        twitter={{
          handle: "@YourWebsite",
          site: "@YourWebsite",
          cardType: "summary_large_image",
        }}
      />

      <Box
        sx={{
          height: "80vh",
          width: "100%",
          position: "relative",
        }}
        className={styles.placesTop}
      >
        {/* Background Image with Overlay */}
        <Box sx={{ height: "80vh", position: "relative" }}>
          <Image src="/assets/new_page_banner.jpg" fill />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
          />
        </Box>

        {/* Animated Text */}
        <Box
          className={styles.animatedText}
          sx={{
            position: "absolute",
            top: "50%",
            left: "10%",
            transform: "translateX(-50%) translateY(-50%)",
            textAlign: "left",
            color: "#fff",
            padding: 2,
            zIndex: 2,
          }}
        >
          <Typography align="center" variant="h4" sx={{ color: "white" }}>
            India's Top
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: "bold",
              fontSize: "70px",
            }}
            align="center"
            variant="h1"
          >
            ATTRACTIONS
          </Typography>
        </Box>

        <Box
          className={styles.carouselContainer}
          sx={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "500px",
            height: "350px",
            overflow: "hidden",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 3,
          }}
        >
          <Box
            ref={slideRef}
            className={styles.carouselSlides}
            sx={{
              display: "flex",
              transition: transitionEnabled
                ? "transform 0.8s ease-in-out"
                : "none",
              transform: `translateX(-${currentIndex * 100}%)`,
              height: "100%",
              width: "100%",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {slides.map((place, index) => (
              <Box
                key={index}
                className={styles.carouselSlide}
                sx={{ minWidth: "100%", position: "relative" }}
              >
                <img
                  src={place.img}
                  alt={place.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderBottom: "1px solid #ddd",
                  }}
                />
                <Typography
                  className={styles.caption}
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontWeight: "bold",
                    fontSize: "25px",
                    backgroundColor:"#fff",
                    color: "#003366",
                  }}
                >
                  {place.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        className={styles.placeMainDiv}
        sx={{
          backgroundImage: 'url("/assets/4848108 1.jpg")',
          backgroundSize: "cover",
        }}
      >
        <Box className={styles.placeLeftBox}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }} variant="body1">
              SEARCH PLACES
            </Typography>

            <TextField
              variant="outlined"
              placeholder="Search places..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IoSearchOutline />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: 240,
                borderRadius: "25px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",

                  height: "45px",
                },
              }}
            />
          </Box>
          <Divider />

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              onClick={() => setIsOpen1(!isOpen1)}
            >
              <Typography sx={{ fontWeight: "bold" }} variant="body1">
                CATEGORIES
              </Typography>
              {isOpen1 ? (
                <MdKeyboardArrowDown size={35} />
              ) : (
                <MdKeyboardArrowUp size={35} />
              )}
            </Box>
            {isOpen1 && (
              <>
                {categories.slice(0, 5).map((item) => (
                  <FormControlLabel
                    key={item._id}
                    control={
                      <Checkbox
                        onChange={() => handleCategoryChange(item._id)}
                      />
                    }
                    label={item.name}
                  />
                ))}
              </>
            )}
          </Box>
          <Divider />

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              onClick={() => setIsOpen2(!isOpen2)}
            >
              <Typography sx={{ fontWeight: "bold" }} variant="body1">
                MOST VISITED STATES
              </Typography>
              {isOpen2 ? (
                <MdKeyboardArrowDown size={35} />
              ) : (
                <MdKeyboardArrowUp size={35} />
              )}
            </Box>
            {isOpen2 && (
              <Box>
                {locations
                  ?.filter(
                    (location) => !location.parent_id && location.most_visited
                  )
                  .slice(0, 5)
                  .map((state) => (
                    <FormControlLabel
                      key={state._id}
                      debugger
                      control={
                        <Checkbox
                          checked={selectedStates.includes(state._id)}
                          onChange={() => handleStateChange(state._id)}
                        />
                      }
                      label={state.name}
                    />
                  ))}
              </Box>
            )}
          </Box>
          <Divider />

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
              onClick={() => setIsOpen3(!isOpen3)}
            >
              <Typography sx={{ fontWeight: "bold" }} variant="body1">
                MOST VISITED CITIES
              </Typography>
              {isOpen3 ? (
                <MdKeyboardArrowDown size={35} />
              ) : (
                <MdKeyboardArrowUp size={35} />
              )}
            </Box>
            {isOpen3 && (
              <>
                {filteredCities.map((city) => (
                  <FormControlLabel
                    key={city._id}
                    control={
                      <Checkbox
                        checked={selectedCities.includes(city._id)}
                        onChange={() => handleCityChange(city._id)}
                      />
                    }
                    label={city.name}
                  />
                ))}
              </>
            )}
          </Box>
        </Box>

        {/*  right side  */}
        <Box
          sx={{ width: "72%", backgroundColor: "white" }}
          className={styles.placeRightBox}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              p: 1,
              border: "1px solid #ddd",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6">
              {filteredPlaces.length} Places Found
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <InputLabel id="sort-label" sx={{ fontWeight: 500 }}>
                Sort by
              </InputLabel>

              <Select
                sx={{ "& .MuiSelect-select": { padding: 1 } }}
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                displayEmpty
              >
                <MenuItem value="most_visited">Most Visited</MenuItem>
                <MenuItem value="favorite">Favorite</MenuItem>
                <MenuItem value="all places">All Places</MenuItem>
              </Select>

              <IconButton>
                <MdViewModule size={24} />
              </IconButton>
              <IconButton>
                <MdViewList size={24} />
              </IconButton>
            </Box>
          </Box>

          <Box className={styles.rightSideDownDiv} sx={{ mt: 2 }}>
            {filteredPlaces.length > 0 ? (
              <Grid container spacing={4}>
                {filteredPlaces.map((place) => (
                  <Grid item xs={12} sm={6} md={4} key={place._id}>

                    <Card
                      sx={{
                        position: "relative",
                        borderRadius: 2,
                        boxShadow: 3,
                        height: "300px",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        overflow: "hidden",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "scale(1.03)",
                          boxShadow: 6,
                        },
                      }}
                      onClick={() => handleNaviagate(place._id)}
                    >
                      <CardMedia
                        component="img"
                        height="100%"
                        image={place.image_id.pictures[0]}
                        alt={place.name}
                        sx={{
                          transition: "transform 0.3s ease",
                          "&:hover": { transform: "scale(1.05)" },
                        }}
                      />
                      {/* Optional Gradient Overlay */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.7) 100%)",
                          zIndex: 1,
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: "rgba(0, 0, 0, 0.5)",
                          padding: 1,
                          zIndex: 2,
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#fff",
                            fontWeight: 600,
                            textAlign: "center",
                            letterSpacing: 0.5,
                          }}
                        >
                          {place.name}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography
                variant="body1"
                sx={{ padding: 2, textAlign: "center" }}
              >
                No places to show.
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Pagination
              count={totalPage}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Place;
