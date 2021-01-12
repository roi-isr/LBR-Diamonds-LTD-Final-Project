import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, weigth, color, clarity, carbs, protein, seller) {
  return { name, weigth, clarity, color, carbs, protein, seller };
}

const rows = [
  createData('R-1/4', 155.2, 120, 130, 'v-vs', 'D', 'R-101'),
  createData('R-1/4', 155.2, 1205, 130, 'v-vs', 'D', 'R-102'),
  createData('R-1/4', 155.2, 1208, 130, 'si', 'D', 'R-103'),
  createData('R-1/4', 155.2, 1208, 130, 'vs', 'D', 'R-104'),
  createData('R-1/4', 155.2, 120, 130, 'vs-1', 'D', 'R-105'),
  createData('R-1/4', 155.2, 120, 130, 'vs-2', 'D', 'R-106'),
  createData('R-1/4', 155.2, 120, 130, 'si-1', 'D', 'R-107'),
  createData('R-1/4', 155.2, 120, 130, 'vs', 'D', 'R-108'),

];
const titles = ["מודל", "משקל ", "עלות", "מכירה", "נקיון ", "צבע", "קוד", "הערות", "מכירות", "מלאי", "תאריך מכירה - תשלום ", "יתרה "];

export default function BasicTable() {
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
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.weigth}</TableCell>

                <TableCell align="left">{row.clarity}</TableCell>
                <TableCell align="left">{row.carbs}</TableCell>
                <TableCell align="left">{row.protein}</TableCell>
                <TableCell align="left">{row.seller}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ width: "10%", height: "10%",margin:"auto",background:"none" }}>
        <label> ניצול מסגרת האשראי </label>
        <CircularProgressbar maxValue={100} value={10} percentage={10} text={`${10}%`} />
      </div>


    </React.Fragment>
  );
}
