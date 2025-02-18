import { RHFSelect, RHFTextField } from '@common/components/lib/react-hook-form';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import Routes from '@common/defs/routes';
import { ItemResponse } from '@common/hooks/useItems';
import { ROLES_OPTIONS } from '@modules/permissions/defs/options';
import { ROLE } from '@modules/permissions/defs/types';
import { User } from '@modules/users/defs/types';
import useUsers, { CreateOneInput } from '@modules/users/hooks/api/useUsers';
import { Grid, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';

interface CreateUserFormProps {}

const CreateUserForm = (_props: CreateUserFormProps) => {
  const router = useRouter();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required('This field is required'),
    password: Yup.string().required('This field is required'),
    role: Yup.mixed<ROLE>()
      .oneOf(Object.values(ROLE), (_values) => {
        return `The field must have one of the following values: ${ROLES_OPTIONS.map(
          (option) => option.label
        ).join(', ')}`;
      })
      .required('This field is required'),
  });
  const defaultValues: CreateOneInput = {
    email: '',
    password: '',
    role: ROLE.ATTENDEE,
  };
  const onPostSubmit = async (
    _data: CreateOneInput,
    response: ItemResponse<User>,
    _methods: UseFormReturn<CreateOneInput>
  ) => {
    if (response.success) {
      router.push(Routes.Users.ReadAll);
    }
  };
  return (
    <>
      <CreateCrudItemForm<User, CreateOneInput>
        routes={Routes.Users}
        useItems={useUsers}
        schema={schema}
        defaultValues={defaultValues}
        onPostSubmit={onPostSubmit}
      >
        <Grid container spacing={3} sx={{ padding: 6 }}>
          <Grid item xs={6}>
            <RHFTextField name="email" label="Email" />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name="password" label="Mot de passe" type="password" />
          </Grid>
          <Grid item xs={6}>
            <RHFSelect name="role" label="Role">
              {ROLES_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
        </Grid>
      </CreateCrudItemForm>
    </>
  );
};

export default CreateUserForm;
