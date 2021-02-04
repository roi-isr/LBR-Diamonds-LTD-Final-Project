import React, { useState, useEffect } from 'react';
import '../css/StockTable.css'
import { CircularProgressbar } from 'react-circular-progressbar'
import ManagementTable from '../../../ManagementTable/jsx/ManagementTable'
import Fab from '@material-ui/core/Fab';
import Button from 'react-bootstrap/Button'


const rows = [
  ['R-101', '1.25', '500', '575', 'vs', 'D', 'R', 'ADIV', '1/1/20', '60-DAYS', 'daniel', '50,500'],
  ['R-101', '1.25', '500', '575', 'vs', 'D', 'R', 'ADIV', '1/1/21', '60-DAYS', 'daniel', '50,500'],
  ['R-101', '1.25', '500', '575', 'vs', 'D', 'R', 'ADIV', '1/1/22', '60-DAYS', 'daniel', '50,500'],
  ['R-101', '1.25', '500', '575', 'vs', 'D', 'R', 'ADIV', '1/1/23', '60-DAYS', 'daniel', '50,500'],
  ['R-101', '1.25', '500', '575', 'vs', 'D', 'R', 'ADIV', '1/1/24', '60-DAYS', 'daniel', '50,500']
];

const headers = ["מודל", "משקל ", "עלות", "מכירה", "נקיון ", "צבע", "קוד", "הערות", "מכירות", "מלאי", "תאריך מכירה - תשלום ", "יתרה "];

export default function StockTable() {
  const [content, setContent] = useState(rows);
  const [tableRender, setTableRender] = useState([]);
  // Fecth data from DB
  useEffect(() => {
    let tempContent = [];
    content.forEach((item, index) => {
      const deleteBtn =
        <Button
          key={Math.random() * index}
          onClick={() => deleteRow(index)}
          variant="outline-danger">
          הסר
      </Button>;

      const confirmBtn =
        <Button
          key={Math.random() * index}
          variant="outline-success">
          אישור הגעה
            </Button>;

      tempContent.push([...item, deleteBtn, confirmBtn]);
    })
    setTableRender(tempContent)
  }, [content])

  const deleteRow = (index) => {
    const con = window.confirm("Are you sure that you want to delete the item?");
    if (!con) {
      return
    }
    setContent(prevContent => prevContent.filter((item, i) => index != i));
  }


  //Returns the table to our requested page, shows us all the company's current inventory.
  //Another element gives an indication to the business owner, what the status of his credit line at a given moment.
  return (
    <React.Fragment>

      <ManagementTable
        headers={headers}
        content={tableRender}
      />
      <button
        type="button"
        className="btn btn-primary btn-lg btn-block">
        הוספת פריט חדש
          </button>
      <div className="progress-stock-wrapper">
        <label> ניצול מסגרת האשראי </label>
        <CircularProgressbar
          maxValue={100}
          value={10}
          percentage={10}
          text={`${10}%`} />
      </div>
    </React.Fragment >
  );

}
