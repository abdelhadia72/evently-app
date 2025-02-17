import { ROLE } from '@modules/permissions/defs/types';

export const ROLES_OPTIONS = [
  { value: ROLE.ADMIN, label: 'Administrator' },
  { value: ROLE.ORGANIZER, label: 'Organizer' },
  { value: ROLE.ATTENDEE, label: 'Attender' },
];
