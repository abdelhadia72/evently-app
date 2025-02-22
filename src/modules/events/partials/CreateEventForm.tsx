import { RHFSelect, RHFTextField } from '@common/components/lib/react-hook-form';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import Routes from '@common/defs/routes';
import { Event, CreateEventInput } from '@modules/events/defs/types';
import useEvents from '@modules/events/hooks/api/useEvents';
import { Grid, MenuItem, Typography, Box, Button, FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { UseFormReturn, Controller } from 'react-hook-form';
import { ItemResponse } from '@common/hooks/useItems';

const CATEGORIES = [
  { value: 'tech', label: 'event:categories.tech' },
  { value: 'business', label: 'event:categories.business' },
  { value: 'food', label: 'event:categories.food' },
  { value: 'sports', label: 'event:categories.sports' },
  { value: 'music', label: 'event:categories.music' },
  { value: 'art', label: 'event:categories.art' },
  { value: 'other', label: 'event:categories.other' },
];

const STATUS_OPTIONS = [
  { value: 'active', label: 'active' },
  { value: 'inactive', label: 'inactive' },
];

const CreateEventForm = () => {
  const { t } = useTranslation(['event', 'common']);
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
      .test('is-after-start', t('event:end_date_after_start'), (value, context) => {
        const { startDate, startTime, endTime } = context.parent;
        if (!startDate || !value) {
          return true;
        }
        const startDateTime = dayjs(`${startDate} ${startTime}`);
        const endDateTime = dayjs(`${value} ${endTime}`);
        return endDateTime.isAfter(startDateTime);
      }),
    endTime: Yup.string().required(t('common:field_required')),
    category: Yup.string().required(t('common:field_required')),
    status: Yup.string().required(t('common:field_required')),
    image: Yup.mixed()
      .required(t('common:field_required'))
      .test('fileSize', t('common:file_too_large'), (value) => {
        if (!value) {
          return true;
        }
        return value.size <= 3 * 1024 * 1024;
      })
      .test('fileType', t('common:invalid_file_type'), (value) => {
        if (!value) {
          return true;
        }
        return ['image/jpeg', 'image/png', 'image/gif'].includes(value?.type);
      }),
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
    image: null,
  };

  const onPostSubmit = async (
    _data: CreateEventInput,
    response: ItemResponse<Event>,
    _methods: UseFormReturn<CreateEventInput>
  ) => {
    if (response.success) {
      router.push(Routes.Events.ReadAll);
    }
  };

  const handleSubmit = (data: CreateEventInput) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key !== 'image' && key !== 'startTime' && key !== 'endTime') {
        formData.append(key, data[key]);
      }
    });

    formData.append('startDate', `${data.startDate} ${data.startTime}`);
    formData.append('endDate', `${data.endDate} ${data.endTime}`);

    if (data.image) {
      formData.append('image', data.image);
    }

    return {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  };

  return (
    <CreateCrudItemForm
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
                {t(option.label)}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>
        <Grid item xs={12} md={6}>
          <RHFSelect name="status" label={t('event:status')}>
            {STATUS_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {t(option.label)}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="image"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Box>
                <input
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                  style={{ display: 'none' }}
                  id="event-image-upload"
                />
                <label htmlFor="event-image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{
                      height: '200px',
                      border: '1px dashed',
                      borderColor: error ? 'error.main' : 'divider',
                      borderRadius: 1,
                    }}
                  >
                    {value ? (
                      <Box
                        component="img"
                        src={URL.createObjectURL(value)}
                        alt="Preview"
                        sx={{
                          maxHeight: '180px',
                          maxWidth: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      <Typography color="textSecondary">
                        {t('event:upload_image')}
                        <br />
                        <Typography variant="caption" component="span">
                          {t('common:max_file_size', { size: '3MB' })}
                        </Typography>
                      </Typography>
                    )}
                  </Button>
                </label>
                {error && <FormHelperText error>{error.message}</FormHelperText>}
              </Box>
            )}
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
            label={t('event:time')}
            type="time"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              step: 300,
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
            label={t('event:time')}
            type="time"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              step: 300,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <RHFTextField name="description" label={t('event:description')} multiline rows={4} />
        </Grid>
      </Grid>
    </CreateCrudItemForm>
  );
};

export default CreateEventForm;
