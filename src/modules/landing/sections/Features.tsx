import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupsIcon from '@mui/icons-material/Groups';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import PaymentsIcon from '@mui/icons-material/Payments';

const features = [
  {
    icon: <EventAvailableIcon sx={{ fontSize: 40 }} />,
    title: 'Easy Event Creation',
    description: 'Create and manage your events with our intuitive tools. Set up ticketing, schedules, and more in minutes.'
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
    title: 'Grow Your Community',
    description: 'Connect with attendees and build your audience. Promote your events to reach more people.'
  },
  {
    icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
    title: 'Powerful Analytics',
    description: 'Get detailed insights about your events. Track sales, attendance, and engagement metrics.'
  },
  {
    icon: <PaymentsIcon sx={{ fontSize: 40 }} />,
    title: 'Secure Payments',
    description: 'Handle ticket sales with confidence using our secure payment processing system.'
  }
];

const Features = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ mb: 2, fontWeight: 700 }}
          >
            Everything You Need to Host Great Events
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            Our platform provides all the tools and features you need to create, manage, and grow successful events
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 2,
                  },
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
