import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Grid,
  TextField,
  InputAdornment,
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EventCard from '@modules/landing/components/EventCard';
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

const EventsPage = () => {
  const router = useRouter();
  const { query: searchParam } = router.query;
  const [searchQuery, setSearchQuery] = useState((searchParam as string) || '');
  const [events, setEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const { getItems, searchEvents } = useEvents();

  const fetchAllEvents = useCallback(async () => {
    try {
      const results = await getItems();
      console.log('Fetched all events:', results);
      setAllEvents(results);
      setEvents(results);
    } catch (error) {
      console.error('Error fetching all events:', error);
      setAllEvents([]);
      setEvents([]);
    }
  }, []);

  const handleSearch = useCallback(async () => {
    try {
      const newUrl = new URL(window.location.href);
      if (searchQuery?.trim()) {
        newUrl.searchParams.set('query', searchQuery);
      } else {
        newUrl.searchParams.delete('query');
      }
      router.push(newUrl.toString(), undefined, { shallow: true });

      let filteredEvents = [...allEvents];

      if (searchQuery?.trim()) {
        filteredEvents = await searchEvents(searchQuery, selectedCategory);
      }

      if (selectedCategory !== 'All Events') {
        filteredEvents = filteredEvents.filter(
          (event) => event.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      console.log('Filtered events:', filteredEvents);
      setEvents(filteredEvents);
    } catch (error) {
      console.error('Error searching events:', error);
      setEvents([]);
    }
  }, [searchQuery, selectedCategory, allEvents]);

  useEffect(() => {
    if (router.isReady) {
      fetchAllEvents();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (allEvents.length > 0) {
      handleSearch();
    }
  }, [searchQuery, selectedCategory, allEvents]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Discover Events
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: 'background.paper',
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              borderRadius: 2,
              px: 4,
              whiteSpace: 'nowrap',
            }}
          >
            Search
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 4, overflowX: 'auto' }}>
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
              variant={category === selectedCategory ? 'contained' : 'outlined'}
              onClick={() => setSelectedCategory(category)}
              sx={{
                borderRadius: 1.5,
                px: 2,
                py: 0.75,
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                minWidth: 'max-content',
                ...(category === selectedCategory
                  ? { boxShadow: 'none' }
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

      <Grid container spacing={3}>
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </Grid>

      {events.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No events found
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default EventsPage;
