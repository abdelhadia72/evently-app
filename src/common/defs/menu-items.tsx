import Routes from '@common/defs/routes';
import { CRUD_ACTION, NavGroup } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import { Group } from '@mui/icons-material';
import icons from '@common/defs/icons';

export const menuItems: NavGroup[] = [
  {
    text: 'Main',
    items: [
      {
        text: 'Dashboard',
        icon: <icons.dashboard />,
        link: '/dashboard/overview',
      },
      {
        text: 'Manage Users',
        icon: <icons.users />,
        link: '/dashboard/users',
      },
      {
        text: 'Manage Events',
        icon: <icons.event />,
        link: '/dashboard/events',
      },
      {
        text: 'Support',
        icon: <icons.chat />,
        link: '/dashboard/support',
      },

      {
        text: 'Users',
        icon: <Group />,
        link: Routes.Users.ReadAll,
        namespace: Namespaces.Users,
        permission: CRUD_ACTION.READ,
        routes: Routes.Users,
      },
    ],
  },
];
