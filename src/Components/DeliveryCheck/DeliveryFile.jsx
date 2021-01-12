import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

const columns = [
  { field: 'id', headerName: ' מספר החבילה ', width: 200, textAlign: 'right', headerAlign: 'center', align: 'center' },
  { field: 'from_country ', headerName: 'משקל החבילה', width: 200, textAlign: 'right', headerAlign: 'center', align: 'center' },
  { field: 'delivery_comany', headerName: 'מהיכן המשלוח ', width: 200, textAlign: 'right', headerAlign: 'center', align: 'center' },
  {
    field: 'name',
    headerName: 'שם השולח ',
    type: 'number',
    width: 200,
    textAlign: 'right',
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'fullName',
    headerName: 'שם חברת השילוח',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    textAlign: 'right',
    headerAlign: 'center',
    align: 'center',
    valueGetter: (params) =>
      `${params.getValue('from country ') || ''} ${params.getValue('delivery_comany') || ''}`,
  },
];

const rows = [
  { id: 1, delivery_comany: 'malca amit', from_country: 'Jon', name: 'daniel' },
  { id: 2, delivery_comany: 'malca amit', from_country: 'Cersei', name: 'daniel' },
  { id: 3, delivery_comany: 'malca amit', from_country: 'Jaime', name: 'daniel' },
  { id: 4, delivery_comany: 'malca amit', from_country: 'Arya', name: 'daniel' },
  { id: 5, delivery_comany: 'malca amit', from_country: 'Daenerys', name: null },
  { id: 6, delivery_comany: 'malca amit', from_country: null, name: 'daniel' },
  { id: 7, delivery_comany: 'malca amit', from_country: 'Ferrara', name: 'daniel' },
  { id: 8, delivery_comany: 'malca amit', from_country: 'Rossini', name: 'daniel' },
  { id: 9, delivery_comany: 'malca amit', from_country: 'Harvey', name: 'daniel' },
];

export default function DeliveryTable() {
  return (
    <React.Fragment>

      <div style={{ height: 500, width: '100%', direction: 'rtl', }}>
        <DataGrid rows={rows} columns={columns} pnameSize={5} checkboxSelection />
      </div>
      <div style={{ width: "10%", height: "10%",margin:"auto" }}>
        <label>מסגרת אשראי</label>
        <CircularProgressbar percentage={10} text={`${10}%`} />
      </div>
    </React.Fragment>
  );
}
