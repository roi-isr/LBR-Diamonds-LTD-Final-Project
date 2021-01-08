import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, weigth,color, clarity, carbs, protein,seller) {
  return { name, weigth, clarity,color, carbs, protein, seller };
}

const rows = [
  createData('R-101', 159, 'vs',6.0, 24, 4.0,'דניאל'),
  createData('R-102', 237, 'vs',9.0, 37, 4.3,'רועי'),
  createData('R-103', 262, 'vs',16.0, 24, 6.0,''),
  createData('R-104', 305, 'vs',3.7, 67, 4.3,''),
  createData('R-105', 356, 'si',16.0, 49, 3.9,''),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" style={{direction:'rtl'}}>
        <TableHead>
          <TableRow>
            <TableCell>מספר סידורי </TableCell>
            <TableCell align="left">משקל החבילה</TableCell>
            <TableCell align="left">נקיון היהלום</TableCell>
            <TableCell align="left">עלות לקראט</TableCell>
            <TableCell align="left">סך עלות החבילה</TableCell>
            <TableCell align="left">שם המוכר</TableCell>
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
  );
}
