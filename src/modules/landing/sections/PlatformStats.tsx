import React from 'react';
import { Box, Container, Typography, Grid, Paper, Fade } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';

const stats = [
  {
    icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />,
    value: '10,000+',
    label: 'Events Hosted',
    description: 'Successful events organized through our platform',
    color: '#FF6B6B',
  },
  {
    icon: <GroupIcon sx={{ fontSize: 40 }} />,
    value: '1M+',
    label: 'Happy Attendees',
    description: 'People who found their perfect event',
    color: '#4158D0',
  },
  {
    icon: <BusinessIcon sx={{ fontSize: 40 }} />,
    value: '5,000+',
    label: 'Event Organizers',
    description: 'Professional organizers trust our platform',
    color: '#43E97B',
  },
  {
    icon: <StarIcon sx={{ fontSize: 40 }} />,
    value: '99%',
    label: 'Satisfaction Rate',
    description: 'From event organizers and attendees',
    color: '#FA709A',
  },
];

const PlatformStats = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: (theme) => theme.palette.grey[50],
      }}
    >
      <Container maxWidth="lg">
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
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
              Why Choose Evently
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                fontSize: '1rem',
              }}
            >
              Join thousands of event organizers who trust our platform
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={2.5}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Fade in timeout={1000 + index * 200}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    transition: 'all 0.3s ease-in-out',
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                      '& .icon-wrapper': {
                        transform: 'scale(1.1)',
                      },
                    },
                  }}
                >
                  <Box
                    className="icon-wrapper"
                    sx={{
                      mb: 2,
                      transition: 'transform 0.3s ease-in-out',
                      display: 'inline-flex',
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 0.5,
                      fontWeight: 700,
                      fontSize: { xs: '1.75rem', md: '2rem' },
                      color: stat.color,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: 'text.primary',
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {stat.description}
                  </Typography>
                </Paper>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PlatformStats;
