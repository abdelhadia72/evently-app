import FormProvider, { RHFTextField } from '@common/components/lib/react-hook-form';
import { LockOpen, PersonOutline, BusinessCenter } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Typography, Box, ToggleButton, ToggleButtonGroup, alpha } from '@mui/material';
import { useForm } from 'react-hook-form';
import useAuth, { RegisterInput } from '@modules/auth/hooks/api/useAuth';
import Link from '@mui/material/Link';
import Routes from '@common/defs/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';

const RegisterForm = () => {
  const { register } = useAuth();
  const [userType, setUserType] = useState('attendee');

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email format is incorrect')
      .max(191, 'Field is too long.')
      .required('This field is required'),
    password: Yup.string().max(191, 'Field is too long.').required('This field is required'),
    role: Yup.string()
      .oneOf(['attendee', 'organizer'], 'Role must be attendee or organizer')
      .required('This field is required'),
  });

  const methods = useForm<RegisterInput>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      role: 'attendee',
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const handleUserTypeChange = (_: React.MouseEvent<HTMLElement>, value: string | null) => {
    if (value) {
      setUserType(value);
      setValue('role', value as 'attendee' | 'organizer');
    }
  };

  const onSubmit = async (data: RegisterInput) => {
    try {
      console.log('registration data:', data);
      const result = await register(
        {
          email: data.email,
          password: data.password,
          role: data.role,
        },
        { displayProgress: true, displaySuccess: true }
      );
      // README
      console.log('result:', result);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: (theme) => theme.palette.grey[50],
      }}
    >
      <Box
        sx={{
          width: '55%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: { xs: 4, md: 8 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Card
          sx={{
            p: 5,
            maxWidth: 580,
            mx: 'auto',
            width: '100%',
            borderRadius: 1,
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 800,
              textAlign: 'center',
              background: '#263238',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Create Your Account
          </Typography>

          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ToggleButtonGroup
                  value={userType}
                  exclusive
                  onChange={handleUserTypeChange}
                  fullWidth
                  sx={{
                    '& .MuiToggleButton-root': {
                      borderRadius: 1,
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.success.main, 0.05),
                      },
                    },
                  }}
                >
                  <ToggleButton
                    value="attendee"
                    sx={{
                      py: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      '&.Mui-selected': {
                        bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                      },
                    }}
                  >
                    <PersonOutline />
                    <Typography variant="body2">Attendee</Typography>
                  </ToggleButton>
                  <ToggleButton
                    value="organizer"
                    sx={{
                      py: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      '&.Mui-selected': {
                        bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                      },
                    }}
                  >
                    <BusinessCenter />
                    <Typography variant="body2">Organizer</Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              <Grid item xs={12}>
                <RHFTextField
                  name="email"
                  label="Email"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '5px',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <RHFTextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '5px',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <LoadingButton
                  fullWidth
                  size="large"
                  variant="contained"
                  type="submit"
                  startIcon={<LockOpen />}
                  loadingPosition="start"
                  loading={isSubmitting}
                  sx={{
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    borderRadius: '10px',
                    background: '#263238',
                    boxShadow: '0 3px 5px 2px rgba(129, 199, 132, .3)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 10px 4px rgba(129, 199, 132, .3)',
                    },
                  }}
                >
                  Sign Up
                </LoadingButton>
              </Grid>

              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    '& a': {
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    },
                  }}
                >
                  Already have an account? <Link href={Routes.Auth.Login}>Sign in</Link>
                </Typography>
              </Grid>
            </Grid>
          </FormProvider>
        </Card>
      </Box>

      <Box
        sx={{
          width: '45%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 6,
          background: '#92e3a9',
          clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)',
        }}
      >
        <Box
          component="img"
          src="/images/illustrations/auth/login.svg"
          sx={{
            width: '85%',
            maxWidth: 480,
            filter: 'drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.15))',
          }}
        />
        <Typography
          variant="h3"
          sx={{
            mt: 4,
            color: 'common.white',
            fontWeight: 700,
            textAlign: 'center',
            textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          Welcome to Evently
        </Typography>
        <Typography
          sx={{
            mt: 2,
            color: 'common.white',
            textAlign: 'center',
            maxWidth: '80%',
            opacity: 0.9,
          }}
        >
          Create unforgettable experiences and connect with like-minded people
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
