import { RHFSelect, RHFTextField } from '@common/components/lib/react-hook-form';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import Routes from '@common/defs/routes';
import { Event, CreateEventInput } from '@modules/events/defs/types';
import useEvents from '@modules/events/hooks/api/useEvents';
import { Grid, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import dayjs from 'dayjs';

const CATEGORIES = [
  { value: 'tech', label: 'Technology' },
  { value: 'business', label: 'Business' },
  { value: 'food', label: 'Food' },
  { value: 'sports', label: 'Sports' },
  { value: 'music', label: 'Music' },
  { value: 'art', label: 'Art' },
  { value: 'other', label: 'Other' }
];

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' }
];

const CreateEventForm = () => {
  const { t } = useTranslation(['event', 'common']);

  const schema = Yup.object().shape({
    title: Yup.string()
      .min(3, t('common:min_length', { min: 3 }))
      .max(100, t('common:max_length', { max: 100 }))
      .required(t('common:field_required')),
    description: Yup.string()
      .min(10, t('common:min_length', { min: 10 }))
      .max(500, t('common:max_length', { max: 500 }))
      .required(t('common:field_required')),
    location: Yup.string()
      .min(3, t('common:min_length', { min: 3 }))
      .max(100, t('common:max_length', { max: 100 }))
      .required(t('common:field_required')),
    maxAttendees: Yup.number()
      .min(1, t('common:min_value', { min: 1 }))
      .required(t('common:field_required')),
    startDate: Yup.string().required(t('common:field_required')),
    startTime: Yup.string().required(t('common:field_required')),
    endDate: Yup.string()
      .required(t('common:field_required'))
      .test('is-after-start', t('event:end_date_after_start'), function(value) {
        const { startDate, startTime, endTime } = this.parent;
        if (!startDate || !value) return true;
        const startDateTime = dayjs(`${startDate} ${startTime}`);
        const endDateTime = dayjs(`${value} ${endTime}`);
        return endDateTime.isAfter(startDateTime);
      }),
    endTime: Yup.string().required(t('common:field_required')),
    category: Yup.string().required(t('common:field_required')),
    status: Yup.string().required(t('common:field_required')),
    imageUrl: Yup.string().url(t('common:invalid_url')),
  });

  const defaultValues: CreateEventInput = {
    title: '',
    description: '',
    location: '',
    maxAttendees: 1,
    startDate: dayjs().format('YYYY-MM-DD'),
    startTime: dayjs().format('HH:mm'),
    endDate: dayjs().add(1, 'hour').format('YYYY-MM-DD'),
    endTime: dayjs().add(1, 'hour').format('HH:mm'),
    category: 'other',
    status: 'draft',
    imageUrl: '',
  };

  const handleSubmit = (data: CreateEventInput) => {
    const updatedData = {
      ...data,
      startDate: `${data.startDate} ${data.startTime}`,
      endDate: `${data.endDate} ${data.endTime}`,
    };
    delete updatedData.startTime;
    delete updatedData.endTime;
    
    return {
      data: updatedData
    };
  };

  return (
    <CreateCrudItemForm<Event, CreateEventInput>
      routes={Routes.Events}
      useItems={useEvents}
      schema={schema}
      defaultValues={defaultValues}
      onPreSubmit={handleSubmit}
    >
      <Grid container spacing={3} sx={{ padding: 6 }}>
        <Grid item xs={12} md={6}>
          <RHFTextField name="title" label={t('event:title')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField name="location" label={t('event:location')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField 
            name="maxAttendees" 
            label={t('event:maxAttendees')}
            type="number"
            inputProps={{ min: 1 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFSelect name="category" label={t('event:category')}>
            {CATEGORIES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFSelect name="status" label={t('event:status')}>
            {STATUS_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField 
            name="imageUrl" 
            label={t('event:imageUrl')}
            type="url"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField 
            name="startDate" 
            label={t('event:startDate')}
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField 
            name="startTime" 
            label={t('event:startTime')}
            type="time"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              step: 300
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField 
            name="endDate" 
            label={t('event:endDate')}
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFTextField 
            name="endTime" 
            label={t('event:endTime')}
            type="time"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              step: 300
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFTextField 
            name="description" 
            label={t('event:description')}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>
    </CreateCrudItemForm>
  );
};

export default CreateEventForm;