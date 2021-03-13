import React, { useState, useEffect } from 'react';
import '../css/StockTable.css'
import { CircularProgressbar } from 'react-circular-progressbar'
import ManagementTable from '../../../ManagementTable/jsx/ManagementTable'
import Button from 'react-bootstrap/Button';
import fetchGet from '../../../../ApiEndpoints/Get';
import fetchDelete from '../../../../ApiEndpoints/Delete';
import FormModal from '../../../UI-Elements/Modal/Modal'

const inputFields = [
  { name: "מודל", type: 'text' },
  { name: "משקל החבילה", type: 'text' },
  { name: "עלות", type: 'text' },
  { name: "ניקיון", type: 'text' },
  { name: "צבע", type: 'text' },
  { name: "קוד", type: 'text' },
  { name: "הערות", type: 'text' },
  { name: "תאריך קנייה - תשלום", type: 'date' },
  {
    name: "סטטוס", select: true,
    options: [{ value: 'בחנות', label: 'בחנות' }, { value: 'לא בחנות', label: 'לא בחנות' }]
  },
];

const rows = [
  ['R-101', '1.25', '500', 'vs', 'D', 'R', 'ADIV', '0', '1/1/20'],
  ['R-101', '1.25', '500', 'vs', 'D', 'R', 'sxd', '21', '1/1/21',],
  ['R-101', '1.25', '500', 'vs', 'D', 'R', 'ADIV', '2', '1/3/20'],
  ['R-109', '1.25', '500', 'ls', 'D', 'R', 'jhb', '23', '2/5/20'],
  ['R-101', '1.25', '500', 'vs', 'D', 'R', 'ADIV', '24', '1/12/19']
];

const headers = ["מודל", "משקל", "עלות", "נקיון", "צבע", "קוד", "הערות", "מלאי", "תאריך קנייה - תשלום"];

export default function StockTable() {
  const [content, setContent] = useState(rows);
  const [tableRender, setTableRender] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fecth data from DB
  useEffect(() => {
    fetchData();
  }, []);

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedData = await fetchGet('stocks');
      console.log(fetchedData)
      renderData(fetchedData);

    } catch {
      console.log("Failed to fetch contact data from DB");
    } finally {
      setLoading(false);
    }
  }

  const renderData = (data) => {
    const tempContent = []
    Object.values(data).forEach(contactValues => {
      const subTempContent = [];
      subTempContent.push(
        contactValues['package_model'], contactValues['weight_in_karat'], contactValues['cost_per_karat'],
        contactValues['clearance'], contactValues['color'],
        contactValues['code'], contactValues['comments'],
        contactValues['sell_date'], contactValues['status'],
      );
      tempContent.push(subTempContent);
    });
    setContent(tempContent);
  }

  const deleteRow = (index) => {
    const con = window.confirm("Are you sure that you want to delete the item?");
    if (!con) {
      return
    }
    setContent(prevContent => prevContent.filter((item, i) => index != i));
  }

  //Returns the table to our requested page, shows us all the company's current inventory.
  //Another element gives an indication to the business owner, what the status of his credit line at a given moment.
  return (
    <React.Fragment>

      <ManagementTable
        headers={headers}
        content={tableRender}
        contentController={{
          content,
          setContent
        }}
      />
      <FormModal
        fields={inputFields}
        modalType="input-form"
        popUpTitle="הוספת מלאי"
      />

      <div className="progress-stock-wrapper">
        <label> ניצול מסגרת האשראי </label>
        <CircularProgressbar
          maxValue={100}
          value={10}
          percentage={10}
          text={`${10}%`} />
      </div>
    </React.Fragment >
  );

}
