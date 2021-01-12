
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


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, weigth, price, sum, model, sell_for, payment) {
  return { name, weigth, price, sum, model, sell_for, payment };
}


const titles = ["מודל", "משקל ", "מחיר לקראט ", "סה''כ", "קוד", "שם הקונה", "תאריך מכירה ", "תשלום"];




export default function SellTable() {
  const [rows, setRows] = useState([
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
  ]);


  const del_btn = (ind) => {
    const con = window.confirm("Are you sure?");
    if (!con)
      return;
    setRows(currRow => currRow.filter((item, index) => index !== ind));
  }

  const classes = useStyles();


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
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="left">{row.weigth}</TableCell>
                <TableCell align="left">{row.price}</TableCell>
                <TableCell align="left">{row.sum}</TableCell>
                <TableCell align="left">{row.model}</TableCell>
                <TableCell align="left">{row.sell_for}</TableCell>
                <TableCell align="left">{row.payment}</TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  className={"delete_btn"}
                  onClick={() => del_btn(index)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </React.Fragment>
  );
}
