import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Incredible India Website
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Last updated: [Date]
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          1. Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to the Incredible India website. This Privacy Policy explains how we collect, use, and disclose your information when you visit our website. By accessing or using our site, you agree to the collection and use of your information in accordance with this policy.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          2. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We may collect personal identification information (such as your name, email address, and phone number) and non-personal information (such as browser type, device details, and usage data) to improve our website and services.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          3. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          The information we collect is used to provide and enhance our service, personalize your experience, communicate with you, and for internal analytics and improvements. We ensure your data is handled securely and in compliance with applicable laws.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          4. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We take data security seriously and use commercially acceptable methods to safeguard your personal information. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          5. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update our Privacy Policy from time to time. Any changes will be posted on this page along with the revised date. We encourage you to review this policy periodically.
        </Typography>
      </Box>

      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          6. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions, concerns, or suggestions about our Privacy Policy, please contact us at:
        </Typography>
        <Typography variant="body1">
          Email: <a href="mailto:contact@incredibleindia.com">contact@incredibleindia.com</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
