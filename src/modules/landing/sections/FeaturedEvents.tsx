import React from 'react';
import { Box, Container, Typography, Grid, Button, Stack, Fade } from '@mui/material';
import Link from 'next/link';
import EventCard from '@modules/landing/components/EventCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const FakeEvents = [
  {
    id: '1',
    title: 'Tech Conference 2024: Future of AI & Innovation',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    date: 'Mar 15-17, 2024',
    location: 'San Francisco, CA',
    category: 'Technology',
    price: 'From $299',
    attendees: 1240,
  },
  {
    id: '2',
    title: 'Summer Music Festival: Beats & Rhythms',
    image:
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    date: 'Apr 20-22, 2024',
    location: 'Austin, TX',
    category: 'Music',
    price: 'From $149',
    attendees: 3500,
  },
  {
    id: '3',
    title: 'International Food & Wine Expo 2024',
    image:
      'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    date: 'May 5-7, 2024',
    location: 'New York, NY',
    category: 'Food & Drink',
    price: 'From $79',
    attendees: 850,
  },
  {
    id: '4',
    title: 'Global Business Summit & Networking',
    image:
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    date: 'Jun 10-12, 2024',
    location: 'Chicago, IL',
    category: 'Business',
    price: 'From $399',
    attendees: 620,
  },
];

const categories = [
  'All Events',
  'Technology',
  'Music',
  'Business',
  'Food & Drink',
  'Arts',
  'Sports',
];

const FeaturedEvents = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            mb={{ xs: 4, md: 5 }}
            spacing={2}
          >
            <Box sx={{ maxWidth: '600px' }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  mb: 1,
                  fontWeight: 700,
                  color: 'text.primary',
                  fontSize: { xs: '1.75rem', md: '2rem' },
                }}
              >
                Featured Events
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontWeight: 400,
                  fontSize: '1rem',
                }}
              >
                Discover upcoming events you can't miss
              </Typography>
            </Box>

            <Link href="/events" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="text"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'primary.dark',
                  },
                }}
              >
                View all events
              </Button>
            </Link>
          </Stack>
        </Fade>

        <Fade in timeout={1500}>
          <Box
            sx={{
              mb: 4,
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                height: '4px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'primary.main',
                borderRadius: '4px',
              },
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                pb: 2,
                minWidth: 'min-content',
              }}
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === 'All Events' ? 'contained' : 'outlined'}
                  sx={{
                    borderRadius: 1.5,
                    px: 2,
                    py: 0.75,
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    minWidth: 'max-content',
                    ...(category === 'All Events'
                      ? {
                          boxShadow: 'none',
                        }
                      : {
                          borderColor: 'divider',
                          color: 'text.primary',
                          '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'transparent',
                            color: 'primary.main',
                          },
                        }),
                  }}
                >
                  {category}
                </Button>
              ))}
            </Stack>
          </Box>
        </Fade>

        <Fade in timeout={2000}>
          <Grid container spacing={2.5}>
            {FakeEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </Grid>
        </Fade>
      </Container>
    </Box>
  );
};

export default FeaturedEvents;
