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
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import { Event } from '@modules/events/defs/types';
import useEvents from '@modules/events/hooks/api/useEvents';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTicketAlt,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaRegCalendarAlt,
  FaVideo,
  FaMapMarkedAlt,
  FaUsers,
} from 'react-icons/fa';
import EventCard from '@modules/landing/components/EventCard';
import useAuth from '@modules/auth/hooks/api/useAuth';

const EventPage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const theme = useTheme();
  const { id: eventId } = router.query;
  const [event, setEvent] = useState<Event | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const { readOne, readAll, attend, cancelAttendance, getAttendees } = useEvents();
  const [attendToEvent, setAttendToEvent] = useState<boolean>(false);
  const [attendees, setAttendees] = useState<number[]>([]);

  useEffect(() => {
    const fetchAttendees = async () => {
      if (eventId) {
        try {
          const attendeesData = (await getAttendees(eventId)) as { id: number }[];
          const attendeeIds = attendeesData.map((attendee: { id: number }) => attendee.id);
          setAttendees(attendeeIds || []);
          // Update attendToEvent status after fetching attendees
          if (user) {
            setAttendToEvent(attendeeIds.includes(user.id));
          }
        } catch (error) {
          console.error('Error fetching attendees:', error);
        }
      }
    };

    fetchAttendees();
  }, [eventId, user]); // Add user to dependencies

  const handleAttend = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    await attend(eventId);
    // Refetch attendees after attending
    const attendeesData = (await getAttendees(eventId)) as { id: number }[];
    const attendeeIds = attendeesData.map((attendee: { id: number }) => attendee.id);
    setAttendees(attendeeIds);
    setAttendToEvent(true);
  };

  const handleCancelAttendance = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    await cancelAttendance(eventId);
    // Refetch attendees after canceling
    const attendeesData = (await getAttendees(eventId)) as { id: number }[];
    const attendeeIds = attendeesData.map((attendee: { id: number }) => attendee.id);
    setAttendees(attendeeIds);
    setAttendToEvent(false);
  };

  useEffect(() => {
    if (user && attendees.includes(user.id)) {
      setAttendToEvent(true);
    } else {
      setAttendToEvent(false);
    }
  }, [user, attendees]);

  console.log('user id is ', user && user.id);
  console.log('attendees id is ', event && attendees);

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId && !Array.isArray(eventId)) {
        try {
          const response = await readOne(Number(eventId));
          if (response.success && response.data) {
            setEvent(response.data);
            const allEventsResponse = await readAll();
            if (allEventsResponse.success && allEventsResponse.data.items) {
              const filtered = allEventsResponse.data.items
                .filter((e) => e.id !== Number(eventId))
                .slice(0, 4);
              setRelatedEvents(filtered);
            }
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

  if (loading || !event) {
    return <LoadingScreen />;
  }

  return (
    <AnimatePresence>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Box
          sx={{
            position: 'relative',
            minHeight: '600px',
            background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${
              event.imageUrl || '/placeholder.jpg'
            })`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            pt: 8,
            pb: 4,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Box sx={{ color: 'white' }}>
                    <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                      <Chip
                        icon={<FaVideo style={{ fontSize: 16 }} />}
                        label={event.status === 'online' ? 'Online Event' : 'In-Person Event'}
                        sx={{ bgcolor: 'primary.main', color: 'white', px: 2 }}
                      />
                      <Chip label={event.category} sx={{ bgcolor: alpha('#fff', 0.4), px: 2 }} />
                    </Stack>

                    <Typography variant="h2" sx={{ mb: 4, fontWeight: 800 }}>
                      {event.title}
                    </Typography>

                    <Stack spacing={3}>
                      <InfoRow
                        icon={<FaRegCalendarAlt />}
                        primary={dayjs(event.startDate).format('dddd, MMMM D, YYYY')}
                        secondary={`${dayjs(event.startDate).format('h:mm A')} - ${dayjs(
                          event.endDate
                        ).format('h:mm A')}`}
                      />
                      <InfoRow
                        icon={<FaMapMarkedAlt />}
                        primary={event.location}
                        secondary="View on map"
                      />
                      <InfoRow
                        icon={<FaUsers />}
                        primary={`${event.maxAttendees} spots remaining`}
                        secondary="Limited availability"
                      />
                    </Stack>
                  </Box>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Stack spacing={3}>
                      <Box>
                        <Typography variant="h5" fontWeight={700}>
                          Free
                        </Typography>
                        <Typography color="text.secondary">General Admission</Typography>
                      </Box>

                      {!attendToEvent ? (
                        <Button
                          onClick={handleAttend}
                          fullWidth
                          size="large"
                          variant="contained"
                          startIcon={<FaTicketAlt style={{ fontSize: 18 }} />}
                          sx={{
                            py: 1.5,
                            fontWeight: 600,
                          }}
                        >
                          Join Event
                        </Button>
                      ) : (
                        <Button
                          onClick={handleCancelAttendance}
                          fullWidth
                          size="large"
                          color="error"
                          variant="outlined"
                          startIcon={<FaTicketAlt style={{ fontSize: 18 }} />}
                          sx={{
                            py: 1.5,
                            fontWeight: 600,
                          }}
                        >
                          Cancel Ticket
                        </Button>
                      )}
                      <Box sx={{ textAlign: 'center' }}>
                        <Button startIcon={<FaShare style={{ fontSize: 16 }} />} sx={{ mr: 1 }}>
                          Share
                        </Button>
                        <Button
                          startIcon={
                            isLiked ? (
                              <FaHeart style={{ fontSize: 16 }} />
                            ) : (
                              <FaRegHeart style={{ fontSize: 16 }} />
                            )
                          }
                          onClick={() => setIsLiked(!isLiked)}
                          color={isLiked ? 'error' : 'inherit'}
                        >
                          Save
                        </Button>
                      </Box>
                    </Stack>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
                  <Typography variant="h5" gutterBottom fontWeight={700}>
                    About this Event
                  </Typography>
                  <Typography color="text.secondary" sx={{ whiteSpace: 'pre-line', mb: 4 }}>
                    {event.description}
                  </Typography>

                  <Divider sx={{ my: 4 }} />

                  <Typography variant="h6" gutterBottom>
                    Event Tags
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {['Technology', 'Workshop', 'Networking', 'Career'].map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: 'primary.main',
                        }}
                      />
                    ))}
                  </Stack>
                </Paper>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom fontWeight={700}>
                    Location
                  </Typography>
                  <Box
                    sx={{
                      height: 200,
                      mb: 2,
                      bgcolor: 'grey.100',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Map Component Here
                  </Box>
                  <Typography gutterBottom>{event.location}</Typography>
                  <Button fullWidth variant="outlined">
                    View Map
                  </Button>
                </Paper>

                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom fontWeight={700}>
                    Organizer
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 50, height: 50, bgcolor: 'primary.main' }}>
                      {event.title[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {event.organizer.username || 'Event Organizer'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.organizer.hostedEvents || 'Event Organizer'}
                      </Typography>
                    </Box>
                  </Box>
                  <Button fullWidth variant="outlined">
                    Contact Organizer
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {relatedEvents.length > 0 && (
          <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
            <Container maxWidth="lg">
              <Typography variant="h4" gutterBottom sx={{ mb: 4 }} fontWeight={700}>
                Similar Events You May Like
              </Typography>
              <Grid container spacing={4} sx={{ mb: 4 }}>
                {relatedEvents.slice(0, 4).map((relatedEvent) => (
                  <EventCard
                    id={relatedEvent.id.toString()}
                    title={relatedEvent.title}
                    image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
                    date={dayjs(relatedEvent.startDate).format('MMM D, YYYY')}
                    location={relatedEvent.location}
                    category={relatedEvent.category}
                    price="Free"
                    attendees={relatedEvent.maxAttendees}
                  />
                ))}
              </Grid>
            </Container>
          </Box>
        )}
      </Box>
    </AnimatePresence>
  );
};

const InfoRow = ({
  icon,
  primary,
  secondary,
}: {
  icon: React.ReactNode;
  primary: string;
  secondary: string;
}) => (
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Box sx={{ color: 'primary.main', mt: 0.5 }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>
        {primary}
      </Typography>
      <Typography variant="body2" sx={{ color: alpha('#fff', 0.7) }}>
        {secondary}
      </Typography>
    </Box>
  </Box>
);

const LoadingScreen = () => (
  <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography>Loading...</Typography>
  </Box>
);

export default EventPage;
