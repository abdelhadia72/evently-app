import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import { useRouter } from 'next/router';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { useEffect, useState } from 'react';
import useProgressBar from '@common/hooks/useProgressBar';
import { Event } from '@modules/events/defs/types';
import useEvents from '@modules/events/hooks/api/useEvents';
import { CRUD_ACTION, Id } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import UpdateEventForm from '@modules/events/partials/UpdateEventForm';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const EventUpdatePage: NextPage = () => {
  const router = useRouter();
  const { start, stop } = useProgressBar();
  const { readOne } = useEvents();
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState<null | Event>(null);
  const id: Id = Number(router.query.id);
  const { t } = useTranslation(['event', 'common']);

  useEffect(() => {
    if (loaded) {
      stop();
    } else {
      start();
    }
  }, [loaded]);

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await readOne(id);
      console.log('API Response:', response);
      if (response.success && response.data) {
        setItem(response.data);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      router.push(Routes.Events.ReadAll);
    } finally {
      setLoaded(true);
    }
  };

  if (!loaded || !item) {
    return null;
  }

  return (
    <>
      <PageHeader title={`${t('event:edit_event')} - ${item.title}`} />
      <CustomBreadcrumbs
        links={[
          { name: t('common:dashboard'), href: Routes.Common.Home },
          { name: t('event:events'), href: Routes.Events.ReadAll },
          { name: item.title },
        ]}
      />
      <UpdateEventForm item={item} />
    </>
  );
};

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['topbar', 'footer', 'leftbar', 'event', 'common'])),
  },
});

export default withAuth(
  withPermissions(EventUpdatePage, {
    requiredPermissions: {
      entity: Namespaces.Events,
      action: CRUD_ACTION.UPDATE,
    },
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
