import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Typography, Grid, Button, Stack, Fade } from '@mui/material';
import Link from 'next/link';
import EventCard from '@modules/landing/components/EventCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useEvents from '@modules/events/hooks/api/useEvents';
import { Event } from '@modules/events/defs/types';

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
  const router = useRouter();
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const { readAll } = useEvents();

  useEffect(() => {
    const fetchFeaturedEvents = async () => {
      try {
        const response = await readAll();
        if (response?.success && response?.data?.items) {
          const allEvents = response.data?.items;
          const shuffled = [...allEvents].sort(() => 0.5 - Math.random());
          setFeaturedEvents(shuffled.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching featured events:', error);
      }
    };

    fetchFeaturedEvents();
  }, []);

  const handleCategoryClick = (category: string) => {
    router.push({
      pathname: '/events',
      query: category !== 'All Events' ? { category } : undefined,
    });
  };

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
                  onClick={() => handleCategoryClick(category)}
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
            {featuredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </Grid>
        </Fade>
      </Container>
    </Box>
  );
};

export default FeaturedEvents;
