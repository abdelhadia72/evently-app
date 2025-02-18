import React, { useState } from 'react';
import { Box } from '@mui/material';
import Leftbar from '@common/layout/Leftbar';
import { useTheme } from '@mui/material/styles';
import Topbar from './Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [openLeftbar, setOpenLeftbar] = useState(true);
  const theme = useTheme();

  const handleToggle = () => {
    setOpenLeftbar(!openLeftbar);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Leftbar open={openLeftbar} onToggle={(open) => setOpenLeftbar(open)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          width: '100%',
          backgroundColor: 'background.default',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(openLeftbar && {
            marginLeft: '260px',
            width: `calc(100% - 260px)`,
            transition: theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Topbar onToggle={handleToggle} />
        </Box>
        <Box sx={{ marginTop: '64px', padding: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
