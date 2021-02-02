
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ManagementTable from '../../ManagementTable/jsx/ManagementTable'
import Fab from '@material-ui/core/Fab';
import Button from 'react-bootstrap/Button'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



const headers = ["מודל", "משקל ", "מחיר לקראט ", "סה''כ", "קוד", "שם הקונה", "תאריך מכירה ", "תשלום"];

const content = [
  ['R-101','1.25','500','625','R','ADIV','1/1/21','60-DAYS',<Button variant="outline-danger">הסר</Button>],
  ['R-101','1.25','500','625','R','ADIV','1/1/21','90-DAYS'],
  ['R-101','1.25','500','625','R','ADIV','1/1/21','30-DAYS'],
  ['R-101','1.25','500','625','R','ADIV','1/1/21','90-DAYS'],
  ['R-101','1.25','500','625','R','ADIV','1/1/21','CASH']

];

export default function SellTable() {
  const classes = useStyles();



  // //Function of deleting a row from the table, at the click of a button the row is deleted from the database.
  // const deleteBtn = (ind) => {
  //   const con = window.confirm("Are you sure?");
  //   if (!con)
  //     return;
  //   setRows(currRow =>
  //     currRow.filter((item, index) => index !== ind));
  // }

  //Returns the table to our requested page.
  return (
    <React.Fragment>
      <ManagementTable headers={headers} content={content}/>
      <button type="button" class="btn btn-primary btn-lg btn-block">הוספת מכירה חדשה</button>
   
    </React.Fragment>
  );
}
