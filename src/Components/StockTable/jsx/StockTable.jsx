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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(...data) {
  const [name, weigth, color, clarity, carbs, protein, seller] = data;
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

const englishTitles = ['weigth', 'clarity', 'color', 'carbs', 'protein', 'seller'];
const titles = ["מודל", "משקל ", "עלות", "מכירה", "נקיון ", "צבע", "קוד", "הערות", "מכירות", "מלאי", "תאריך מכירה - תשלום ", "יתרה "];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <React.Fragment>

      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="simple table"
          style={{ direction: 'rtl' }}>
          <TableHead>
            <TableRow>
              {titles.map((item, index) => (
                <TableCell
                  key={index}
                  align="left">
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  component="th"
                  scope="row">
                  {row.name}
                </TableCell>
                {Object.keys(row)
                  .filter((filArray) => filArray !== 'name')
                  .map((data, index) =>
                    <TableCell
                      key={index}
                      align="left">
                      {row[englishTitles[index]]}
                    </TableCell>
                  )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
