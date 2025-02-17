import { Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SuperAdminDashboard = () => {
  const { t } = useTranslation(['dashboard']);

  return (
    <Container>
      <Grid item xs={12} md={4}>
        <div>Admin Widget</div>
      </Grid>
    </Container>
  );
};

export default SuperAdminDashboard;
