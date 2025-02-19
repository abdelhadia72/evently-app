import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const menuItems = [
  { label: 'Browse Events', href: '/dashboard/events' },
  { label: 'Create Event', href: '/dashboard' },
  { label: 'Help', href: '/help' },
];

const LandingHeader = () => {
  const { t } = useTranslation('topbar');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              Evently
            </Typography>
          </Link>

          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={handleClose}
                    component={Link}
                    href={item.href}
                  >
                    {item.label}
                  </MenuItem>
                ))}
                <MenuItem onClick={handleClose} component={Link} href="/auth/login">
                  {t('login')}
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} href="/auth/register">
                  {t('register')}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {menuItems.map((item) => (
                <Button key={item.label} component={Link} href={item.href} color="inherit">
                  {item.label}
                </Button>
              ))}
              <Button component={Link} href="/auth/login" color="inherit">
                {t('login')}
              </Button>
              <Button component={Link} href="/auth/register" variant="contained" color="primary">
                {t('register')}
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default LandingHeader;
