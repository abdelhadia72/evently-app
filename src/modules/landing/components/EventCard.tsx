import React from 'react';
import Link from 'next/link';
import { Box, Button, Card, CardContent, CardMedia, Chip, Grid, Stack, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

interface EventCardProps {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  category: string;
  price: string;
  attendees?: number;
}

const EventCard = (event: EventCardProps) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'background.paper',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: (theme) => `0 12px 28px ${theme.palette.primary.main}15`,
            '& .MuiCardMedia-root': {
              transform: 'scale(1.1)',
            },
          },
        }}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden', pt: '60%' }}>
          <CardMedia
            component="img"
            image={event.image}
            alt={event.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              objectFit: 'cover',
            }}
          />
          <Chip
            label={event.category}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: 'primary.main',
              fontWeight: 600,
              backdropFilter: 'blur(4px)',
              borderRadius: 1.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '& .MuiChip-label': {
                px: 1.5,
              }
            }}
          />
        </Box>
        <CardContent 
          sx={{ 
            flexGrow: 1, 
            p: 2,
            '&:last-child': { pb: 2 }
          }}
        >
          <Typography 
            variant="h6" 
            component="h3"
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              lineHeight: 1.4,
              mb: 2,
              height: '2.8rem',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              color: 'text.primary',
            }}
          >
            {event.title}
          </Typography>
          <Stack spacing={1.5} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon 
                fontSize="small" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '1rem'
                }} 
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '0.875rem'
                }}
              >
                {event.date}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon 
                fontSize="small" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '1rem'
                }} 
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '0.875rem'
                }}
              >
                {event.location}
              </Typography>
            </Box>
            {event.attendees && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon 
                  fontSize="small" 
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: '1rem'
                  }} 
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: '0.875rem'
                  }}
                >
                  {event.attendees} attending
                </Typography>
              </Box>
            )}
          </Stack>
          <Box 
            sx={{ 
              mt: 'auto',
              pt: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'primary.main', 
                fontWeight: 600,
                fontSize: '1rem'
              }}
            >
              {event.price}
            </Typography>
            <Link 
              href={`/dashboard/events/${event.id}`} 
              passHref 
              style={{ textDecoration: 'none', flexShrink: 0 }}
            >
              <Button 
                variant="contained"
                size="small"
                sx={{
                  borderRadius: 1.5,
                  textTransform: 'none',
                  px: 2,
                  py: 0.75,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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
  );
};

export default EventCard;