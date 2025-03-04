import Image from "next/image";
import { Container, Typography, Box, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import CategoryIcon from "@mui/icons-material/Category";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url('/assets/image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
          py: 10,
          px: 3,
          opacity:0.8
        }}
      >
        <Container>
          <Typography variant="h2" fontWeight={700}>
            About Us
          </Typography>
          <Typography variant="h5" mt={2}>
            Discover the Beauty of India with Incredible India
          </Typography>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ py: 8, px: 4, backgroundColor: "#f5f5f5" }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Content */}
        <Grid item xs={12} md={6}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" fontWeight={700} color="primary" gutterBottom>
              Who We Are
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              <strong>Xyz</strong> is a leading IT services provider with expertise in business transformation and catalyzing change. We are passionate about technology and strive to enhance the way people explore India through an interactive and user-friendly experience.
            </Typography>
          </motion.div>
        </Grid>

        {/* Right Content (For Future Image) */}
        <Grid item xs={12} md={6}>
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
          >
            {/* Image Placeholder */}
            <Box 
              sx={{
                width: "100%",
                height: "300px",
                backgroundColor: "#ddd",
                borderRadius: "12px",
              }}
            />
          </motion.div>
        </Grid>
      </Grid>
    </Box>

        {/* What We Offer Section */}
        <Box mt={6}>
          <Typography variant="h4"  color="primary" fontWeight={600} gutterBottom textAlign="center">
            What We Offer
          </Typography>
          <Grid container spacing={4} mt={3}>
            {[
              { icon: <PublicIcon color="primary" />, text: "Explore Indian States & Cities - Learn about their culture, traditions, and attractions." },
              { icon: <CategoryIcon color="secondary" />, text: "Category-Based Places - Heritage sites, spiritual spots, adventure destinations." },
              { icon: <StarIcon color="warning" />, text: "Most-Visited & Favorite Places - Plan your trips with top-rated destinations." },
              { icon: <SearchIcon color="success" />, text: "Seamless Navigation & Search - Find destinations with ease." },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card elevation={4} sx={{ textAlign: "center", p: 3, borderRadius: 3 }}>
                    <CardContent>
                      <ListItemIcon sx={{ fontSize: 50, mb: 1 }}>{item.icon}</ListItemIcon>
                      <Typography>{item.text}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Why Choose Us Section */}
        <Box mt={6}>
          <Typography variant="h4" color="primary" fontWeight={600} gutterBottom textAlign="center"
          >
            Why Choose Us?
          </Typography>
          <Grid container spacing={3} mt={3}>
            {[
              "Comprehensive Travel Guide - Covering destinations across India.",
              "User-Friendly Interface - Seamless browsing experience.",
              "Regular Updates - Stay informed about new places and recommendations.",
              "Passion for Exploration - Built by travel enthusiasts.",
            ].map((text, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card elevation={2} sx={{ display: "flex", alignItems: "center", p: 2, borderRadius: 3 }}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <Typography>{text}</Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Footer Section */}
        <Box mt={6} textAlign="center">
          <Typography variant="h6" color="secondary" fontWeight={600}>
          🌏 Explore. Experience. Discover.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
