import React, { useState } from 'react';
import { Box, Container, Typography, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      await router.push(`/events?query=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("/images/photos/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: '75vh', md: '80vh' },
        display: 'flex',
        alignItems: 'center',
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
          <Typography 
            variant="h1" 
            sx={{ 
              mb: 3,
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            Find Your Next Event
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 6,
              fontWeight: 400,
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            Discover amazing events happening near you
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            maxWidth: 600,
            mx: 'auto',
            backgroundColor: 'white',
            p: 2,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          }}
        >
          <TextField
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for events..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              sx: {
                color: 'text.primary',
                backgroundColor: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderWidth: '2px',
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'text.secondary',
                  opacity: 1,
                },
                '& .MuiInputBase-input': {
                  color: 'text.primary',
                },
                transition: 'all 0.2s ease-in-out',
              }
            }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            disabled={isSearching}
            sx={{
              px: 4,
              backgroundColor: 'primary.main',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              },
              '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 0,
                  height: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'ripple 0.6s linear',
                },
              },
              '@keyframes ripple': {
                '0%': {
                  width: 0,
                  height: 0,
                  opacity: 0.5,
                },
                '100%': {
                  width: '500px',
                  height: '500px',
                  opacity: 0,
                },
              },
              '&.Mui-disabled': {
                backgroundColor: 'primary.light',
                color: 'white',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
