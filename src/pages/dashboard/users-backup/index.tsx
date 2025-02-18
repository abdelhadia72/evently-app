import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { Box, Container } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import UsersTable from '@modules/users/components/partials/UsersTable';

const UsersManagementPage: NextPage = () => {
  const { t } = useTranslation(['dashboard', 'common']);

  return (
    <Box sx={{ mt: 8, mb: 4 }}>
      <Container>
        <PageHeader title="Users Management" />
        <CustomBreadcrumbs
          links={[
            { name: t('common:dashboard'), href: Routes.Common.Home },
            { name: 'Users Management' },
          ]}
        />
        <Box sx={{ mt: 4 }}>
          <UsersTable />
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

export default withAuth(UsersManagementPage, {
  mode: AUTH_MODE.LOGGED_IN,
  redirectUrl: Routes.Auth.Login,
});
