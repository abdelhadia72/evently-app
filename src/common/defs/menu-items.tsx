import { NavGroup } from '@common/defs/types';
import icons from '@common/defs/icons';
import { ROLE } from '@modules/permissions/defs/types';

export const menuItems: NavGroup[] = [
  {
    text: 'Main',
    items: [
      {
        text: 'Dashboard',
        icon: <icons.dashboard />,
        link: '/dashboard',
        roles: [ROLE.ADMIN, ROLE.ORGANIZER],
      },
      {
        text: 'Manage Users',
        icon: <icons.users />,
        link: '/dashboard/users',
        roles: [ROLE.ADMIN],
      },
      {
        text: 'Manage Events',
        icon: <icons.event />,
        link: '/dashboard/events',
        roles: [ROLE.ADMIN, ROLE.ORGANIZER],
      },
      {
        text: 'Support',
        icon: <icons.chat />,
        link: '/dashboard/support',
        roles: [ROLE.ADMIN],
      },
    ],
  },
];
