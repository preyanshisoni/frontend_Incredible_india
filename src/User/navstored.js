import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../User/nav.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoSearchCircleSharp } from "react-icons/io5";
import { IoReorderThreeSharp } from "react-icons/io5";
import Image from "next/image";
import Router from "next/router";

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

  const router = Router;
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [dropdownType, setDropdownType] = useState("");


  const { places, loading: placesLoading } = useSelector(
    (state) => state.places
  );
  const { locations, loading: locationsLoading } = useSelector(
    (state) => state.locations
  );
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );



  useEffect(() => { }, []);
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



  const handleCityClick = (id,stateName,cityName) => {
   console.log("id,cityName,stateName",id,cityName,stateName);
   sessionStorage.setItem("setStorageId",id);
   router.push(`/place-to-visit/${stateName}/${cityName}`);
  };

  const handleStateClick =(id,stateName)=>{
    console.log("id,stateName",id,stateName);
    sessionStorage.setItem("setStorageId",id);
    router.push(`/place-to-visit/${stateName}`);
  }
  const handleCategoryClick = (id,categoryName)=>{
    sessionStorage.setItem("setCategoryId",id);
    router.push(`/must-visit/${categoryName}`);
  }
  
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
                // onClick={()=>router.push(`/`)}
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
                      <Link sx={{ color: "primary", textDecoration: "none" }}>
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
                    <Link href="/places"
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

                 

                    {isDropdownOpen && (
                      <>




                        <Box
                          sx={{
                            
                            width: "690px",
                            height: "370px",
                            display: "flex",
                            background: "white",
                            position: "absolute",
                            marginTop: "25px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            zIndex: 1000,
                            borderRadius: "8px",
                            overflow: "hidden",
                          }}
                          onMouseEnter={() => setIsDropdownOpen(true)}
                          onMouseLeave={handleMouseLeave}
                          className="hoverDiv"
                        >

                          <Box sx={{ width: "40%", height: "100%", position: "relative", padding: "10px" }}>
                            <Image
                              src={dropdownType === "locations" ? "/assets/Location.png" : "/assets/Catregory.png"}
                              alt="img not found"
                              fill
                              style={{ objectFit: "cover", borderRadius: "8px" }}
                            />
                          </Box>


                          <Box
                            className="locationDataBox"
                            sx={{
                              
                              height:"auto",
                              width: "60%",
                              padding: "20px",
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "15px",
                              overflowY: "auto",
                            }}
                          >
                            
                            {isLoading ? (
                              <Typography>Loading...</Typography>
                            ) : dropdownType === "locations" && dropdownData.length > 0 ? (
                              dropdownData.map((item) =>
                                item.parent_id === null ? (
                                  <Box
                                    key={item._id}
                                    sx={{
                                      width: "140px",
                                      
                                      borderRadius: "8px",
                                      padding: "10px",
                                      // border: "1px solid #ddd",
                                      // backgroundColor: "#f9f9f9",
                                      // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    }}
                                  >

                                    <Typography onClick={()=>{handleStateClick(item._id,item.name)}}
                                      variant="h6"
                                      sx={{
                                        
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                        // color: "#333",
                                        color:"#45a9ea",
                                        textAlign: "center",
                                        marginBottom: "8px",
                                      }}
                                    >
                                      {item.name}
                                    </Typography>


                                    {dropdownData
                                      .filter((city) => city.parent_id?._id === item._id)
                                      .map((city) => (
                                        <Typography onClick={()=>handleCityClick(city._id,city.parent_id.name,city.name)}
                                          key={city._id}
                                          sx={{
                                            fontSize: "15px",
                                            color: "#555",
                                            textAlign: "center",
                                            marginTop: "4px",
                                          }}
                                        >
                                          
                                          {city.name}
                                        </Typography>
                                      ))}
                                  </Box>
                                ) : null
                              )
                            ) : dropdownType === "categories" && dropdownData.length > 0 ? (
                              dropdownData.map((item) => (
                                <Box
                                onClick={()=>{handleCategoryClick(item._id,item.name)}}
                                key={item._id}
                                sx={{
                                  width: "140px",
                                  borderRadius: "8px",
                                    padding: "10px",
                                }}
                                >

                                  <Typography
                                    variant="h6"
                                    sx={{
                                      fontSize: "15px",
                                      fontWeight: "bold",
                                      color:"#45a9ea",
                                      
                                      textAlign: "center",
                                      marginBottom: "8px",
                                    }}
                                    >
                                    {item.name}
                                  </Typography>

                                  {/* Category Description */}
                                  <Typography
                                    sx={{
                                      fontSize: "12px",
                                      color: "#555",
                                      lineHeight: "1.5",
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
                                  fontSize: "14px",
                                  color: "#777",
                                  textAlign: "center",
                                  width: "100%",
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
                  <Stack direction="row" gap={5}>
                    <IoSearchCircleSharp
                      size={32}
                      style={{ color: isScrolled ? "black" : "white" }}
                    />
                    <IoReorderThreeSharp
                      size={32}
                      style={{ color: isScrolled ? "black" : "white" }}
                    />
                  </Stack>
                </Box>
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

