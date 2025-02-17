import { FC } from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface EventProps {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
}

const Event: FC<EventProps> = ({ id, title, date, location, description, image }) => {
  return (
    <Card sx={{ maxWidth: '100%', mb: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {date}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {location}
        </Typography>
        <Typography variant="body1">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Event;