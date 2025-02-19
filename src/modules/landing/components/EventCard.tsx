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
          transition: 'all 0.3s ease-in-out',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
            '& .MuiCardMedia-root': {
              transform: 'scale(1.1)',
            },
          },
        }}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="200"
            image={event.image}
            alt={event.title}
            sx={{
              transition: 'transform 0.5s ease',
            }}
          />
          <Chip
            label={event.category}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: 'primary.main',
              fontWeight: 600,
              backdropFilter: 'blur(4px)',
            }}
          />
        </Box>
        <CardContent sx={{ 
          flexGrow: 1, 
          p: 2.5,
          '&:last-child': { pb: 2.5 }
        }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h3"
            sx={{
              fontSize: '1.1rem',
              fontWeight: 700,
              lineHeight: 1.3,
              mb: 2,
              height: '2.6rem',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {event.title}
          </Typography>
          <Stack spacing={1.5} sx={{ mb: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon fontSize="small" sx={{ color: 'primary.main', opacity: 0.8 }} />
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                {event.date}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon fontSize="small" sx={{ color: 'primary.main', opacity: 0.8 }} />
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                {event.location}
              </Typography>
            </Box>
          </Stack>
          <Box sx={{ 
            mt: 'auto',
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'primary.main', 
                fontWeight: 700,
                fontSize: '1.1rem'
              }}
            >
              {event.price}
            </Typography>
            <Link href={`/dashboard/events/${event.id}`} passHref style={{ textDecoration: 'none' }}>
              <Button 
                size="medium" 
                variant="contained"
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  px: 2,
                  '&:hover': {
                    transform: 'scale(1.02)',
                  }
                }}
              >
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