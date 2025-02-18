import Routes from '@common/defs/routes';
import ItemsTable from '@common/components/partials/ItemsTable';
import { GridColumns } from '@mui/x-data-grid';
import { CrudRow } from '@common/defs/types';
import dayjs from 'dayjs';
import { Event, CreateEventInput, UpdateEventInput } from '@modules/events/defs/types';
import Namespaces from '@common/defs/namespaces';
import useEvents from '@modules/events/hooks/api/useEvents';
import { useTranslation } from 'react-i18next';


interface Row extends CrudRow {
  title: string,
  location: string,
  organizerId: number,
  maxAttendees: number,
  description: string,
  startDate: string,
  endDate: string,
}

const EventTable = () => {
  const { t } = useTranslation(['event', 'common']);
  const columns: GridColumns<Row> = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
    },
    {
      field: 'location',
      headerName: 'Location',
      flex: 1,
    },
    {
      field: 'organizerId',
      headerName: 'Organizer',
      flex: 1,
    },
    {
      field: 'maxAttendees',
      headerName: 'Max Attendees',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      renderCell: (params) => {
        const startDate = dayjs(params.row.startDate).format('DD/MM/YYYY');
        const endDate = dayjs(params.row.endDate).format('DD/MM/YYYY');
        return `${startDate} - ${endDate}`;
      }
    },
  ];

  const itemToRow = (item: Event): Row => (
    {
      id: item.id,
      title: item.title,
      location: item.location,
      organizerId: item.organizerId,
      maxAttendees: item.maxAttendees,
      description: item.description,
      startDate: item.startDate,
      endDate: item.endDate,
    }
  )


  return (
    <>
      <ItemsTable<Event, CreateEventInput, UpdateEventInput, Row>
        namespace={Namespaces.Events}
        routes={Routes.Events}
        columns={columns}
        useItems={useEvents}
        itemToRow={itemToRow}
        showEdit={() => true}
        showDelete={() => true}
        showLock
        exportable
      />
    </>
  );
};

export default EventTable;