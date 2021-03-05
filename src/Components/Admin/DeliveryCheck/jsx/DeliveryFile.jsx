import React, { useState, useEffect } from 'react';

import ManagementTable from '../../../ManagementTable/jsx/ManagementTable'
import Button from 'react-bootstrap/Button'
import '../css/DeliveryFile.css';
import { } from '../../../ManagementTable/Utility'
import FormModal from '../../../UI-Elements/Modal/Modal'

const headers = ["מספר החבילה", "משקל החבילה", "מהיכן המשלוח", "חברת השילוח", "שם השולח ", "תאריך המשלוח", "", ""];

const rows = [
  ['R-101', '160.25', 'ישראל', 'ADIV', 'רועי ישראלי', '1/1/21'],
  ['R-102', '152.25', 'ישראל', 'ADIV', 'רועי ישראלי', '1/1/21'],
  ['R-103', '158.25', 'ישראל', 'ADIV', 'רועי ישראלי', '1/1/21'],
  ['R-104', '150.25', 'ישראל', 'ADIV', 'רועי ישראלי', '1/1/21'],
];

const inputFields = [
  { name: "מספר החבילה", type: 'text' },
  { name: "משקל החבילה", type: 'text' },
  { name: "חברת השילוח", type: 'text' },
  { name: "שם השולח", type: 'text' },
  { name: "תאריך המשלוח", type: 'date' }];


export default function DeliveryTable() {
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

  const sorter = (index, order) => {
    const tempContent = [...content];
    switch (order) {
      case 'ASC':
        tempContent.sort((a, b) => a[index] - b[index]);
        break;
      case 'DESC':
        tempContent.sort((a, b) => b[index] - a[index]);
        break;
      default:
        break;
    }
    setContent(tempContent);
  }
  //Returns the table to our requested page.
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

      <FormModal
        fields={inputFields}
        modalType="input-form"
        popUpTitle="הוספת משלוח"
      />

    </React.Fragment>

  );
}
