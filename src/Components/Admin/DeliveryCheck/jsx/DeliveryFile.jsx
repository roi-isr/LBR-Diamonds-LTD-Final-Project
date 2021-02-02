import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ManagementTable from '../../../ManagementTable/jsx/ManagementTable'
import Button from 'react-bootstrap/Button'

const headers = ["מספר החבילה", "משקל החבילה", "מהיכן המשלוח", "חברת השילוח", "שם השולח ", "תאריך המשלוח"];
const rows = [
  ['R-101', '160.25', 'ישראל', '625', 'ADIV', 'רועי ישראלי', '1/1/21'],
  ['R-102', '152.25', 'ישראל', '625', 'ADIV', 'רועי ישראלי', '1/1/21'],
  ['R-103', '158.25', 'ישראל', '625', 'ADIV', 'רועי ישראלי', '1/1/21'],
  ['R-104', '150.25', 'ישראל', '625', 'ADIV', 'רועי ישראלי', '1/1/21'],

];

export default function DeliveryTable() {

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const add_form = () => {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open form dialog
        </Button>
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
    setContent(prevContent => prevContent.filter((item, i) => index != i));
  }
  //Returns the table to our requested page.
  return (
    <ManagementTable headers={headers} content={tableRender} />
  );
}
