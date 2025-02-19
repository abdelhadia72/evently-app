import { NextPage } from 'next';
import Hero from '@modules/landing/sections/Hero';
import Features from '@modules/landing/sections/Features';
import FeaturedEvents from '@modules/landing/sections/FeaturedEvents';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PlatformStats from '@modules/landing/sections/PlatformStats';

const LandingPage: NextPage = () => {
  return (
    <>
      <Hero />
      <FeaturedEvents />
      <Features />
      <PlatformStats />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['landing', 'common'])),
  },
});

export default LandingPage;
