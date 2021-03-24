import React, { useState, useEffect } from 'react';
import '../css/StockTable.css'
import { CircularProgressbar } from 'react-circular-progressbar'
import ManagementTable from '../../../ManagementTable/jsx/ManagementTable'
import Button from 'react-bootstrap/Button';
import fetchGet from '../../../../ApiEndpoints/Get';
import fetchDelete from '../../../../ApiEndpoints/Delete';
import FormModal from '../../../UI-Elements/Modal/Modal'
import Loader from 'react-loader-spinner';
import fetchPut from '../../../../ApiEndpoints/Put';

const updateMap = new Map();

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

const headers = ["מודל", "משקל", "עלות", "נקיון", "צבע", "קוד", "הערות", "תאריך קנייה - תשלום", "סטטוס", "מלאי", "", ""];

export default function StockTable() {
  const [content, setContent] = useState([[]]);
  const [tableRender, setTableRender] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateModalId, setUpdateModalId] = useState(false);

  // Fecth data from DB
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let tempContent = [];
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
          variant="outline-warning"
          onClick={() => setUpdateModalId(item[0])}>
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
      renderData(fetchedData);

    } catch {
      console.log("Failed to fetch contact data from DB");
    } finally {
      setLoading(false);
    }
  }

  const updatePostUi = (newItem) => {
    const newItemFixed = [...newItem,newItem[2]*newItem[3]]
    setContent(prevContent => [...prevContent, newItemFixed]);
  }

  const updatePutUi = (updatedItem) => {
    const tempContent = [...content];
    const wantedIndex = tempContent.findIndex((item) => item[0] === updatedItem[0]);
    const wantedItem = tempContent[wantedIndex];
    tempContent[wantedIndex] = [...updatedItem, wantedItem[wantedItem.length - 2], updatedItem[2] * updatedItem[3]];
    updateMap[updatedItem[0]] = [
      { name: "מודל", content: updatedItem[1] },
      { name: "משקל", content: updatedItem[2] },
      { name: "עלות", content: updatedItem[3] },
      { name: "נקיון", content: updatedItem[4] },
      { name: "צבע", content: updatedItem[5] },
      { name: "קוד", content: updatedItem[6] },
      { name: "הערות", content: updatedItem[7] },
      { name: "תאריך קנייה - תשלום", content: updatedItem[8], type: 'date' },
    ];
    setContent(tempContent);
  }

  const renderData = (data) => {
    const tempStock = []
    Object.values(data).forEach(stockValues => {
      const subTempStock = [];
      subTempStock.push(
        stockValues['stock_id'], stockValues['package_model'],
        stockValues['weight_in_karat'], stockValues['cost_per_karat'],
        stockValues['clearance'], stockValues['color'],
        stockValues['code'], stockValues['comments'],
        stockValues['sell_date'], stockValues['status'],
        stockValues['weight_in_karat'] * stockValues['cost_per_karat'],
      );
      tempStock.push(subTempStock);

      updateMap[stockValues['stock_id']] = [
        { name: "מודל", content: stockValues['package_model'] },
        { name: "משקל", content: stockValues['weight_in_karat'] },
        { name: "עלות", content: stockValues['cost_per_karat'] },
        { name: "נקיון", content: stockValues['clearance'] },
        { name: "צבע", content: stockValues['color'] },
        { name: "קוד", content: stockValues['code'] },
        { name: "הערות", content: stockValues['comments'] },
        { name: "תאריך קנייה - תשלום", content: stockValues['sell_date'], type: 'date' },
      ];
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
      setContent(prevContent => prevContent.filter((item, i) => index !== i));
    } catch {
      alert('Error in deletion...')
    }
  }

  // Move an item in or out of the store
  const moveInOutStoreHandler = async (index) => {
    const userConfirm = window.confirm(`האם אתה בטוח שברצונך ${content[index][9] === 'בחנות' ? 'להוציא' : 'להכניס'} את הפריט ${content[index][9] === 'בחנות' ? 'מה' : 'אל ה'}חנות?`);
    if (!userConfirm) {
      return;
    }
    const nextStatus = content[index][9] === 'בחנות' ? 'לא בחנות' : 'בחנות';
    try {
      await fetchPut(`stock/update-status/${content[index][0]}`, { status: nextStatus })
      const tempContent = [...content];
      tempContent[index][9] = nextStatus;
      setContent(tempContent);
      alert(`הפריט הועבר ${content[index][9] === 'בחנות' ? 'אל ה' : 'מה'}חנות בהצלחה!`)
    }
    catch {
      alert(`בעיה בהעברת פריט ${content[index][9] === 'בחנות' ? 'מה' : 'אל ה'}`);
    }
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
      {
        updateModalId &&
        <FormModal
          modalType="update-form"
          fields={updateMap[updateModalId]}
          autoShow={true}
          closeForm={() => setUpdateModalId(false)}
          popUpTitle="עדכון פרטי מלאי"
          apiPath={`stock/${updateModalId}`}
          updatePutUiFunc={updatePutUi}
        />
      }

      <FormModal
        fields={inputFields}
        modalType="input-form"
        popUpTitle="הוספת מלאי"
        apiPath="stock"
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
