import React, { useState } from 'react';
import { Box } from '@mui/material';
import Leftbar from '@common/layout/Leftbar';
import { useTheme } from '@mui/material/styles';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [openLeftbar, setOpenLeftbar] = useState(true);
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Leftbar open={openLeftbar} onToggle={(open) => setOpenLeftbar(open)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          width: '100%',
          paddingTop: '24px',
          paddingX: theme.spacing(2),
          transition: theme.transitions.create('margin', {
            duration: theme.transitions.duration.complex,
          }),
          marginLeft: openLeftbar ? '260px' : 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
