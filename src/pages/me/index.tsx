import { NextPage } from 'next';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import Routes from '@common/defs/routes';
import { Box, Card, Grid, Typography, CircularProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PageHeader from '@common/components/lib/partials/PageHeader';
import FormProvider, { RHFTextField } from '@common/components/lib/react-hook-form';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { LockOpen } from '@mui/icons-material';
import useUsers, { UpdateOneInput } from '@modules/users/hooks/api/useUsers';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import useTickets from '@modules/tickets/hooks/api/useTickets';
import TicketCard from '@modules/tickets/components/TicketCard';

interface Ticket {
  id: number;
  ticketNumber: string;
  status: string;
  qrCode: string;
  event: {
    title: string;
    startDate: string;
    location: string;
  };
}

const MyProfile: NextPage = () => {
  const { user } = useAuth();
  const { updateOne } = useUsers();
  const ticketsHook = useTickets();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching tickets...');
        const response = await ticketsHook.getUserTickets();
        console.log('Tickets response:', response);

        if (response?.data?.data) {
          setTickets(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchTickets();
    }
  }, [user]);

  if (!user) {
    console.warn('[MyProfile] No user data found');
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography color="warning.main">No user data available. Please log in again.</Typography>
      </Box>
    );
  }

  const ProfileSchema = Yup.object().shape({
    email: Yup.string()
      .max(191, 'Field is too long.')
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .max(191, 'Field is too long.')
      .min(8, 'Password must be at least 8 characters'),
  });

  const methods = useForm<UpdateOneInput>({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      email: user?.email || '',
      password: '',
      role: user?.rolesNames[0],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data: UpdateOneInput) => {
    if (!user) {
      return;
    }
    await updateOne(user.id, data, { displayProgress: true, displaySuccess: true });
  };

  const renderTicketsSection = () => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        My Tickets
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {!tickets || tickets.length === 0 ? (
            <Typography color="text.secondary" align="center">
              No tickets found
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {tickets.map((ticket) => (
                <Grid item xs={12} md={6} lg={4} key={ticket.id}>
                  <TicketCard ticket={ticket} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );

  return (
    <>
      <Box sx={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
        <PageHeader title="My Profile" />
      </Box>
      <Card sx={{ maxWidth: '500px', margin: 'auto' }}>
        <Box sx={{ padding: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom>
            Account Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Account Status
              </Typography>
              <Typography>{user?.isVerified ? 'Verified' : 'Not Verified'}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Member Since
              </Typography>
              <Typography>
                {user?.createdAt ? format(new Date(user.createdAt), 'MMM dd, yyyy') : '-'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Role
              </Typography>
              <Typography sx={{ textTransform: 'capitalize' }}>
                {user?.rolesNames[0] || '-'}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Last Login
              </Typography>
              <Typography>
                {user?.lastLoginAt
                  ? format(new Date(user.lastLoginAt), 'MMM dd, yyyy HH:mm')
                  : 'Never'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3} columnSpacing={2} sx={{ padding: 5 }}>
            <Grid item xs={12}>
              <RHFTextField name="email" label="Email" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField
                name="password"
                label="Change Password"
                type="password"
                helperText="Leave empty to keep current password"
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <LoadingButton
                size="large"
                variant="contained"
                type="submit"
                startIcon={<LockOpen />}
                loadingPosition="start"
                loading={isSubmitting}
              >
                Update Profile
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>

      {/* Tickets Section */}
      {renderTicketsSection()}
    </>
  );
};

export default withAuth(MyProfile, {
  mode: AUTH_MODE.LOGGED_IN,
  redirectUrl: Routes.Auth.Login,
});
