import React, { useState, useEffect } from 'react';
import ManagementTable from '../../../ManagementTable/jsx/ManagementTable'
import Button from 'react-bootstrap/Button'
import '../css/DeliveryFile.css';
import FormModal from '../../../UI-Elements/Modal/Modal';
import fetchGet from '../../../../ApiEndpoints/Get';
import fetchDelete from '../../../../ApiEndpoints/Delete';
import Loader from 'react-loader-spinner';
import NoItems from '../../../UI-Elements/NoItems';

const updateMap = new Map();

const inputFields = [
  { name: "מספר החבילה", type: 'text' },
  { name: "משקל החבילה", type: 'text' },
  { name: " מהיכן המשלוח", type: 'text' },
  { name: "חברת השילוח", type: 'text' },
  { name: "שם השולח", type: 'text' },
  { name: "תאריך המשלוח", type: 'date' }];

const moveToStockFields = (currWeight) => [
  { name: "מודל", type: 'text' },
  { name: "משקל החבילה", type: 'text', defaultValue: currWeight.toString() },
  { name: "עלות", type: 'text' },
  {
    name: "ניקיון", select: true,
    options: [
      { value: 'VVS1', label: 'VVS1' },
      { value: 'VVS2', label: 'VVS2' },
      { value: 'VS1', label: 'VS1' },
      { value: 'VS2', label: 'VS2' },
      { value: 'SI1', label: 'SI1' },
      { value: 'SI2', label: 'SI2' },
      { value: 'I1', label: 'I1' },
      { value: 'I2', label: 'I2' },
      { value: 'I3', label: 'I3' },
    ]
  },
  {
    name: "צבע", select: true,
    options: [
      { value: 'D', label: 'D' },
      { value: 'E', label: 'E' },
      { value: 'F', label: 'F' },
      { value: 'G', label: 'G' },
      { value: 'H', label: 'H' },
      { value: 'I', label: 'I' },
      { value: 'J', label: 'J' },
      { value: 'K', label: 'K' },
      { value: 'L', label: 'L' },
      { value: 'M', label: 'M' },
    ]
  },
  { name: "קוד", type: 'text' },
  { name: "הערות", type: 'text' },
  { name: "תאריך קנייה - תשלום", type: 'date' },
  { name: "מחיר מכירה", type: 'text' },
  {
    name: "סטטוס", select: true,
    options: [{ value: 'בחנות', label: 'בחנות' }, { value: 'לא בחנות', label: 'לא בחנות' }]
  },
];

const headers = ["מספר החבילה", "משקל החבילה", "מהיכן המשלוח", "חברת השילוח", "שם השולח ", "תאריך המשלוח", "", "", ""];

export default function DeliveryTable() {
  const [content, setContent] = useState([[]]);
  const [tableRender, setTableRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateModalId, setUpdateModalId] = useState(false);
  const [moveToStockModalId, setMoveToStockModalId] = useState(false);

  // Fecth data from DB
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchGet('deliveries');
        console.log(fetchedData)
        renderData(fetchedData);

      } catch {
        console.log("Failed to fetch contact data from DB");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const deleteRow = async (index) => {
      const con = window.confirm("Are you sure that you want to delete the item?");
      if (!con) {
        return
      }
      try {
        // Delete from DB
        await fetchDelete(`delivery/${content[index][0]}`);
        // Delete from UI
        setContent(prevContent => prevContent.filter((item, i) => index !== i));
      } catch {
        alert('Error in deletion...')
      }
    }

    let tempContent = [];
    content.forEach((item, index) => {
      if (item.length < headers.length - 2) {
        return;
      }
      const confirmBtn =
        <Button
          key={Math.random() * index}
          variant="outline-success"
          onClick={() => setMoveToStockModalId({ _id: item[0], weight: item[2] })}>
          אישור הגעה
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
    setTableRender(tempContent);
  }, [content])

  const updatePostUi = (newDelivery) => {
    setContent(prevContent => [...prevContent, newDelivery]);
  }

  const updatePutUi = (updatedItem) => {
    const tempContent = [...content];
    const wantedIndex = tempContent.findIndex((item) => item[0] === updatedItem[0]);
    tempContent[wantedIndex] = [...updatedItem];
    updateMap[updatedItem[0]] = [
      { name: "קוד החבילה", content: updatedItem[1] },
      { name: "משקל", content: updatedItem[2] },
      { name: "מהיכן המשלוח", content: updatedItem[3] },
      { name: "חברת השילוח", content: updatedItem[4] },
      { name: "שם השולח", content: updatedItem[5] },
      { name: "תאריך המשלוח", content: updatedItem[6], type: 'date' },
    ];
    setContent(tempContent);
  }

  // Convert the data fetch for DB into renderable data
  const renderData = (data) => {
    const tempDelivery = [];
    Object.values(data).forEach(deliveryValues => {
      const subTempDelivery = [];
      subTempDelivery.push(
        deliveryValues['delivery_id'], deliveryValues['package_code'],
        deliveryValues['package_weight'], deliveryValues['delivery_from_country'],
        deliveryValues['delivery_company'], deliveryValues['sender'], deliveryValues['send_date']
      );
      tempDelivery.push(subTempDelivery);

      updateMap[deliveryValues['delivery_id']] = [
        { name: "קוד החבילה", content: deliveryValues['package_code'] },
        { name: "משקל", content: deliveryValues['package_weight'] },
        { name: "מהיכן המשלוח", content: deliveryValues['delivery_from_country'] },
        { name: "חברת השילוח", content: deliveryValues['delivery_company'] },
        { name: "שם השולח", content: deliveryValues['sender'] },
        { name: "תאריך המשלוח", content: deliveryValues['send_date'], type: 'date' },
      ];
    });
    setContent(tempDelivery);
  }

  const formModalVar =
    <FormModal
      fields={inputFields}
      modalType="input-form"
      popUpTitle="הוספת משלוח"
      apiPath="delivery"
      updatePostUiFunc={updatePostUi}
    />;


  //Returns the table to our requested page.
  return (
    <div className="delivery-main-div">
      {loading ?
        <Loader
          className="spinner-icon"
          type='Bars'
          height={300}
          width={300}
          color="SlateBlue"
        /> :
        <React.Fragment>
          {Object.keys(content).length === 0 && !loading ?
            <NoItems /> :
            <ManagementTable
              title="משלוחים"
              headers={headers}
              content={tableRender}
            />}
          {formModalVar}
          {
            updateModalId &&
            <FormModal
              modalType="update-form"
              fields={updateMap[updateModalId]}
              autoShow={true}
              closeForm={() => setUpdateModalId(false)}
              popUpTitle="עדכון פרטי משלוח"
              apiPath={`delivery/${updateModalId}`}
              updatePutUiFunc={updatePutUi}
            />
          }
          {
            moveToStockModalId &&
            <FormModal
              modalType="input-form"
              fields={moveToStockFields(moveToStockModalId['weight'])}
              autoShow={true}
              closeForm={() => setMoveToStockModalId(false)}
              popUpTitle="העברת משלוח למלאי"
              apiPath={`delivery/move-to-stock/${moveToStockModalId['_id']}`}
              deleteUiFunc={() => setContent(prevContent => prevContent.filter(item => item[0] != moveToStockModalId['_id']))}
            />
          }
        </React.Fragment>
      }

    </div>

  );
}
