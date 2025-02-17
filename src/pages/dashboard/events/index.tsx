import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { Box, Container, Paper } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import Event from 'src/pages/dashboard/events/components/event';

const EventsManagementPage: NextPage = () => {
  const { t } = useTranslation(['dashboard', 'common']);

  const Events = {
    id: '1',
    title: 'Tech Conference 2024',
    date: '2025-02-15',
    location: 'San Francisco, CA',
    description: 'Join us for an exciting day of technology talks and networking opportunities.',
    image: 'https://iamge.com'
  };

  return (
    <Box 
      component="main"
      sx={{ 
        flexGrow: 1,
        py: 8,
        px: 2,
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}
    >
      <Container maxWidth="lg">
        <PageHeader title="Events Management" />
        <CustomBreadcrumbs
          links={[
            { name: t('common:dashboard'), href: Routes.Common.Home },
            { name: 'Events Management' },
          ]}
        />
        <Paper sx={{ mt: 4, p: 2 }}>
          <Event {...Events} />
        </Paper>
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

export default withAuth(EventsManagementPage, {
  mode: AUTH_MODE.LOGGED_IN,
  redirectUrl: Routes.Auth.Login,
});



