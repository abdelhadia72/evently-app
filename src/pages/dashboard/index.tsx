import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { Container } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { DashboardProvider, useDashboard } from '@modules/dashboard/contexts/DashboardContext';
import SuperAdminDashboard from '@modules/dashboard/pages/SuperAdminDashboard';
import AdminDashboard from '@modules/dashboard/pages/AdminDashboard';

const DashboardContent = () => {
  const { isOrganizer, isAdmin } = useDashboard();
  const { t } = useTranslation(['dashboard', 'common']);

  return (
    <Container>
      <PageHeader title={t('dashboard:title')} />
      <CustomBreadcrumbs links={[{ name: t('common:dashboard'), href: Routes.Common.Home }]} />

      {isOrganizer && <SuperAdminDashboard />}
      {isAdmin && !isOrganizer && <AdminDashboard />}
    </Container>
  );
};

const DashboardPage: NextPage = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
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

export default withAuth(DashboardPage, {
  mode: AUTH_MODE.LOGGED_IN,
  redirectUrl: Routes.Auth.Login,
});
