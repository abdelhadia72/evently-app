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
        link: Routes.Common.Home,
      },
      {
        text: 'Manage Users',
        icon: <icons.users />,
        link: Routes.Common.Home,
      },
      {
        text: 'Manage Events',
        icon: <icons.event />,
        link: Routes.Common.Home,
      },
      {
        text: 'Support',
        icon: <icons.chat />,
        link: Routes.Common.Home,
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
