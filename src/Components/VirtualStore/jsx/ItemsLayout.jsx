import React, { useState, useEffect } from "react";
import '../css/VirtualStore.css';
import ManagementTable from '../../ManagementTable/jsx/ManagementTable';
import Button from 'react-bootstrap/Button';
import FormModal from '../../../Components/UI-Elements/Modal/Modal';
import fetchGet from '../../../ApiEndpoints/Get';
import Loader from 'react-loader-spinner';

const headers = ['Model', 'Weight (Carat)', 'Price (per Carat)', 'Clarity', 'Color'];


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
      const offerBtn =
      <Button
        key={Math.random() * index}
        variant="outline-success">
        SEND OFFER
     </Button>;

      const renderItems = item.slice(1);
      tempContent.push([...renderItems, offerBtn]);
    })
    setTableRender(tempContent);
  }, [content])

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedData = await fetchGet('store-items');
      renderData(fetchedData);

    } catch {
      console.log("Failed to fetch contact data from DB");
    } finally {
      setLoading(false);
    }
  }

  // Convert the data fetch for DB into renderable data
  const renderData = (data) => {
    const tempContent = []
    Object.values(data).forEach(storeValues => {
      const subTempContent = [];
      subTempContent.push(
        storeValues['stock_id'], storeValues['package_model'], storeValues['weight_in_karat'], storeValues['cost_per_karat'],
        storeValues['clearance'], storeValues['color'],
      );

      tempContent.push(subTempContent);
    });
    setContent(tempContent);
  }

  //Returns the table to our requested page.
  return (
    <div style={{ textAlign: 'center', direction: "ltr" }}>
      {loading ?
        <Loader style={{ margin: 'auto' }}
          type='Bars'
          height={300}
          width={300}
          color="SlateBlue"
        /> :
        <ManagementTable
          direction='ltr'
          headers={headers}
          content={tableRender}
          startIdx={1}
          contentController={{
            content,
            setContent
          }}
        />
      }
    </div>

  );
}
export default ItemsLayout;




