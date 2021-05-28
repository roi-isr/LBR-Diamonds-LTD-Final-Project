import React, { useState, useEffect } from "react";
import '../css/VirtualStore.css';
import ManagementTable from '../../ManagementTable/jsx/ManagementTable';
import Button from 'react-bootstrap/Button';
import FormModal from '../../../Components/UI-Elements/Modal/Modal';
import fetchGet from '../../../ApiEndpoints/Get';
import Loader from 'react-loader-spinner';
import '../css/ItemsLayout.css';
import NoItems from '../../UI-Elements/NoItems';

const headers = ['Model', 'Weight (Carat)', 'Clarity', 'Color', 'Price (per Carat)', ''];

const offerInputFields = [
  { name: "Name", type: 'text' },
  { name: "Phone", type: 'number' },
  { name: "Email", type: 'email' },
  { name: "Offered Weight", type: 'number' },
  { name: "Offered Price (per carat)", type: 'number' },
  { name: "Additional comments", type: 'text' },
];

function ItemsLayout() {
  const [content, setContent] = useState([[]]);
  const [tableRender, setTableRender] = useState([]);
  const [sendOfferModal, setSendOfferModal] = useState(false);
  const [loading, setLoading] = useState(true);

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
      if (item.length < headers.length) {
        return;
      }
      const offerBtn =
        <Button
          key={Math.random() * index}
          variant="outline-success"
          onClick={() => setSendOfferModal({ itemId: item[0], maxWeight: content[index][2] })}>
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
        storeValues['stock_id'], storeValues['package_model'],
        storeValues['weight_in_karat'], storeValues['clearance'],
        storeValues['color'], storeValues['cost_per_karat']
      );

      tempContent.push(subTempContent);
    });
    setContent(tempContent);
  }

  //Returns the table to our requested page.
  return (
    <div className="items-layout-main-div">
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
              title="Virtual Store"
              direction='ltr'
              headers={headers}
              content={tableRender}
            />}

          {sendOfferModal &&
            <FormModal
              directionInput="ltr"
              modalType="input-form"
              fields={offerInputFields}
              autoShow={true}
              closeForm={() => setSendOfferModal(false)}
              popUpTitle="Send an offer to admin"
              apiPath={`offer/${sendOfferModal['itemId']}`}
              authRequired={false}
              payload={{ maxWeight: sendOfferModal['maxWeight'] }}
            />
          }
        </React.Fragment>
      }

    </div>

  );
}

export default ItemsLayout;
