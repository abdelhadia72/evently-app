import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import Routes from '@common/defs/routes';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  styled,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useAuth from '@modules/auth/hooks/api/useAuth';
import Stack from '@mui/material/Stack';
import Logo from '@common/assets/svgs/Logo';
import { ArrowForwardIos, Logout } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface TopbarItem {
  label: string;
  link?: string;
  onClick?: () => void;
}

interface TopbarProps {
  onToggle?: () => void;
}

const Topbar = ({ onToggle }: TopbarProps) => {
  const { t } = useTranslation(['topbar']);
  const router = useRouter();
  const [showDrawer, setShowDrawer] = useState(false);
  const { user, logout } = useAuth();

  const navItems: TopbarItem[] = [];

  const onNavButtonClick = (item: TopbarItem) => {
    return () => {
      setShowDrawer(false);
      if (item.onClick) {
        item.onClick();
      }
    };
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleClose();
    router.push(Routes.Users.Me);
  };

  const handleLogoutClick = () => {
    handleClose();
    logout();
  };

  const onAuthButtonClick = (mode: string) => {
    if (router.pathname === Routes.Common.Home) {
      if (mode === 'login') {
        return router.push(Routes.Auth.Login);
      }
      if (mode === 'register') {
        return router.push(Routes.Auth.Register);
      }
    }
    if (mode === 'login') {
      router.push({
        pathname: Routes.Auth.Login,
        query: { url: encodeURIComponent(router.pathname) },
      });
    }
    if (mode === 'register') {
      router.push({
        pathname: Routes.Auth.Register,
        query: { url: encodeURIComponent(router.pathname) },
      });
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: (theme) => theme.customShadows.z1,
        backgroundColor: 'transparent',
        width: 'fit',
        height: '64px',
      }}
    >
      <Container maxWidth={false}>
        <Toolbar sx={{ px: { xs: 0, sm: 0 } }}>
          <IconButton
            onClick={onToggle}
            sx={{
              backgroundColor: 'white',
              mr: 2,
              color: 'grey.700',
            }}
          >
            <MenuIcon />
          </IconButton>
          <Stack flexDirection="row" alignItems="center" flexGrow={1} />
          <List sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {/* Home Link  */}
            <>
              {navItems.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    width: 'fit-content',
                  }}
                >
                  <StyledListItemButton
                    sx={{
                      ...(router.pathname === item.link && {
                        color: 'primary.main',
                      }),
                    }}
                    onClick={onNavButtonClick(item)}
                  >
                    {item.label}
                  </StyledListItemButton>
                </ListItem>
              ))}
            </>
            {/* Notifications */}
            <NotificationsRoundedIcon sx={{ color: 'black' }} />
            {!user ? (
              <>
                <ListItem
                  sx={{
                    width: 'fit-content',
                  }}
                >
                  <StyledListItemButton
                    onClick={() => onAuthButtonClick('login')}
                    sx={{
                      ...(router.pathname === Routes.Auth.Login && {
                        color: 'primary.main',
                      }),
                    }}
                  >
                    {t('topbar:login')}
                  </StyledListItemButton>
                </ListItem>
                <ListItem
                  sx={{
                    width: 'fit-content',
                  }}
                >
                  <Button
                    variant="contained"
                    endIcon={
                      <ArrowForwardIos
                        fontSize="small"
                        className="arrow-icon"
                        sx={{ fontSize: '12px', transition: 'all, 0.15s' }}
                      />
                    }
                    onClick={() => onAuthButtonClick('register')}
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      '&:hover': {
                        '.arrow-icon': {
                          transform: 'translateX(0.25rem)',
                        },
                      },
                    }}
                  >
                    {t('topbar:register')}
                  </Button>
                </ListItem>
              </>
            ) : (
              <ListItem sx={{ width: 'fit-content' }}>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  onMouseEnter={handleClick}
                >
                  <Avatar>AB</Avatar>
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                  <MenuItem sx={{ color: 'error.main' }} onClick={handleLogoutClick}>
                    Logout
                  </MenuItem>
                </Menu>
              </ListItem>
            )}
          </List>
          <IconButton
            onClick={() => setShowDrawer(true)}
            sx={{
              display: { md: 'none', sm: 'flex' },
            }}
          >
            <MenuIcon fontSize="medium" sx={{ color: 'grey.700' }} />
          </IconButton>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={showDrawer} onClose={() => setShowDrawer(false)}>
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontWeight: 700,
            width: 250,
          }}
        >
          <Box
            sx={{
              padding: 4,
              '.topbar-logo': {
                width: '250px',
              },
            }}
          >
            <Logo id="responsive-topbar-logo" />
          </Box>
          {navItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={onNavButtonClick(item)}
                sx={{
                  width: '100%',
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    ...(router.pathname === item.link && {
                      color: 'primary.main',
                    }),
                  }}
                >
                  {item.label}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          {user && (
            <ListItem key="profile" disablePadding>
              <ListItemButton
                onClick={() => {
                  setShowDrawer(false);
                  router.push(Routes.Users.Me);
                }}
                sx={{
                  width: '100%',
                }}
              >
                <ListItemText
                  primaryTypographyProps={{
                    ...(router.pathname === Routes.Users.Me && {
                      color: 'primary.main',
                    }),
                  }}
                >
                  Mon Profil
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )}
          {!user ? (
            <>
              <ListItem
                disablePadding
                sx={{
                  backgroundColor: 'transparent',
                  marginBottom: 3,
                }}
              >
                <ListItemButton
                  onClick={() => {
                    setShowDrawer(false);
                    router.push(Routes.Auth.Login);
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      ...(router.pathname === Routes.Auth.Login && {
                        color: 'primary.main',
                      }),
                    }}
                  >
                    {t('topbar:login')}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
              <Button
                variant="contained"
                endIcon={
                  <ArrowForwardIos
                    fontSize="small"
                    className="arrow-icon"
                    sx={{ fontSize: '12px', transition: 'all, 0.15s' }}
                  />
                }
                onClick={() => {
                  setShowDrawer(false);
                  router.push(Routes.Auth.Register);
                }}
                sx={{
                  display: 'flex',
                  flex: 1,
                  width: 150,
                  '&:hover': {
                    '.arrow-icon': {
                      transform: 'translateX(0.25rem)',
                    },
                  },
                }}
              >
                {t('topbar:register')}
              </Button>
            </>
          ) : (
            <>
              <Button
                color="error"
                onClick={() => {
                  setShowDrawer(false);
                  logout();
                }}
                sx={{
                  display: 'flex',
                }}
                startIcon={<Logout />}
                variant="outlined"
              >
                {t('topbar:logged.logout')}
              </Button>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.grey[700],
  borderRadius: theme.shape.borderRadius + 'px',
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '.MuiTouchRipple-child': {
    backgroundColor: theme.palette.primary.main,
  },
}));
export default Topbar;
