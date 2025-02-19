import Routes from '@common/defs/routes';
import ItemsTable from '@common/components/partials/ItemsTable';
import { User } from '@modules/users/defs/types';
import useUsers, { CreateOneInput, UpdateOneInput } from '@modules/users/hooks/api/useUsers';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { GridColumns } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import Namespaces from '@common/defs/namespaces';
import { CrudRow } from '@common/defs/types';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

interface Row extends CrudRow {
  email: string;
  createdAt: string;
  roles: string[];
}

const UsersTable = () => {
  const { t, i18n } = useTranslation(['user']);
  const columns: GridColumns<Row> = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'email',
      headerName: t('user:list.email'),
      flex: 1,
    },
    {
      field: 'is_verified',
      headerName: 'Verified',
      flex: 1,
      renderCell: (params) => {
        return params.row.is_verified === 'Verified' ? (
          <CheckCircleIcon color="success" />
        ) : (
          <CancelIcon color="error" />
        );
      },
    },
    {
      field: 'otp',
      headerName: 'code',
      flex: 1,
    },
    {
      field: 'roles',
      headerName: 'Role',
      type: 'boolean',
      width: 125,
      renderCell: (params) => {
        const { row: item } = params;
        const { roles } = item;
        if (roles.includes('admin')) {
          return <div style={{ color: '#D32F2F', fontWeight: 600 }}>Admin</div>;
        }
        if (roles.includes('organizer')) {
          return <div style={{ color: '#1976D2', fontWeight: 600 }}>Organizer</div>;
        }
        return <div style={{ color: '#388E3C', fontWeight: 600 }}>User</div>;
      },
    },
    {
      field: 'createdAt',
      headerName: t('user:list.created_at'),
      type: 'dateTime',
      flex: 1,
      renderCell: (params) => dayjs(params.row.createdAt).format('DD/MM/YYYY hh:mm'),
    },
  ];
  const [translatedColumns, setTranslatedColumns] = useState<GridColumns<Row>>(columns);

  useEffect(() => {
    setTranslatedColumns(columns);
  }, [t, i18n.language]);

  const itemToRow = (item: User): Row => {
    console.log('verfied is ', item.isVerified);
    return {
      id: item.id,
      email: item.email,
      otp: item.otp || '-----',
      is_verified: item.isVerified ? 'Verified' : 'Not Verified',
      createdAt: item.createdAt,
      roles: item.rolesNames,
    };
  };

  return (
    <>
      <ItemsTable<User, CreateOneInput, UpdateOneInput, Row>
        namespace={Namespaces.Users}
        routes={Routes.Users}
        useItems={useUsers}
        columns={translatedColumns}
        itemToRow={itemToRow}
        showEdit={() => true}
        showDelete={() => true}
        showLock
        exportable
      />
    </>
  );
};

export default UsersTable;
