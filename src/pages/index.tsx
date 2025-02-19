import { NextPage } from 'next';
import Hero from '@modules/landing/sections/Hero';
import Features from '@modules/landing/sections/Features';
import FeaturedEvents from '@modules/landing/sections/FeaturedEvents';
import Contact from '@modules/landing/sections/Contact';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PopularCategories from '@modules/landing/sections/PopularCategories';

const LandingPage: NextPage = () => {
  return (
    <>
      <Hero />
      <PopularCategories />
      <FeaturedEvents />
      <Features />
      <Contact />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['landing', 'common'])),
  },
});

export default LandingPage;
