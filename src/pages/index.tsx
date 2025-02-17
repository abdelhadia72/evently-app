import { NextPage } from 'next';
import Hero from '@modules/landing/sections/Hero';
import Features from '@modules/landing/sections/Features';
import Pricing from '@modules/landing/sections/Pricing';
import Contact from '@modules/landing/sections/Contact';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const LandingPage: NextPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
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
