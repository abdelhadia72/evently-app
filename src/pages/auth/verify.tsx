import { NextPage } from 'next';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import Routes from '@common/defs/routes';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Verify from '@modules/auth/components/pages/Verify';

const LoginPage: NextPage = () => {
  return (
    <>
      <Verify />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['topbar', 'footer', 'sign-in', 'common'])),
  },
});
export default withAuth(LoginPage, {
  mode: AUTH_MODE.LOGGED_IN,
  redirectUrl: Routes.Common.Landing,
});
