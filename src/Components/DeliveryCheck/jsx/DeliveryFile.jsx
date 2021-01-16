import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import '../css/DeliveryFile.css';

const columns = [
  { field: 'id', headerName: 'מספר החבילה', width: 300, textAlign: 'right', headerAlign: 'center', align: 'center' },
  { field: 'weigth', type: "number", headerName: 'משקל החבילה', width: 300, textAlign: 'right', headerAlign: 'center', align: 'center' },
  { field: 'from_country', headerName: 'מהיכן המשלוח', width: 300, textAlign: 'right', headerAlign: 'center', align: 'center' },
  { field: 'delivery_comany', headerName: 'חברת השילוח', width: 300, textAlign: 'right', headerAlign: 'center', align: 'center' },
  {
    field: 'name', headerName: 'שם השולח ', width: 300, textAlign: 'right', headerAlign: 'center', align: 'center',
  },

];

const rows = [
  { id: 1, weigth: 123.5, from_country: 'israel', delivery_comany: 'malca amit', name: 'daniel' },
  { id: 2, weigth: 123.5, from_country: 'china', delivery_comany: 'malca amit', name: 'yoav' },
  { id: 3, weigth: 123.5, from_country: 'russia', delivery_comany: 'fedex', name: 'amir' },
  { id: 4, weigth: 123.5, from_country: 'arg', delivery_comany: 'malca amit', name: 'roi' },
  { id: 5, weigth: 123.5, from_country: 'usa', delivery_comany: 'malca amit', name: 'nissim' },
  { id: 6, weigth: 123.5, from_country: 'israel', delivery_comany: 'malca amit', name: 'daniel' },
  { id: 7, weigth: 123.5, from_country: 'china', delivery_comany: 'malca amit', name: 'yoav' },
  { id: 8, weigth: 123.5, from_country: 'russia', delivery_comany: 'fedex', name: 'amir' },
  { id: 9, weigth: 123.5, from_country: 'arg', delivery_comany: 'malca amit', name: 'roi' },
  { id: 10, weigth: 123.5, from_country: 'usa', delivery_comany: 'malca amit', name: 'nissim' },
  { id: 11, weigth: 123.5, from_country: 'israel', delivery_comany: 'malca amit', name: 'daniel' },
  { id: 12, weigth: 123.5, from_country: 'china', delivery_comany: 'malca amit', name: 'yoav' },
  { id: 13, weigth: 123.5, from_country: 'russia', delivery_comany: 'fedex', name: 'amir' },
  { id: 14, weigth: 123.5, from_country: 'arg', delivery_comany: 'malca amit', name: 'roi' },
  { id: 15, weigth: 123.5, from_country: 'usa', delivery_comany: 'malca amit', name: 'nissim' },
  { id: 16, weigth: 123.5, from_country: 'israel', delivery_comany: 'malca amit', name: 'daniel' },
  { id: 17, weigth: 123.5, from_country: 'china', delivery_comany: 'malca amit', name: 'yoav' },
  { id: 18, weigth: 123.5, from_country: 'russia', delivery_comany: 'fedex', name: 'amir' },
  { id: 19, weigth: 123.5, from_country: 'arg', delivery_comany: 'malca amit', name: 'roi' },
  { id: 20, weigth: 123.5, from_country: 'usa', delivery_comany: 'malca amit', name: 'nissim' },


];

export default function DeliveryTable() {
  return (
    <React.Fragment>
      <div className="delivery-table-wrapper">
        <DataGrid
          rows={rows}
          columns={columns}
          pnameSize={10}
          checkboxSelection
        />
      </div>
      <div className="credit-util-div" >
        <label>ניצול מסגרת אשראי </label>
        <CircularProgressbar
          percentage={10}
          text={`${10}%`}
        />
      </div>
    </React.Fragment>
  );
}
