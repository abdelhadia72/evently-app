import { useRouter } from 'next/router';
import LandingLayout from './LandingLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith('/dashboard');

  return <LandingLayout>{children}</LandingLayout>;
};

export default Layout;
