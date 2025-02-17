import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const DashboardOverviewPage: NextPage = () => {
  const { t } = useTranslation(['dashboard', 'common']);

  return (
    <Box sx={{ mt: 8, mb: 4 }}>
      <Container>
        <PageHeader title="Dashboard Overview" />
        <CustomBreadcrumbs
          links={[
            { name: t('common:dashboard'), href: Routes.Common.Home },
            { name: 'Overview' },
          ]}
        />
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">0</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6">Total Events</Typography>
                <Typography variant="h4">0</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6">Active Events</Typography>
                <Typography variant="h4">0</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
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

export default withAuth(DashboardOverviewPage, {
  mode: AUTH_MODE.LOGGED_IN,
  redirectUrl: Routes.Auth.Login,
});
