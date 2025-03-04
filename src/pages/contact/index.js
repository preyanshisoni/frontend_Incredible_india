import { Container, Typography, Box, Grid, TextField, Button, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ContactUs = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url('/assets/india-gate-mornings 1@2x.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
          py: 10,
          px: 3,
          opacity: 0.9,
        }}
      >
        <Container>
          <Typography variant="h2" fontWeight={700}>
            Contact Us
          </Typography>
          <Typography variant="h5" mt={2}>
            Get in Touch with Incredible India
          </Typography>
        </Container>
      </Box>

      {/* Contact Form & Info Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <Card elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  Send Us a Message
                </Typography>
                <form>
                  <TextField fullWidth label="Your Name" variant="outlined" margin="normal" />
                  <TextField fullWidth label="Your Email" variant="outlined" margin="normal" />
                  <TextField fullWidth label="Your Message" multiline rows={4} variant="outlined" margin="normal" />
                  <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ p: 4, backgroundColor: "#f5f5f5", borderRadius: 3 }}>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  Contact Information
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <LocationOnIcon color="success" />
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    206, Biz Park, PU4,  Nagar, New Delhi 452010, India
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <EmailIcon color="primary" />
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    xyz@gmail.com
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <PhoneIcon color="secondary" />
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    +91 8359847330
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;
