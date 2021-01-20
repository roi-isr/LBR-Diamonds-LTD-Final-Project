
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import Fab from '@material-ui/core/Fab';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(...data) {
  const [name, weigth, price, sum, model, sell_for, payment] = data
  return { name, weigth, price, sum, model, sell_for, payment };
}

const englishTitles = ['weigth', 'price', 'sum', 'model', 'sell_for', 'payment'];
const titles = ["מודל", "משקל ", "מחיר לקראט ", "סה''כ", "קוד", "שם הקונה", "תאריך מכירה ", "תשלום"];

//Database, in practice the information is retrieved from a database
const rowsData = [
  createData('R-1/4', 15, 100, 1500, 'R-101', "yossi", "1/1/21", " דיסקונט 60 יום "),
  createData('R-1/4', 15, 100, 1500, 'R-101', "ybgfssi", "1/2/21", " דיסקונט 60 יום "),
  createData('R-1/4', 15, 100, 1500, 'R-101', "fgbossi", "1/1/20", " דיסקונט 60 יום "),
  createData('R-1/4', 15, 100, 1500, 'R-101', "yovdssi", "1/1/21", " דיסקונט 60 יום "),
  createData('R-1/4', 15, 100, 1500, 'R-101', "yozvdi", "1/2/21", " דיסקונט 60 יום "),
  createData('R-1/4', 15, 100, 1500, 'R-101', "yvzdssi", "1/1/20", " דיסקונט 60 יום "),
  createData('R-1/4', 15, 100, 1500, 'R-101', "yozvzvdvzdi", "1/1/21", " דיסקונט 60 יום "),
  createData('R-1/4', 15, 100, 1500, 'R-101', "yozvddvsi", "1/2/21", " דיסקונט 60 יום "),
  createData('R-1/4', 15, 100, 1500, 'R-101', "fzsi", "1/1/20", " דיסקונט 60 יום "),
  createData('R-1/4', 15, 100, 1500, 'R-101', "yossi", "1/1/21", " דיסקונט 60 יום "),
  createData('R-1/4', 15, 100, 1500, 'R-101', "yossi", "1/2/21", " דיסקונט 60 יום "),
  createData('R-1/4', 15, 100, 1500, 'R-101', "yossi", "1/1/20", " דיסקונט 60 יום "),
];

export default function SellTable() {
  const classes = useStyles();

  const [rows, setRows] = useState([...rowsData]);

  //Function of deleting a row from the table, at the click of a button the row is deleted from the database.
  const deleteBtn = (ind) => {
    const con = window.confirm("Are you sure?");
    if (!con)
      return;
    setRows(currRow =>
      currRow.filter((item, index) => index !== ind));
  }

  //Returns the table to our requested page.
  return (
    <React.Fragment>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" style={{ direction: 'rtl' }}>
          <TableHead>
            <TableRow>
              {titles.map((item, index) => (
                <TableCell key={index} align="left">
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell
                  key={index}
                  component="th"
                  scope="row">
                  {row.name}
                </TableCell>
                {Object.keys(row)
                  // .filter((filItem) => filItem !== 'name')
                  .map((item, index) =>
                    <TableCell
                      key={index}
                      align="left">
                      {row[englishTitles[index]]}
                    </TableCell>
                  )}
                
                <Button
                  variant="contained"
                  color="secondary"
                  className={"delete_btn"}
                  onClick={() => deleteBtn(index)}
                  startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add"  style={{margin:"auto"}}>
  <AddIcon />
</Fab> 
    </React.Fragment>
  );
}
