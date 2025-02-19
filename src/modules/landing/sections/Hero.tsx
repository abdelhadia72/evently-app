import React, { useState } from 'react';
import { Box, Container, Typography, Button, TextField, InputAdornment, Fade } from '@mui/material';
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
        background:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url("/images/photos/hero-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: { xs: '85vh', md: '90vh' },
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'linear-gradient(45deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '250px',
          background: 'linear-gradient(to bottom, transparent, #0a0a0a)',
          pointerEvents: 'none',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                fontWeight: 800,
                fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.5rem' },
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                background: 'linear-gradient(45deg, #fff, #e0e0e0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Discover & Create
              <br />
              Unforgettable Events
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 6,
                fontWeight: 400,
                opacity: 0.9,
                maxWidth: '700px',
                mx: 'auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              Join thousands of people creating and experiencing amazing events worldwide. Find your
              next unforgettable moment.
            </Typography>
          </Box>
        </Fade>

        <Fade in timeout={1500}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1,
              maxWidth: '700px',
              mx: 'auto',
              backgroundColor: 'white',
              p: 0.5,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            }}
          >
            <TextField
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for events..."
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary', ml: 1 }} />
                  </InputAdornment>
                ),
                disableUnderline: true,
                sx: {
                  height: '48px',
                  fontSize: '1rem',
                  '& input': {
                    px: 1,
                    '&::placeholder': {
                      color: 'text.secondary',
                      opacity: 0.8,
                    },
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={isSearching}
              sx={{
                minWidth: { xs: '100%', sm: '140px' },
                height: '48px',
                fontSize: '0.95rem',
                borderRadius: 1.5,
                textTransform: 'none',
                backgroundColor: 'primary.main',
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </Box>
        </Fade>

        <Fade in timeout={2000}>
          <Box
            sx={{
              mt: 6,
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              flexWrap: 'wrap',
            }}
          >
            {['Conferences', 'Workshops', 'Concerts', 'Sports', 'Art & Culture'].map((tag) => (
              <Box
                key={tag}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 5,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Hero;
