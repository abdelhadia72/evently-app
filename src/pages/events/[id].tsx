import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  Chip,
  Paper,
  Avatar,
  useTheme,
  alpha,
} from '@mui/material';
import { Event } from '@modules/events/defs/types';
import useEvents from '@modules/events/hooks/api/useEvents';
import useAuth from '@modules/auth/hooks/api/useAuth';
import useTickets from '@modules/tickets/hooks/api/useTickets';
import dayjs from 'dayjs';
import {
  FaClock,
  FaMapMarkedAlt,
  FaRegCalendarAlt,
  FaTag,
  FaTicketAlt,
  FaUsers,
} from 'react-icons/fa';

const EventPage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const theme = useTheme();
  const eventId = router.query.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { readOne } = useEvents();
  const { getEventTickets, bookTicket, cancelTicket } = useTickets();
  const [hasActiveTicket, setHasActiveTicket] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        try {
          const response = await readOne(Number(eventId));
          if (response.success && response.data) {
            setEvent(response.data);
          }
        } catch (error) {
          console.error('Error fetching event:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    const checkUserTicket = async () => {
      if (eventId && user) {
        const response = await getEventTickets(eventId);
        if (response.success && response.data.data) {
          const userTicket = response.data.data.find((ticket) => ticket.userId === user.id);
          setHasActiveTicket(userTicket);
        }
      }
    };

    checkUserTicket();
  }, [eventId, user, hasActiveTicket]);

  const handleTicketAction = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    try {
      if (hasActiveTicket) {
        const response = await cancelTicket(eventId);
        if (response.success) {
          setHasActiveTicket(false);
        }
      } else {
        const response = await bookTicket(eventId);
        if (response.success) {
          setHasActiveTicket(true);
        }
      }
    } catch (error) {
      console.error('Ticket operation failed:', error);
    }
  };

  if (loading || !event) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Typography variant="h6">Loading event details...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section with Image */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '300px', md: '500px' },
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${
            event.imageUrl || '/images/photos/placeholder.jpg'
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
          mb: 4,
        }}
      >
        <Container maxWidth="lg" sx={{ pb: 6 }}>
          <Box sx={{ color: 'white', maxWidth: '800px' }}>
            <Chip
              label={event.category}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                mb: 2,
                textTransform: 'capitalize',
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: '2rem', md: '3.5rem' },
              }}
            >
              {event.title}
            </Typography>
            <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ color: 'primary.main' }}>
                  <FaRegCalendarAlt size={20} />
                </Box>
                <Typography>{dayjs(event.startDate).format('MMM D, YYYY')}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ color: 'primary.main' }}>
                  <FaMapMarkedAlt size={20} />
                </Box>
                <Typography>{event.location}</Typography>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom fontWeight={700}>
                About This Event
              </Typography>
              <Typography
                sx={{
                  color: 'text.secondary',
                  whiteSpace: 'pre-line',
                  mb: 4,
                }}
              >
                {event.description}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  mt: 3,
                }}
              >
                <Chip
                  icon={<FaUsers />}
                  label={`${event.maxAttendees} spots`}
                  sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                />
                <Chip
                  icon={<FaClock />}
                  label={`${dayjs(event.startDate).format('h:mm A')} - ${dayjs(
                    event.endDate
                  ).format('h:mm A')}`}
                  sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                />
                <Chip
                  icon={<FaTag />}
                  label={event.status}
                  sx={{ bgcolor: alpha(theme.palette.success.main, 0.1) }}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                mb: 4,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.main,
                  0.05
                )}, ${alpha(theme.palette.primary.light, 0.1)})`,
              }}
            >
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    Free
                  </Typography>
                  <Typography color="text.secondary">General Admission</Typography>
                </Box>
                <Button
                  onClick={handleTicketAction}
                  fullWidth
                  variant={hasActiveTicket ? 'outlined' : 'contained'}
                  color={hasActiveTicket ? 'error' : 'primary'}
                  startIcon={<FaTicketAlt />}
                >
                  {hasActiveTicket ? 'Cancel Ticket' : 'Book Ticket'}
                </Button>
              </Stack>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight={700}>
                Organizer
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: 'primary.main',
                    fontSize: '1.5rem',
                  }}
                >
                  {event.organizer.email[0].toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {event.organizer.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Event Organizer
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EventPage;
