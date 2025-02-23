import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { useRouter } from 'next/router';
import { Add } from '@mui/icons-material';
import PageHeader from '@common/components/lib/partials/PageHeader';
import { CRUD_ACTION } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import EventTable from '@modules/events/partials/EventTable';
import { ROLE } from '@modules/permissions/defs/types';

const EventPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation(['user']);
  return (
    <>
      <PageHeader
        title="Event List"
        action={{
          label: 'New Event',
          startIcon: <Add />,
          onClick: () => router.push(Routes.Events.CreateOne),
          permission: {
            entity: Namespaces.Events,
            action: CRUD_ACTION.CREATE,
          },
        }}
      />
      <CustomBreadcrumbs
        links={[{ name: t('common:dashboard'), href: Routes.Common.Home }, { name: 'Events' }]}
      />
      <EventTable />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['topbar', 'footer', 'leftbar', 'user', 'common'])),
  },
});

export default withAuth(
  withPermissions(EventPage, {
    requiredPermissions: {
      or: [
        { entity: Namespaces.Events, action: CRUD_ACTION.READ },
        { entity: 'users', action: ROLE.ORGANIZER },
      ],
    },
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
