import React from 'react';
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



const content = [
  ['R-101','1.25','500','575','vs','D','R','ADIV','1/1/21','60-DAYS','daniel','50,500',<Button variant="outline-danger">הסר</Button>],
  ['R-101','1.25','500','625','R','ADIV','1/1/21','90-DAYS'],
  ['R-101','1.25','500','625','R','ADIV','1/1/21','30-DAYS'],
  ['R-101','1.25','500','625','R','ADIV','1/1/21','90-DAYS'],
  ['R-101','1.25','500','625','R','ADIV','1/1/21','CASH']

];


const headers = ["מודל", "משקל ", "עלות", "מכירה", "נקיון ", "צבע", "קוד", "הערות", "מכירות", "מלאי", "תאריך מכירה - תשלום ", "יתרה "];

export default function BasicTable() {
  const classes = useStyles();

  //Returns the table to our requested page, shows us all the company's current inventory.
  //Another element gives an indication to the business owner, what the status of his credit line at a given moment.
  return (
    <React.Fragment>

<ManagementTable headers={headers} content={content}/>

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
