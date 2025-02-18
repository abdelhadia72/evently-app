import { RHFSelect, RHFTextField } from '@common/components/lib/react-hook-form';
import UpdateCrudItemForm from '@common/components/partials/UpdateCrudItemForm';
import Routes from '@common/defs/routes';
import { Event, UpdateEventInput } from '@modules/events/defs/types';
import useEvents from '@modules/events/hooks/api/useEvents';
import { Grid, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useSnackbar } from '@common/contexts/SnackbarProvider';
import { useRouter } from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import { ItemResponse } from '@common/hooks/useItems';

interface UpdateEventFormProps {
  item: Event;
}

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
  { value: 'published', label: 'Published' },
  { value: 'cancelled', label: 'Cancelled' }
];

const UpdateEventForm = (props: UpdateEventFormProps) => {
  const { item } = props;
  const { t } = useTranslation(['event', 'common']);
  const snackbar = useSnackbar();
  const router = useRouter();

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

  const defaultValues: UpdateEventInput = {
    id: item.id,
    title: item.title,
    description: item.description,
    location: item.location,
    maxAttendees: item.maxAttendees,
    startDate: dayjs(item.startDate).format('YYYY-MM-DD'),
    startTime: dayjs(item.startDate).format('HH:mm'),
    endDate: dayjs(item.endDate).format('YYYY-MM-DD'),
    endTime: dayjs(item.endDate).format('HH:mm'),
    category: item.category,
    status: item.status,
    imageUrl: item.imageUrl,
  };

  const onPostSubmit = async (
    data: UpdateEventInput,
    response: ItemResponse<Event>,
    methods: UseFormReturn<UpdateEventInput>
  ) => {
    if (response.success) {
      snackbar.enqueueSnackbar(t('common:item_updated_successfully'), { variant: 'success' });
      router.push(Routes.Events.ReadAll);
    } else {
      snackbar.enqueueSnackbar(response.message || t('common:something_went_wrong'), { variant: 'error' });
    }
  };

  const handleSubmit = (data: UpdateEventInput) => {
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
    <UpdateCrudItemForm<Event, UpdateEventInput>
      item={item}
      routes={Routes.Events}
      useItems={useEvents}
      schema={schema}
      defaultValues={defaultValues}
      onPreSubmit={handleSubmit}
      onPostSubmit={onPostSubmit}
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
    </UpdateCrudItemForm>
  );
};

export default UpdateEventForm;
