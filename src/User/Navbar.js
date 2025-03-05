import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../User/nav.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSearchCircleSharp } from "react-icons/io5";
import { IoReorderThreeSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Search from "@/SearchFunctionality/Search";

import {
  Stack,
  Link,
  Toolbar,
  Typography,
  Container,
  AppBar,
  useMediaQuery,
  Drawer,
  IconButton,
  List,
  ListItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


export const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [dropdownType, setDropdownType] = useState("");
  const [showLine, setShowLine] = useState(false);
  const [searchTerm,setSearchTerm] = useState("");
  
  const { places, loading: placesLoading } = useSelector(
    (state) => state.places
  );
  const {searchAll } = useSelector((state)=>state.places.searchAll);
  
  console.log("searchall", searchAll);

  const { locations, loading: locationsLoading } = useSelector(
    (state) => state.locations
  );
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );


  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
  
    if (isDropdownOpen) {
      document.body.style.overflow = "hidden"; 
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      document.body.style.overflow = "auto"; 
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    }
  
    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isDropdownOpen]);
  
  
  

  useEffect(() => {}, []);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMouseEnter = (type) => {
    if (type !== "places") {
      setIsDropdownOpen(true);
      setDropdownType(type);
    }

    switch (type) {
      case "locations":
        setDropdownData(locations);
        break;
      case "categories":
        setDropdownData(categories);
        break;
      default:
        setDropdownData([]);
    }
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const isLoading = placesLoading || locationsLoading || categoriesLoading;
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCityClick = (id, stateName, cityName) => {
    console.log("id,cityName,stateName", id, cityName, stateName);
    sessionStorage.setItem("setStorageId", id);
    router.push(`/place-to-visit/${stateName}/${cityName}`);
  };

  const handleStateClick = (id, stateName) => {
    console.log("id,stateName", id, stateName);
    sessionStorage.setItem("setStorageId", id);
    router.push(`/place-to-visit/${stateName}`);
  };
  const handleCategoryClick = (id, categoryName) => {
    sessionStorage.setItem("setCategoryId", id);
    router.push(`/must-visit/${categoryName}`);
  };





  
  return (
    <AppBar
      sx={{
        background: isScrolled ? "white" : "transparent",
        color: isScrolled ? "black" : "white",
        boxShadow: isScrolled ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
        transition:
          "background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Container>
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6v8qfD5ErzCuzyLh9LKXMeTvuZtxvAkepnADXoKFJZqqvRbdH6JN45v0wrxTva5DeNDU&usqp=CAU"
                alt="Logo"
                style={{ width: "100px", height: "70px" }}
              />
            </Box>
            {isMobile ? (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleDrawerToggle}
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>

                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={handleDrawerToggle}
                >
                  <List>
                    <ListItem>
                      <Link sx={{ color: "red", textDecoration: "none" }}>
                        Locations
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link sx={{ color: "primary", textDecoration: "none" }}>
                        Categories
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link sx={{ color: "primary", textDecoration: "none" }}>
                        Places
                      </Link>
                    </ListItem>
                  </List>
                </Drawer>
              </>
            ) : (
              <Stack direction="row" gap={40}>
                <Box className="navCenter">
                  <Stack direction="row" gap={8} sx={{ fontSize: "1.3rem" }}>
                    <Link
                      onMouseEnter={() => handleMouseEnter("locations")}
                      onMouseLeave={handleMouseLeave}
                      sx={{
                        color: isScrolled ? "black" : "white",
                        textDecoration: "none",
                      }}
                      className="nav-link"
                    >
                      Locations
                      <MdKeyboardArrowDown size={25} />
                    </Link>

                    <Link
                      onMouseEnter={() => handleMouseEnter("categories")}
                      onMouseLeave={handleMouseLeave}
                      sx={{
                        color: isScrolled ? "black" : "white",
                        textDecoration: "none",
                      }}
                      className="nav-link"
                    >
                      Categories
                      <MdKeyboardArrowDown size={25} />
                    </Link>
                    <Link
                      href="/places"
                      onMouseEnter={() => handleMouseEnter("places")}
                      onMouseLeave={handleMouseLeave}
                      sx={{
                        color: isScrolled ? "black" : "white",
                        textDecoration: "none",
                      }}
                      className="nav-link"
                    >
                      Places
                      {/* <MdKeyboardArrowDown size={25} /> */}
                    </Link>

                    {/* ------------------------------------------------------------------------------------\                  */}

                    {isDropdownOpen && (
                      <>
                        <Box
                        
                          sx={{
                            border: "1px solid #d0d0d0",
                            // background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
                            position: "absolute",
                            top: "4vh",
                            left: "50%",
                            transform: "translateX(-50%)",
                            marginTop: "26px",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                            borderRadius: "12px",
                            overflow: "hidden",
                            transition:
                              "transform 0.3s ease, box-shadow 0.3s ease",
                            width: {
                              xs: "90vw",
                              sm: "80vw",
                              md: "60vw",
                              lg: "80vw",
                            },

                            "&:hover": {
                              transform: "translateX(-50%) scale(1.02)",
                              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                            },
                          }}
                          onMouseEnter={() => setIsDropdownOpen(true)}
                          onMouseLeave={handleMouseLeave}
                          className="hoverDiv"
                        >
                          <Box
                        
                            className="locationDataBox"
                            sx={{
                              p: 2,
                              display: "grid",
                              gridTemplateColumns: {
                                xs: "repeat(auto-fit, minmax(120px, 1fr))",
                                sm: "repeat(auto-fit, minmax(140px, 1fr))",
                                md: "repeat(auto-fit, minmax(160px, 1fr))",
                              },
                              gap: "1.5vh 1.5vw",
                              backgroundColor: "#F8F9FA",
                            }}
                          >
                            {isLoading ? (
                              <Typography
                                variant="body1"
                                sx={{
                                  textAlign: "center",
                                  width: "100%",
                                  color: "#555",
                                }}
                              >
                                Loading...
                              </Typography>
                            ) : dropdownType === "locations" &&
                              dropdownData.length > 0 ? (
                              dropdownData.map(
                                (item) =>
                                  item.parent_id === null && (
                                    <Box
                                      key={item._id}
                                      sx={{
                                        borderRadius: "8px",
                                        p: 1.5,
                                        cursor: "pointer",
                                        transition:
                                          "background 0.3s ease, transform 0.2s ease",
                                        "&:hover": {
                                          backgroundColor: "#f0f0f0",
                                          transform: "scale(1.02)",
                                        },
                                      }}
                                    >
                                      <Typography
                                        onClick={() =>
                                          handleStateClick(item._id, item.name)
                                        }
                                        variant="h6"
                                        sx={{
                                          fontSize: "15px",
                                          fontWeight: "bold",
                                          color: "#37474F",
                                          textAlign: "center",
                                          mb: 1,
                                          py: 0.5,
                                          borderRadius: "4px",
                                          backgroundColor: "#003366",
                                          color: "#ffff",
                                          "&:hover": { color: "#F0F0F0" },
                                        }}
                                      >
                                        {item.name}
                                      </Typography>

                                      {dropdownData
                                        .filter(
                                          (city) =>
                                            city.parent_id?._id === item._id
                                        )
                                        .map((city) => (
                                          <Box
                                            key={city._id}
                                            onClick={() =>
                                              handleCityClick(
                                                city._id,
                                                city.parent_id.name,
                                                city.name
                                              )
                                            }
                                            sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              fontSize: "16px",
                                              color: "#555",
                                              textAlign: "left",
                                              mt: 0.5,
                                              transition: "color 0.2s ease",
                                              "&:hover": { color: "black" },
                                            }}
                                          >
                                            <ArrowRightIcon
                                              sx={{ fontSize: "1rem", mr: 0.5 }}
                                            />
                                            {city.name}
                                          </Box>
                                        ))}
                                    </Box>
                                  )
                              )
                            ) : dropdownType === "categories" &&
                              dropdownData.length > 0 ? (
                              dropdownData.map((item) => (
                                <Box
                                  onClick={() =>
                                    handleCategoryClick(item._id, item.name)
                                  }
                                  key={item._id}
                                  sx={{
                                    borderRadius: "8px",
                                    p: 1.5,
                                    cursor: "pointer",
                                    transition:
                                      "transform 0.2s ease, background 0.3s ease",
                                    "&:hover": {
                                      backgroundColor: "#ECEFF1",
                                      transform: "scale(1.02)",
                                    },
                                  }}
                                >
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      fontSize: { xs: "0.9rem", sm: "1rem" },
                                      color: "#fff",
                                      backgroundColor: "#003366",
                                      color: "#ffff",
                                      textAlign: "center",
                                      mb: 1,
                                      py: 0.5,
                                      borderRadius: "4px",

                                      "&:hover": {
                                        backgroundColor: "#455A64",
                                        color: "white",
                                      },
                                    }}
                                  >
                                    {item.name}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: "0.9rem",
                                      color: "#555",
                                      textAlign: "center",
                                    }}
                                  >
                                    {item.description}
                                  </Typography>
                                </Box>
                              ))
                            ) : (
                              <Typography
                                sx={{
                                  fontSize: "1rem",
                                  color: "#777",
                                  textAlign: "center",
                                  width: "100%",
                                  p: 2,
                                }}
                              >
                                No data available.
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </>
                    )}
                  </Stack>
                </Box>
                <Box>
              


<Search isScrolled={isScrolled}/>

                </Box>
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
