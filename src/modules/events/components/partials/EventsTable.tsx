import Routes from '@common/defs/routes';
import ItemsTable from '@common/components/partials/ItemsTable';
import { GridColumns } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import Namespaces from '@common/defs/namespaces';
import { CrudRow } from '@common/defs/types';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import useEvents, { Event, CreateOneInput, UpdateOneInput } from '@modules/events/hooks/api/useEvents';

interface Row extends CrudRow {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  category: string;
  status: string;
  maxAttendees: number;
}

const EventsTable = () => {
  const { t, i18n } = useTranslation(['event']);
  const columns: GridColumns<Row> = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      flex: 1,
      renderCell: (params) => dayjs(params.row.startDate).format('DD/MM/YYYY HH:mm'),
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      flex: 1,
      renderCell: (params) => dayjs(params.row.endDate).format('DD/MM/YYYY HH:mm'),
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 130,
      renderCell: (params) => {
        const { category } = params.row;
        const categoryColors: { [key: string]: string } = {
          music: '#1976D2',
          food: '#388E3C',
          default: '#757575'
        };
        const color = categoryColors[category] || categoryColors.default;
        return <div style={{ color, fontWeight: 600, textTransform: 'capitalize' }}>{category}</div>;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const { status } = params.row;
        const statusColors: { [key: string]: string } = {
          published: '#388E3C',
          draft: '#757575',
          cancelled: '#D32F2F'
        };
        const color = statusColors[status] || statusColors.draft;
        return <div style={{ color, fontWeight: 600, textTransform: 'capitalize' }}>{status}</div>;
      },
    },
    {
      field: 'maxAttendees',
      headerName: 'Capacity',
      type: 'number',
      width: 100,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      renderCell: (params) => dayjs(params.row.createdAt).format('DD/MM/YYYY HH:mm'),
    },
  ];

  const [translatedColumns, setTranslatedColumns] = useState<GridColumns<Row>>(columns);

  useEffect(() => {
    setTranslatedColumns(columns);
  }, [t, i18n.language]);

  const itemToRow = (item: Event): Row => {
    return {
      id: item.id,
      title: item.title,
      startDate: item.startDate,
      endDate: item.endDate,
      location: item.location,
      category: item.category,
      status: item.status,
      maxAttendees: item.maxAttendees,
      createdAt: item.createdAt,
    };
  };

  return (
    <>
      <ItemsTable<Event, any, any, Row>
        namespace={Namespaces.Events}
        routes={Routes.Events}
        useItems={useEvents}
        columns={translatedColumns}
        itemToRow={itemToRow}
        showEdit={() => true}
        showDelete={() => true}
        exportable
      />
    </>
  );
};

export default EventsTable;