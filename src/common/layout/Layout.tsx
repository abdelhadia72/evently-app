import { useRouter } from 'next/router';
import LandingLayout from './LandingLayout';
import DashboardLayout from './DashboardLayout';
import Routes from '@common/defs/routes';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const isDashboard = router.pathname.startsWith('/dashboard');

  if (isDashboard) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return <LandingLayout>{children}</LandingLayout>;
};

export default Layout;
