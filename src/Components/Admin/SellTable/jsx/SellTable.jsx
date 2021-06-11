import React, { useState, useEffect } from 'react';
import ManagementTable from '../../../ManagementTable/jsx/ManagementTable';
import Button from 'react-bootstrap/Button';
import FormModal from '../../../UI-Elements/Modal/Modal';
import fetchGet from '../../../../ApiEndpoints/Get';
import fetchDelete from '../../../../ApiEndpoints/Delete';
import Loader from 'react-loader-spinner';
import '../css/SellTable.css';
import NoItems from '../../../UI-Elements/NoItems';

const updateMap = new Map();

const inputFields = [
  { name: "קוד", type: 'text' },
  { name: "מודל", type: 'text' },
  { name: "משקל", type: 'number' },
  { name: "מחיר לקראט", type: 'number' },
  { name: "שם הקונה", type: 'text' },
  { name: "טלפון הקונה", type: 'number' },
  { name: "מייל הקונה", type: 'email' },
  { name: "תאריך מכירה", type: 'date' },
  { name: "תשלום", type: 'text' },
];

const headers = ["קוד", "מודל", "משקל ", "מחיר לקראט ", "סה''כ", "שם הקונה", "תאריך מכירה ", "תשלום", "", "", ""];

export default function SellTable() {
  const [content, setContent] = useState([[]]);
  const [tableRender, setTableRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateModalId, setUpdateModalId] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);

  // Fecth data from DB
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchGet('sells');
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
        await fetchDelete(`sell/${content[index][0]}`);
        // Delete from UI
        setContent(prevContent => prevContent.filter((item, i) => index !== i));
      } catch {
        alert('Error in deletion...');
      }
    }

    let tempContent = [];
    content.forEach((item, index) => {
      if (item.length < headers.length - 2) {
        return;
      }

      const customerBtn =
        <Button
          key={Math.random() * index}
          variant="outline-info"
          onClick={() => fetchCustomer(item[0])}>
          פרטי הלקוח
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

      tempContent.push([...renderItems, customerBtn, updateBtn, deleteBtn]);
    })
    setTableRender(tempContent);
  }, [content])

  const setItemForUpdate = (item) => {
    updateMap[item[0]] = [
      { name: "קוד החבילה", content: item[1] },
      { name: "מודל", content: item[2] },
      { name: "משקל", content: item[3] },
      { name: "מחיר לקראט", content: item[4] },
      { name: "שם הקונה", content: item[5] },
      { name: "תאריך מכירה", content: item[6], type: 'date' },
      { name: "תשלום", content: item[7] },
    ];
  }

  const updatePostUi = (newSell) => {
    const newSellFixed = [...newSell];
    // Add the total column
    newSellFixed.splice(5, 0, newSell[3] * newSell[4]);
    newSellFixed.splice(7, 2);
    const newSellForUpdate = [...newSellFixed];
    newSellForUpdate.splice(5, 1);
    setItemForUpdate(newSellForUpdate);
    setContent(prevContent => [...prevContent, newSellFixed]);
  }

  const updatePutUi = (updatedItem) => {
    const tempContent = [...content];
    const wantedIndex = tempContent.findIndex((item) => item[0] === updatedItem[0]);
    const updatedItemFixed = [...updatedItem];
    updatedItemFixed.splice(5, 0, updatedItem[3] * updatedItem[4])
    tempContent[wantedIndex] = [...updatedItemFixed];
    setItemForUpdate(updatedItem);
    setContent(tempContent);
  }

  // Convert the data fetch for DB into renderable data
  const renderData = (data) => {
    const tempSell = []
    Object.values(data).forEach(sellValues => {
      const subTempSell = [];
      subTempSell.push(
        sellValues['sell_id'], sellValues['package_code'],
        sellValues['package_model'], sellValues['weight_in_carat'], sellValues['price_per_carat'],
        (sellValues['weight_in_carat'] * sellValues['price_per_carat']).toFixed(2),
        sellValues['buying_customer'], sellValues['sell_date'], sellValues['payment_method']
      );
      tempSell.push(subTempSell);

      updateMap[sellValues['sell_id']] = [
        { name: "קוד החבילה", content: sellValues['package_code'] },
        { name: "מודל", content: sellValues['package_model'] },
        { name: "משקל", content: sellValues['weight_in_carat'] },
        { name: "מחיר לקראט", content: sellValues['price_per_carat'] },
        { name: "שם הקונה", content: sellValues['buying_customer'] },
        { name: "תאריך מכירה", content: sellValues['sell_date'], type: 'date' },
        { name: "תשלום", content: sellValues['payment_method'] },
      ];
    });
    setContent(tempSell);
  }

  const fetchCustomer = async (sellId) => {
    const customerData = await fetchGet(`customer/${sellId}`);
    const customerDataArr = [
      { name: "שם הלקוח", content: customerData[0]["buying_customer"] },
      { name: "מייל", content: customerData[0]["customer_mail"] },
      { name: "טלפון", content: customerData[0]["customer_phone"] }
    ]
    setCustomerModal(customerDataArr);
  }

  const formModalVar =
    <FormModal
      fields={inputFields}
      modalType="input-form"
      popUpTitle="הוספת מכירה"
      apiPath="sell"
      updatePostUiFunc={updatePostUi}
    />

  //Returns the table to our requested page.
  return (
    <div className="sell-main-div">
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
              title="מכירות"
              headers={headers}
              content={tableRender}
            />}
          {formModalVar}
          {
            customerModal &&
            <FormModal
              modalType="customer-info-form"
              fields={customerModal}
              autoShow={true}
              closeForm={() => setCustomerModal(false)}
              popUpTitle="פרטי הלקוח"
              updatePutUiFunc={updatePutUi}
            />
          }
          {
            updateModalId &&
            <FormModal
              modalType="update-form"
              fields={updateMap[updateModalId]}
              autoShow={true}
              closeForm={() => setUpdateModalId(false)}
              popUpTitle="עדכון פרטי מכירה"
              apiPath={`sell/${updateModalId}`}
              updatePutUiFunc={updatePutUi}
            />
          }
        </React.Fragment>
      }

    </div>

  );
}
