import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import Routes from '@common/defs/routes';
import Verify from '@modules/auth/components/pages/Verify';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const VerifyPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.isVerified) {
      router.push(Routes.Common.Home);
    }
  }, [user, router]);

  if (user && !user.isVerified) {
    return <Verify />;
  }

  return null;
};

export default withAuth(VerifyPage, {
  mode: AUTH_MODE.LOGGED_IN,
  redirectUrl: Routes.Common.Landing,
});
