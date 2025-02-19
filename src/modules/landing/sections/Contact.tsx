import React from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactInfo = [
  {
    icon: <EmailIcon sx={{ fontSize: 40 }} />,
    title: 'Email',
    info: 'support@evently.com',
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 40 }} />,
    title: 'Phone',
    info: '+1 (555) 123-4567',
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
    title: 'Address',
    info: '123 Event Street, San Francisco, CA 94105',
  },
];

const Contact = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" sx={{ mb: 4, fontWeight: 700 }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Have questions about hosting events or need support? We're here to help!
            </Typography>
            
            <Paper elevation={0} sx={{ p: 4 }}>
              <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      required
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  label="Email"
                  required
                  variant="outlined"
                  type="email"
                />
                <TextField
                  fullWidth
                  label="Subject"
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Message"
                  required
                  variant="outlined"
                  multiline
                  rows={4}
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Send Message
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ mb: 4 }}>
                Contact Information
              </Typography>
              <Grid container spacing={4}>
                {ContactInfo.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ color: 'primary.main' }}>
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ mb: 0.5 }}>
                          {item.title}
                        </Typography>
                        <Typography color="text.secondary">
                          {item.info}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 6 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Follow Us
                </Typography>
                <Typography color="text.secondary">
                  Stay updated with our latest events and news by following us on social media.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
