import { Box, Drawer, IconButton, List, ListItemText, Tooltip } from '@mui/material';
import { NavItem } from '@common/defs/types';
import {
  StyledListItemButton,
  StyledListItemIcon,
} from '@common/components/lib/navigation/Drawers/styled-drawer-items';
import { ChevronRight } from '@mui/icons-material';
import { NextRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

interface NestedDrawerProps {
  navItems: NavItem[];
  leftBarWidth: number;
  isMobile: boolean;
  open: boolean;
  router: NextRouter;
  level: number;
}

const NestedDrawer = (props: NestedDrawerProps) => {
  const { navItems, leftBarWidth, open, isMobile, router, level } = props;
  const [subNavItems, setSubNavItems] = useState<NavItem[]>([]);

  const handleOpenSubDrawer = (items: NavItem[] | undefined) => {
    setSubNavItems(items || []);
  };

  const handleCloseSubDrawer = () => {
    setSubNavItems([]);
  };

  const getNormalizedLink = (link?: string): string => {
    if (!link || link.length <= 1) {
      return link || '/';
    }
    return link.endsWith('/') ? link.slice(0, -1) : link;
  };

  return (
    <Drawer
      anchor="left"
      onMouseLeave={handleCloseSubDrawer}
      open={open}
      variant={isMobile ? 'temporary' : 'persistent'}
      PaperProps={{
        sx: {
          width: leftBarWidth,
          left: leftBarWidth * level,
          bgcolor: 'background.default',
          borderRightStyle: 'dashed',
          marginTop: 0.5,
          p: 2.5,
        },
      }}
      sx={{
        display: open ? 'block' : 'none',
      }}
    >
      {subNavItems.length > 0 && (
        <NestedDrawer
          open={Boolean(subNavItems.length)}
          leftBarWidth={leftBarWidth}
          navItems={subNavItems}
          isMobile={isMobile}
          router={router}
          level={level + 1}
        />
      )}

      <Box>
        <List disablePadding>
          {navItems.map((item, itemIndex) => {
            const link = getNormalizedLink(item.link);

            return (
              <Box
                key={itemIndex}
                component={Link}
                href={link}
                passHref
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <StyledListItemButton
                  onMouseEnter={() => handleOpenSubDrawer(item.children)}
                  disableGutters
                  className={router.pathname === link ? 'active' : ''}
                >
                  <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                  <ListItemText disableTypography primary={item.text} />
                  {item.suffix && (
                    <Tooltip title={item.suffix.tooltip || ''}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          if (item.suffix?.link) {
                            router.push(item.suffix.link);
                          }
                        }}
                      >
                        {item.suffix.icon}
                      </IconButton>
                    </Tooltip>
                  )}
                  {(item.children || []).length > 0 && <ChevronRight />}
                </StyledListItemButton>
              </Box>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default NestedDrawer;
