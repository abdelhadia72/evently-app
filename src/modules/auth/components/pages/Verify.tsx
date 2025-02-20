import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Button } from '@mui/material';
import FormProvider, { RHFTextField } from '@common/components/lib/react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useAuth, { VerifyInput } from '@modules/auth/hooks/api/useAuth';
import Routes from '@common/defs/routes';
import { useTranslation } from 'react-i18next';

const Verify = () => {
  const { user, verify, resendOtp } = useAuth();
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const { t } = useTranslation(['auth', 'common']);
  // const email = router.query.email as string;
  const email = user?.email;

  const VerifySchema = Yup.object().shape({
    email: Yup.string().required(),
    otp: Yup.string()
      .required(t('common:field_required'))
      .matches(/^[0-9]+$/, t('auth:invalid_otp'))
      .min(6, t('auth:min_length_error'))
      .max(6, t('auth:max_length_error')),
  });

  const methods = useForm<VerifyInput>({
    resolver: yupResolver(VerifySchema),
    defaultValues: {
      email: email || '',
      otp: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: VerifyInput) => {
    const response = await verify(data, { displayProgress: true, displaySuccess: true });

    if (response.success) {
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
    <Box sx={{ maxWidth: 480, mx: 'auto', p: 3 }}>
      <Typography variant="h4" paragraph textAlign="center">
        {t('auth:verify_otp_title')}
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }} textAlign="center">
        {t('auth:verify_otp_description')}
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <RHFTextField name="otp" label={t('auth:otp_code')} />

          <Button fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            {t('auth:verify_otp')}
          </Button>

          <Button
            fullWidth
            size="large"
            variant="outlined"
            disabled={isResending}
            onClick={handleResendOtp}
          >
            {t('auth:resend_otp')}
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default Verify;
