import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { DashboardProvider } from '@modules/dashboard/contexts/DashboardContext';
import { CRUD_ACTION } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
// import SuperAdminDashboard from '@modules/dashboard/pages/SuperAdminDashboard';
// import AdminDashboard from '@modules/dashboard/pages/AdminDashboard';

const DashboardContent = () => {
  // const { isOrganizer, isAdmin } = useDashboard();
  const { t } = useTranslation(['dashboard', 'common']);

  return (
    <Box>
      <PageHeader title="Dashboard Overview" />
      <CustomBreadcrumbs
        links={[{ name: t('common:dashboard'), href: Routes.Common.Home }, { name: 'Overview' }]}
      />
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">0</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Total Events</Typography>
              <Typography variant="h4">0</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Active Events</Typography>
              <Typography variant="h4">0</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Total Ticket</Typography>
              <Typography variant="h4">0</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
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

export default withAuth(
  withPermissions(DashboardPage, {
    requiredPermissions: {
      or: [
        {
          entity: Namespaces.Dashboard,
          action: [CRUD_ACTION.CREATE, CRUD_ACTION.READ, CRUD_ACTION.UPDATE],
        },
        {
          entity: Namespaces.Events,
          action: [CRUD_ACTION.CREATE, CRUD_ACTION.READ, CRUD_ACTION.UPDATE],
        },
      ],
    },
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
