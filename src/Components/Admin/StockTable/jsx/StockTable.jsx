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

const headers = ["מודל", "משקל", "עלות", "נקיון", "צבע", "קוד", "הערות", "תאריך קנייה - תשלום", "סטטוס", "מלאי", "כמות פניות", "", "", "", ""];

export default function StockTable() {
  const [content, setContent] = useState([[]]);
  const [tableRender, setTableRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateModalId, setUpdateModalId] = useState(false);
  const [showOffersModal, setShowOffersModal] = useState();
  const [currOfferPagination, setCurrOfferPagination] = useState();
  const [offerData, setOfferData] = useState();
  // Fecth data from DB
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchGet('stocks');
        const fetchOfferCounter = await fetchGet('stocks-to-offers-counter');
        renderData(fetchedData, fetchOfferCounter);

      } catch (err) {
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

    const watchOffer = async (stockId) => {
      const offerD = await fetchGet(`stock-to-offers/${stockId}`)
      setOfferData(offerD);
      setCurrOfferPagination(0);
      setShowOffersModal({
        offer_id: offerD[0]['offer_id'],
        data: [
          { name: "מודל", content: offerD[0]['package_model'] },
          { name: "קוד", content: offerD[0]['code'] },
          { name: "שם הפונה", content: offerD[0]['name'] },
          { name: "טלפון", content: offerD[0]['phone'] },
          { name: "מייל", content: offerD[0]['email'] },
          { name: "משקל מוצע", content: offerD[0]['offered_weight'] },
          { name: "מחיר מוצע", content: offerD[0]['offered_price'] },
          { name: "הערות", content: offerD[0]['additional_comments'], multiline: true },
          // { name: "תאריך קנייה - תשלום", content: stockValues['sell_date'], type: 'date' },
        ]
      });
    }

    let tempContent = [];
    content.forEach((item, index) => {
      if (item.length < headers.length - 3) {
        return;
      }
      const watchOffersBtn =
        <Button
          key={Math.random() * index}
          variant="outline-info"
          disabled={item[11] === 0}
          onClick={() => watchOffer(item[0])}
        >
          צפה בפניות!
      </Button>;

      const confirmBtn =
        <Button
          key={Math.random() * index}
          variant={content[index][9] === 'בחנות' ? "outline-danger" : "outline-success"}
          onClick={() => moveInOutStoreHandler(index)}>
          {item[9] === 'בחנות' ? 'הוצא מהחנות' : 'העבר לחנות'}
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
      tempContent.push([...renderItems, watchOffersBtn, confirmBtn, updateBtn, deleteBtn]);
    })
    setTableRender(tempContent)
  }, [content, offerData])

  const updatePostUi = (newStock) => {
    const newStockFixed = [...newStock, newStock[2] * newStock[3], 0]
    setContent(prevContent => [...prevContent, newStockFixed]);
  }

  const updatePutUi = (updatedStock) => {
    const tempContent = [...content];
    const wantedIndex = tempContent.findIndex((item) => item[0] === updatedStock[0]);
    console.log(wantedIndex);
    const wantedItem = tempContent[wantedIndex];
    tempContent[wantedIndex] = [...updatedStock, wantedItem[wantedItem.length - 3], +updatedStock[2] * +updatedStock[3], wantedItem[wantedItem.length - 1]];
    console.log(tempContent[wantedIndex])
    updateMap[updatedStock[0]] = [
      { name: "מודל", content: updatedStock[1] },
      { name: "משקל", content: updatedStock[2] },
      { name: "עלות", content: updatedStock[3] },
      { name: "נקיון", content: updatedStock[4] },
      { name: "צבע", content: updatedStock[5] },
      { name: "קוד", content: updatedStock[6] },
      { name: "הערות", content: updatedStock[7] },
      { name: "תאריך קנייה - תשלום", content: updatedStock[8], type: 'date' },
    ];
    setContent(tempContent);
  }


  const renderData = (data, offerCounterData) => {
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
        offerCounterData[stockValues['stock_id']] ?? 0
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
    tempStock.sort((a, b) => b[11] - a[11]);
    setContent(tempStock);
  }

  const offerPagePagination = (operation, afterDelete = false) => {
    let nextPage;
    if (operation === '-') {
      nextPage = currOfferPagination - 1;
    }
    else {
      nextPage = currOfferPagination + 1;
    }
    if (afterDelete && Object.keys(offerData).length === 1) {
      setShowOffersModal(lastState => {
        return (
          {
            ...lastState,
            offer_id: "",
            data: []
          });
      });
      alert('אין פניות נוספות...');
      return;
    }

    else if (!offerData[nextPage]) {
      alert('אין פניות נוספות...');
      return;
    }

    setShowOffersModal(lastState => {
      return (
        {
          ...lastState,
          offer_id: offerData[nextPage]['offer_id'],
          data: [
            { name: "מודל", content: offerData[nextPage]['package_model'] },
            { name: "קוד", content: offerData[nextPage]['code'] },
            { name: "שם הפונה", content: offerData[nextPage]['name'] },
            { name: "טלפון", content: offerData[nextPage]['phone'] },
            { name: "מייל", content: offerData[nextPage]['email'] },
            { name: "משקל מוצע", content: offerData[nextPage]['offered_weight'] },
            { name: "מחיר מוצע", content: offerData[nextPage]['offered_price'] },
            { name: "הערות", content: offerData[nextPage]['additional_comments'], multiline: true },
            // { name: "תאריך קנייה - תשלום", content: stockValues['sell_date'], type: 'date' },
          ]
        });
    });
    if (operation !== 'none') {
      setCurrOfferPagination(nextPage);
    }
  }

  const removeCurrentOfferFromUi = () => {
    const reducedOfferIdx = content.findIndex(item => item[0] === offerData[currOfferPagination]['stock_id']);
    const tempOfferData = { ...offerData };
    delete tempOfferData[currOfferPagination];
    // Reorder items after remove
    for (let i = currOfferPagination; i < Object.keys(offerData).length - 1; i++) {
      tempOfferData[i] = tempOfferData[i + 1];
    }
    delete tempOfferData[Object.keys(offerData).length - 1];
    if (currOfferPagination === 0) {
      offerPagePagination('none', true);
    }
    else {
      offerPagePagination('-', true);
    }
    const updatedContent = [...content];
    updatedContent[reducedOfferIdx][11]--;
    setOfferData(tempOfferData);
    setContent(updatedContent);
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
        <React.Fragment>
          <ManagementTable
            title="מלאי"
            headers={headers}
            content={tableRender}
          />
          <FormModal
            fields={inputFields}
            modalType="input-form"
            popUpTitle="הוספת מלאי"
            apiPath="stock"
            updatePostUiFunc={updatePostUi}
          />

          <div className="progress-stock-wrapper">
            <label>ניצול מסגרת האשראי</label>
            <CircularProgressbar
              maxValue={100}
              value={10}
              percentage={10}
              text={`${10}%`} />
          </div>

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
          {
            showOffersModal &&
            <FormModal
              modalType="offer-info-form"
              fields={showOffersModal}
              autoShow={true}
              closeForm={() => setShowOffersModal(false)}
              popUpTitle="פרטי ההצעה"
              updatePutUiFunc={updatePutUi}
              pagePagination={offerPagePagination}
              currPage={`${Object.keys(offerData).length === 0 ? 0 : currOfferPagination + 1}/${Object.keys(offerData).length}`}
              removeCurrentOfferFromUi={removeCurrentOfferFromUi}
            />
          }
        </React.Fragment>
      }
    </div >
  );
}
