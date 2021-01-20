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
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Fab from '@material-ui/core/Fab';

import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(...data) {
  const [id, weigth, from_country, delivery_comany, contact_name, date] = data
  return { id, weigth, from_country, delivery_comany, contact_name, date };
}


const englishTitles = ['id', 'weigth', 'from_country', 'delivery_comany', 'contact_name', 'date'];
const titles = ["מספר החבילה", "משקל החבילה", "מהיכן המשלוח", "חברת השילוח", "שם השולח ", "תאריך המשלוח"];


const rowsData = [
  createData("R101", 15, 'ISRAEL', 'Fedex', 'דניאל', '1.1.21'),

  createData("R101", 15, 'ISRAEL', 'Fedex', 'דניאל', '1.1.21'),

  createData("R101", 15, 'ISRAEL', 'Fedex', 'דניאל', '1.1.21'),


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



  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // A window that opens for adding a new item to thr table.
  const AddForm = () => {
    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

  }


  //Returns the table to our requested page.
  return (
    <div style={{textAlign:'center'}}>
      <AddForm />
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
            {rows.map((row, index2) => (
              <TableRow key={index2}>
              
                {Object.keys(row)
                  // .filter((filItem) => filItem !== 'name')
                  .map((item, index3) =>
                    <TableCell
                      key={index3}
                      align="left">
                      {row[englishTitles[index3]]}
                    </TableCell>
                  )}

                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => deleteBtn(index2)}
                  className={"delete_btn"}

                >
                  אישור הגעה
      </Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add" style={{margin:"auto"}} >
        <AddIcon />
      </Fab>
    </div>
  );
}
