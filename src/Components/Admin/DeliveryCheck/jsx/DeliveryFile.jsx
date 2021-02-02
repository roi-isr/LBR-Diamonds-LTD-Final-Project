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
import Input from '@material-ui/core/Input';

import Modal from 'react-bootstrap/Modal'


const englishTitles = ['id', 'weigth', 'from_country', 'delivery_comany', 'contact_name', 'date'];

const headers = ["מספר החבילה", "משקל החבילה", "מהיכן המשלוח", "חברת השילוח", "שם השולח ", "תאריך המשלוח"];
const rows = [
  ['R-101', '160.25', 'ישראל', '625', 'ADIV', 'רועי ישראלי', '1/1/21'],
  ['R-102', '152.25', 'ישראל', '625', 'ADIV', 'רועי ישראלי', '1/1/21'],
  ['R-103', '158.25', 'ישראל', '625', 'ADIV', 'רועי ישראלי', '1/1/21'],
  ['R-104', '150.25', 'ישראל', '625', 'ADIV', 'רועי ישראלי', '1/1/21'],
]

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
    <React.Fragment>
      <ManagementTable headers={headers} content={content} />

      <AddForm />
    </React.Fragment>

  );
}
