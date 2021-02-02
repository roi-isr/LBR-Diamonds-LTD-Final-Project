import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ManagementTable from '../../../ManagementTable/jsx/ManagementTable'
import Button from 'react-bootstrap/Button'
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

import Modal from 'react-bootstrap/Modal'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const englishTitles = ['id', 'weigth', 'from_country', 'delivery_comany', 'contact_name', 'date'];


const AddForm = function () {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
    
    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={handleShow}>הוספת משלוח</button>


      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
        <TextField
    id="outlined-secondary"
    label="מספר החבילה"
    variant="outlined"
    color="secondary"
  />
    <TextField
    id="outlined-secondary"
    label="משקל החבילה"
    variant="outlined"
    color="secondary"
  />
    <TextField
    id="outlined-secondary"
    label="מהיכן המשלוח"
    variant="outlined"
    color="secondary"
  />
       


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
        </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );

}

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

 

  const delete_btn = <Button name="delete" variant="outline-danger">הסר</Button>;

  const confirm_btn = <Button name="confirm" variant="outline-success">אישור הגעה</Button>;

  const headers = ["מספר החבילה", "משקל החבילה", "מהיכן המשלוח", "חברת השילוח", "שם השולח ", "תאריך המשלוח"];
  const content = [
    ['R-101', '160.25', 'ישראל', '625', 'ADIV', 'רועי ישראלי', '1/1/21', delete_btn, confirm_btn],
    ['R-102', '152.25', 'ישראל', '625', 'ADIV', 'רועי ישראלי', '1/1/21', delete_btn, confirm_btn],
    ['R-103', '158.25', 'ישראל', '625', 'ADIV', 'רועי ישראלי', '1/1/21', delete_btn, confirm_btn],
    ['R-104', '150.25', 'ישראל', '625', 'ADIV', 'רועי ישראלי', '1/1/21', delete_btn, confirm_btn],

  ];
  //Returns the table to our requested page.
  return (
    <React.Fragment>
      <ManagementTable headers={headers} content={content} />

      <AddForm />
    </React.Fragment>

  );
}
