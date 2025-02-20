import { Box, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DashboardPage = () => {
  const { t } = useTranslation(['dashboard']);

  return (
    <Container maxWidth="xl">
      <Box sx={{ pb: 5 }}>
        <Typography variant="h4">{t('dashboard:welcome')}</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          Somethisn here{' '}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
