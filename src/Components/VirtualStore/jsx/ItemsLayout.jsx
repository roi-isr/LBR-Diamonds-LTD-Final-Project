import React, { useState, useEffect } from "react";
import '../css/VirtualStore.css';
import ManagementTable from '../../ManagementTable/jsx/ManagementTable';
import Button from 'react-bootstrap/Button';
import FormModal from '../../../Components/UI-Elements/Modal/Modal';
import fetchGet from '../../../ApiEndpoints/Get';
import Loader from 'react-loader-spinner';
import '../css/ItemsLayout.css';

const headers = ['Model', 'Weight (Carat)', 'Price (per Carat)', 'Clarity', 'Color', ''];

const offerInputFields = [
  { name: "Name", type: 'text' },
  { name: "Phone", type: 'text' },
  { name: "Email", type: 'text' },
  { name: "Offered Weight", type: 'text' },
  { name: "Offered Price", type: 'text' },
  { name: "Additional comments", type: 'text' },
];

function ItemsLayout() {

  const [content, setContent] = useState([[]]);
  const [tableRender, setTableRender] = useState([]);
  const [sendOfferModal, setSendOfferModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fecth data from DB
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchGet('store-items', false);
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
    let tempContent = [];
    content.forEach((item, index) => {
      const offerBtn =
        <Button
          key={Math.random() * index}
          variant="outline-success"
          onClick={() => setSendOfferModal(item[0])}>
          SEND OFFER
     </Button>;

      const renderItems = item.slice(1);
      tempContent.push([...renderItems, offerBtn]);
    })
    setTableRender(tempContent);
  }, [content])

  // Convert the data fetch for DB into renderable data
  const renderData = (data) => {
    const tempContent = [];
    Object.values(data).forEach(storeValues => {
      const subTempContent = [];
      subTempContent.push(
        storeValues['stock_id'], storeValues['package_model'], storeValues['weight_in_karat'],
        storeValues['cost_per_karat'], storeValues['clearance'], storeValues['color'],
      );

      tempContent.push(subTempContent);
    });
    setContent(tempContent);
  }

  //Returns the table to our requested page.
  return (
    <div className="items-layout-main-div">
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

      {
        sendOfferModal &&
        <FormModal
          directionInput="ltr"
          modalType="input-form"
          fields={offerInputFields}
          autoShow={true}
          closeForm={() => setSendOfferModal(false)}
          popUpTitle="Send an offer to admin"
          apiPath={`offer/${sendOfferModal}`}
          authRequired={false}
        />
      }
    </div>

  );
}
export default ItemsLayout;




