import React from 'react';
import { Box, Container, Typography, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PopularCategories from './PopularCategories';

const Hero = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("/images/photos/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: { xs: 10, md: 15 },
        color: 'white',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '150px',
          background: 'linear-gradient(to bottom, transparent, #0a0a0a)',
          pointerEvents: 'none',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" sx={{ mb: 2, fontWeight: 700 }}>
            Find Your Next Event
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 400 }}>
            Discover events that match your passions
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            maxWidth: 800,
            mx: 'auto',
            backgroundColor: 'white',
            p: 2,
            borderRadius: 1,
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
          }}
        >
          <TextField
            fullWidth
            placeholder="Search for events"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: 'white', flex: 2 }}
          />
          <TextField
            fullWidth
            placeholder="Location"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon />
                </InputAdornment>
              ),
            }}
            sx={{ bgcolor: 'white', flex: 1 }}
          />
          <Button
            variant="contained"
            size="large"
            sx={{
              height: '56px',
              px: 4,
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Search
          </Button>
        </Box>

      </Container>
    </Box>
  );
};

export default Hero;
