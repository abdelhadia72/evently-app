import React from 'react';
import { Box } from '@mui/material';
import LandingHeader from '@modules/landing/partials/LandingHeader';
import LandingFooter from '@modules/landing/partials/LandingFooter';

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LandingHeader />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <LandingFooter />
    </Box>
  );
};

export default LandingLayout;
