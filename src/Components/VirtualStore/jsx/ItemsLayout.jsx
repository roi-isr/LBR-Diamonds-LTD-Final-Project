import React, { useState, useEffect } from "react";
import '../css/VirtualStore.css'
import ManagementTable from '../../ManagementTable/jsx/ManagementTable'
import Button from 'react-bootstrap/Button';
import FormModal from '../../../Components/UI-Elements/Modal/Modal';
import fetchGet from '../../../ApiEndpoints/Get'
import fetchDelete from '../../../ApiEndpoints/Delete'
import Loader from 'react-loader-spinner'

const headers= ['model','Shape','size','color','clarity','$/carat']
const inputFields = [
  { name: "Name", type: 'text' },
  { name: "Mail", type: 'mail' },
  { name: "Model", type: 'text' },
  { name: "Size", type: 'text' },
  { name: "Date", type: 'date' },
  { name: "Content", type: 'text' }
  ];

function ItemsLayout() {
   
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
      
  

  
        tempContent.push([...item.slice(1)]);
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
      <div style={{ textAlign: 'center',direction:"ltr" }}>
        {loading ?
          <Loader style={{ margin: 'auto' }}
            type='Bars'
            height={300}
            width={300}
            color="SlateBlue"
          /> :
          <ManagementTable 
          style={{direction:"ltr"}}
            headers={headers}
            content={tableRender}
            startIdx = {1}
            contentController={{
              content,
              setContent
            }}
          />
        }
        <FormModal
          fields={inputFields}
          directionInput='ltr'
          modalType="input-form"
          popUpTitle="Contact seller"
          postPath="delivery"
          updatePostUi={updatePostUi}
        />
  
      </div>
  
    );
}
export default ItemsLayout;




