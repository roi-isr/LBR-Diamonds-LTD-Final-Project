import React, { useState, useEffect } from 'react';
import '../css/StockTable.css'
import { CircularProgressbar } from 'react-circular-progressbar'
import ManagementTable from '../../../ManagementTable/jsx/ManagementTable'
import Button from 'react-bootstrap/Button';
import fetchGet from '../../../../ApiEndpoints/Get';
import fetchDelete from '../../../../ApiEndpoints/Delete';
import FormModal from '../../../UI-Elements/Modal/Modal'
import Loader from 'react-loader-spinner';

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

const headers = ["מודל", "משקל", "עלות", "נקיון", "צבע", "קוד", "תאריך קנייה - תשלום", "הערות", "סטטוס", "מלאי", "", ""];

export default function StockTable() {
  const [content, setContent] = useState([[]]);
  const [tableRender, setTableRender] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fecth data from DB
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let tempContent = [];
    console.log(content)
    content.forEach((item, index) => {
      const confirmBtn =
        <Button
          key={Math.random() * index}
          variant={content[index][9] === 'בחנות' ? "outline-danger" : "outline-success"}
          onClick={() => moveInOutStoreHandler(index)}>
          {content[index][9] === 'בחנות' ? 'הוצא מהחנות' : 'העבר לחנות'}
        </Button>;

      const updateBtn =
        <Button
          key={Math.random() * index}
          variant="outline-warning">
          עדכן
        </Button>;

      const deleteBtn =
        <Button
          key={Math.random() * index}
          onClick={() => deleteRow(index)}
          variant="outline-danger">
          הסר
       </Button>;

      const renderItems = item.slice(1);
      tempContent.push([...renderItems, confirmBtn, updateBtn, deleteBtn]);
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

  const updatePostUi = (newDelivery) => {
    setContent(prevContent => [...prevContent, newDelivery]);
  }

  const renderData = (data) => {
    const tempStock = []
    Object.values(data).forEach(stockValues => {
      const subTempStock = [];
      subTempStock.push(
        stockValues['stock_id'], stockValues['package_model'],
        stockValues['weight_in_karat'], stockValues['cost_per_karat'],
        stockValues['clearance'], stockValues['color'],
        stockValues['code'], stockValues['sell_date'],
        stockValues['comments'], stockValues['status'],
        stockValues['weight_in_karat'] * stockValues['cost_per_karat'],
      );
      tempStock.push(subTempStock);
    });
    setContent(tempStock);
  }

  const deleteRow = async (index) => {
    const con = window.confirm("Are you sure that you want to delete the item?");
    if (!con) {
      return
    }
    try {
      await fetchDelete(`stock/${content[index][0]}`);
      setContent(prevContent => prevContent.filter((item, i) => index != i));
    } catch {
      alert('Error in deletion...')
    }
  }

  const moveInOutStoreHandler = (index) => {
    const tempContent = [...content];
    tempContent[index][9] = tempContent[index][9] === 'בחנות' ? 'לא בחנות' : 'בחנות';
    setContent(tempContent)
  }

  //Returns the table to our requested page, shows us all the company's current inventory.
  //Another element gives an indication to the business owner, what the status of his credit line at a given moment.
  return (
    <div className="stock-main-div">
      {loading ?
        <Loader style={{ margin: 'auto' }}
          type='Bars'
          height={300}
          width={300}
          color="SlateBlue"
        /> :
        <ManagementTable
          headers={headers}
          content={tableRender}
          startIdx={1}
          contentController={{
            content,
            setContent
          }}
        />
      }
      <FormModal
        fields={inputFields}
        modalType="input-form"
        popUpTitle="הוספת מלאי"
        postPath="stock"
        updatePostUiFunc={updatePostUi}
      />

      <div className="progress-stock-wrapper">
        <label> ניצול מסגרת האשראי </label>
        <CircularProgressbar
          maxValue={100}
          value={10}
          percentage={10}
          text={`${10}%`} />
      </div>
    </div >
  );

}
