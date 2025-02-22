import { Box, Card, Typography, Chip, Grid } from '@mui/material';
import { format } from 'date-fns';
import { QRCodeCanvas } from 'qrcode.react';

interface TicketCardProps {
  ticket: {
    ticketNumber: string;
    status: string;
    qrCode: string;
    event: {
      title: string;
      startDate: string;
      location: string;
    };
  };
}

const TicketCard = ({ ticket }: TicketCardProps) => (
  <Card
    sx={{
      p: 2,
      mb: 2,
      position: 'relative',
      background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '16px',
    }}
  >
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Typography variant="h6" gutterBottom>
          {ticket.event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {format(new Date(ticket.event.startDate), 'MMM dd, yyyy HH:mm')}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {ticket.event.location}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Chip
            label={ticket.status}
            color={ticket.status === 'active' ? 'success' : 'error'}
            size="small"
          />
        </Box>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Ticket #: {ticket.ticketNumber}
        </Typography>
      </Grid>
      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          sx={{
            p: 1,
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          }}
        >
          <QRCodeCanvas value={ticket.qrCode} size={100} />
        </Box>
      </Grid>
    </Grid>
  </Card>
);

export default TicketCard;
