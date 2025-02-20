import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button } from '@mui/material';
import FormProvider, { RHFTextField } from '@common/components/lib/react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useAuth, { VerifyInput } from '@modules/auth/hooks/api/useAuth';
import Routes from '@common/defs/routes';
import { LoadingButton } from '@mui/lab';

const Verify = () => {
  const { user, verify, resendOtp } = useAuth();
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const email = user?.email || '';

  const VerifySchema = Yup.object().shape({
    email: Yup.string().required(),
    otp: Yup.string()
      .required('This field is required')
      .matches(/^[0-9]+$/, 'Invalid OTP code')
      .min(6, 'OTP must be at least 6 characters')
      .max(6, 'OTP must not exceed 6 characters'),
  });

  const methods = useForm<VerifyInput>({
    resolver: yupResolver(VerifySchema),
    defaultValues: {
      email,
      otp: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data: VerifyInput) => {
    const response = await verify(data, { displayProgress: true, displaySuccess: true });

    if (!response.success) {
      reset({ ...data, otp: '' });
    } else {
      router.push(Routes.Common.Home);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      await resendOtp({ email, otp: '' }, { displayProgress: true, displaySuccess: true });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 480,
        mx: 'auto',
        p: 3,
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box>
        <Typography variant="h4" paragraph textAlign="center">
          Verify OTP
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 5 }} textAlign="center">
          Please enter the verification code sent to your email address
        </Typography>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <input type="hidden" {...methods.register('email')} />
            <RHFTextField name="otp" label="OTP Code" autoComplete="off" />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Verify OTP
            </LoadingButton>

            <Button
              fullWidth
              size="large"
              variant="outlined"
              disabled={isResending}
              onClick={handleResendOtp}
            >
              Resend OTP
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default Verify;
