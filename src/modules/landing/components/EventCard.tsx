import React from 'react'
import Link from 'next/link';
import { Box, Button, Card, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface EventCardProps {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  category: string;
  price: string;
}

const EventCard = (event: EventCardProps) => {
  return (
    <Grid item xs={12} sm={6} md={3} key={event.id}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        }}
      >
        <CardMedia
          component="img"
          height="160"
          image={event.image}
          alt={event.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Chip
            label={event.category}
            size="small"
            color="primary"
            sx={{ mb: 1 }}
          />
          <Typography gutterBottom variant="h6" component="h3">
            {event.title}
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {event.date}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {event.location}
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" color="primary.main" fontWeight="600">
              {event.price}
            </Typography>
            <Link href={`/dashboard/events/${event.id}`} passHref style={{ textDecoration: 'none' }}>
              <Button size="small" variant="outlined">
                Get Tickets
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default EventCard