import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { Container } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { PERMISSION, ROLE } from '@modules/permissions/defs/types';
import withPermissions from '@modules/permissions/hocs/withPermissions';

const DashboardPage: NextPage = () => {
  const { t } = useTranslation(['dashboard', 'common']);

  return (
    <Container>
      <PageHeader title={t('dashboard:title')} />
      <CustomBreadcrumbs links={[{ name: t('common:dashboard'), href: Routes.Common.Home }]} />
      <div>Dashboard Content Here</div>
    </Container>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'topbar',
      'footer',
      'leftbar',
      'dashboard',
      'common',
    ])),
  },
});

export default withAuth(
  withPermissions(DashboardPage, {
    requiredPermissions: {
      or: [
        { entity: 'dashboard', action: PERMISSION.VIEW_DASHBOARD },
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

// export default withAuth(DashboardPage, {
//   mode: AUTH_MODE.LOGGED_IN,
//   redirectUrl: Routes.Auth.Login,
// });
