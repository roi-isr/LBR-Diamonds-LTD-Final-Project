import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../css/StockTable.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import ManagementTable from '../../../ManagementTable/jsx/ManagementTable'
import Fab from '@material-ui/core/Fab';
import Button from 'react-bootstrap/Button'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const rows = [
  ['R-101', '1.25', '500', '575', 'vs', 'D', 'R', 'ADIV', '1/1/20', '60-DAYS', 'daniel', '50,500'],
  ['R-101', '1.25', '500', '575', 'vs', 'D', 'R', 'ADIV', '1/1/21', '60-DAYS', 'daniel', '50,500'],
  ['R-101', '1.25', '500', '575', 'vs', 'D', 'R', 'ADIV', '1/1/22', '60-DAYS', 'daniel', '50,500'],
  ['R-101', '1.25', '500', '575', 'vs', 'D', 'R', 'ADIV', '1/1/23', '60-DAYS', 'daniel', '50,500'],
  ['R-101', '1.25', '500', '575', 'vs', 'D', 'R', 'ADIV', '1/1/24', '60-DAYS', 'daniel', '50,500']
];

const headers = ["מודל", "משקל ", "עלות", "מכירה", "נקיון ", "צבע", "קוד", "הערות", "מכירות", "מלאי", "תאריך מכירה - תשלום ", "יתרה "];


export default function StockTable() {

  const [content, setContent] = useState({});

  useEffect(async () => {
    const tempContent = await retrieveDataFromDb();
    setContent(tempContent);
  }, []);

  const retrieveDataFromDb = () => {
    return new Promise(resolve => {
      let tempContent = new Object();

      rows.forEach((item, index) => {

        const deleteBtn =
          <Button
            key={Math.random() * index}
     
            variant="outline-danger">
            הסר
          </Button>;

        const confirmBtn =
          <Button
            key={Math.random() * index}
            variant="outline-success">
            אישור הגעה
         </Button>;

        tempContent[index] = [...item, deleteBtn, confirmBtn];
      });
      resolve(tempContent);
    })
  }

  const classes = useStyles();

  //Returns the table to our requested page, shows us all the company's current inventory.
  //Another element gives an indication to the business owner, what the status of his credit line at a given moment.
  return (
    <React.Fragment>

      <ManagementTable headers={headers} content={content} />
      <button type="button" class="btn btn-primary btn-lg btn-block">הוספת פריט חדש</button>
      <div className="progress-stock-wrapper">
        <label> ניצול מסגרת האשראי </label>
        <CircularProgressbar
          maxValue={100}
          value={10}
          percentage={10}
          text={`${10}%`} />
      </div>


    </React.Fragment>
  );
}
