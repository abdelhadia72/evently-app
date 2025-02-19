import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import Link from 'next/link';
import EventCard from '@modules/landing/components/EventCard';

const FakeEvents = [
  {
    id: 1,
    title: 'Tech Conference 2024',
    image: 'https://media.istockphoto.com/id/1403500817/photo/the-craggies-in-the-blue-ridge-mountains.jpg?s=612x612&w=0&k=20&c=N-pGA8OClRVDzRfj_9AqANnOaDS3devZWwrQNwZuDSk=',
    date: 'Mar 15, 2024',
    location: 'San Francisco, CA',
    category: 'Technology',
    price: 'From $299',
  },
  {
    id: 2,
    title: 'Music Festival',
    image: 'https://media.istockphoto.com/id/1403500817/photo/the-craggies-in-the-blue-ridge-mountains.jpg?s=612x612&w=0&k=20&c=N-pGA8OClRVDzRfj_9AqANnOaDS3devZWwrQNwZuDSk=',
    date: 'Apr 20, 2024',
    location: 'Austin, TX',
    category: 'Music',
    price: 'From $149',
  },
  {
    id: 3,
    title: 'Food & Wine Expo',
    image: 'https://media.istockphoto.com/id/1403500817/photo/the-craggies-in-the-blue-ridge-mountains.jpg?s=612x612&w=0&k=20&c=N-pGA8OClRVDzRfj_9AqANnOaDS3devZWwrQNwZuDSk=',
    date: 'May 5, 2024',
    location: 'New York, NY',
    category: 'Food & Drink',
    price: 'From $79',
  },
  {
    id: 4,
    title: 'Business Summit',
    image: 'https://media.istockphoto.com/id/1403500817/photo/the-craggies-in-the-blue-ridge-mountains.jpg?s=612x612&w=0&k=20&c=N-pGA8OClRVDzRfj_9AqANnOaDS3devZWwrQNwZuDSk=',
    date: 'Jun 10, 2024',
    location: 'Chicago, IL',
    category: 'Business',
    price: 'From $399',
  },
];

const FeaturedEvents = () => {
  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 },
        background: (theme) => `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: { xs: 6, md: 8 },
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              mb: 2, 
              fontWeight: 800,
              background: (theme) => `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Latest Events
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              mb: 4,
              fontWeight: 400,
              lineHeight: 1.6
            }}
          >
            Discover amazing events happening near you
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {FakeEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
          {FakeEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
                   
        </Grid>

        <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 8 } }}>
          <Link href="/dashboard/events" passHref>
            <Button 
              variant="contained" 
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: 2,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                }
              }}
            >
              View All Events
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedEvents;