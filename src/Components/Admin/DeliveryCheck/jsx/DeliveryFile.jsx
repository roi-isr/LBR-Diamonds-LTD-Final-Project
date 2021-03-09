import React, { useState, useEffect } from 'react';
import ManagementTable from '../../../ManagementTable/jsx/ManagementTable'
import Button from 'react-bootstrap/Button'
import '../css/DeliveryFile.css';
import FormModal from '../../../UI-Elements/Modal/Modal';
import fetchGet from '../../../../ApiEndpoints/Get';
import fetchDelete from '../../../../ApiEndpoints/Delete';
import Loader from 'react-loader-spinner';

const headers = ["מספר החבילה", "משקל החבילה", "מהיכן המשלוח", "חברת השילוח", "שם השולח ", "תאריך המשלוח", "", ""];


const inputFields = [
  { name: "מספר החבילה", type: 'text' },
  { name: "משקל החבילה", type: 'text' },
  { name: " מהיכן המשלוח", type: 'text' },
  { name: "חברת השילוח", type: 'text' },
  { name: "שם השולח", type: 'text' },
  { name: "תאריך המשלוח", type: 'date' }];


export default function DeliveryTable() {
  const [content, setContent] = useState([[]]);
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

      tempContent.push([...item.length === 6 ? item : item.slice(1), deleteBtn, confirmBtn]);
    })
    setTableRender(tempContent);
  }, [content])

  const updatePostUi = (newDelivery) => {
    setContent(prevContent => [...prevContent, newDelivery]);
  }

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

  const deleteRow = async (index) => {
    const con = window.confirm("Are you sure that you want to delete the item?");
    if (!con) {
      return
    }
    // Delete from DB
    await fetchDelete(`delivery/${content[index][0]}`);
    // Delete from UI
    setContent(prevContent => prevContent.filter((item, i) => index !== i));
  }

  // Convert the data fetch for DB into renderable data
  const renderData = (data) => {
    const tempContent = []
    Object.values(data).forEach(contactValues => {
      const subTempContent = [];
      subTempContent.push(
        contactValues['delivery_id'], contactValues['package_code'], contactValues['package_weight'],
        contactValues['delivery_from_country'], contactValues['delivery_company'],
        contactValues['seller'], contactValues['send_date']
      );
      tempContent.push(subTempContent);
    });
    setContent(tempContent);
  }

  //Returns the table to our requested page.
  return (
    <div style={{ textAlign: 'center' }}>
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
          sorterUtility={{
            content,
            setContent
          }}
        />
      }
      <FormModal
        fields={inputFields}
        modalType="input-form"
        popUpTitle="הוספת משלוח"
        postPath="delivery"
        updatePostUiFunc={updatePostUi}
      />

    </div>

  );
}
