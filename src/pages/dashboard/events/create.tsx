import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { CRUD_ACTION } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import CreateEventForm from '@modules/events/partials/CreateEventForm';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ROLE } from '@modules/permissions/defs/types';

const CreateEventPage: NextPage = () => {
  const { t } = useTranslation(['event', 'common']);

  return (
    <>
      <PageHeader title={t('event:create_event')} />
      <CustomBreadcrumbs
        links={[
          { name: t('common:dashboard'), href: Routes.Common.Home },
          { name: t('event:events'), href: Routes.Events.ReadAll },
          { name: t('event:create_event') },
        ]}
      />
      <CreateEventForm />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['topbar', 'footer', 'leftbar', 'event', 'common'])),
  },
});

export default withAuth(
  withPermissions(CreateEventPage, {
    requiredPermissions: {
      or: [
        { entity: Namespaces.Events, action: CRUD_ACTION.CREATE },
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
