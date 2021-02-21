
import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import ManagementTable from '../../ManagementTable/jsx/ManagementTable'
import Fab from '@material-ui/core/Fab';
import Button from 'react-bootstrap/Button'
import { sorter } from '../../ManagementTable/Utility'
import FormModal from '../../UI-Elements/Modal/Modal'

const headers = ["מודל", "משקל ", "מחיר לקראט ", "סה''כ", "קוד", "שם הקונה", "תאריך מכירה ", "תשלום"];

const rows = [
  ['R-101', '1.25', '500', '625', 'R', 'ADIV', '1/1/21', '60-DAYS'],
  ['R-101', '1.25', '500', '625', 'R', 'ADIV', '1/1/21', '90-DAYS'],
  ['R-101', '1.25', '500', '625', 'R', 'ADIV', '1/1/21', '30-DAYS'],
  ['R-101', '1.25', '500', '625', 'R', 'ADIV', '1/1/21', '90-DAYS'],
  ['R-101', '1.25', '500', '625', 'R', 'ADIV', '1/1/21', 'CASH']

];

const inputFields = [
  { name: "מספר החבילה", type: 'text' },
  { name: "משקל החבילה", type: 'text' },
  { name: "חברת השילוח", type: 'text' },
  { name: "שם השולח", type: 'text' },
  { name: "תאריך המשלוח", type: 'date' }];

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
    const con = window.confirm("Are you sure that you want to delete the item?");
    if (!con) {
      return
    }
    setContent(prevContent => prevContent.filter((item, i) => index != i));
  }


  // Returns the table to our requested page.
  return (
    <React.Fragment>
      <ManagementTable
        headers={headers}
        content={tableRender}
        sorter={{
          sorter,
          content,
          setContent
        }}
      />
      {/* <button
        type="button"
        className="btn btn-primary btn-lg btn-block">
        הוספת מכירה חדשה
         </button> */}
      <FormModal
        fields={inputFields}
        modalType="input-form"

      />
    </React.Fragment>
  );
}
