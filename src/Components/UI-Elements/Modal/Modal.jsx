import React, { useEffect, useState } from 'react';
import './Modal.css';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from 'react-bootstrap/Button'
import fetchPost from '../../../ApiEndpoints/Post';
import fetchPut from '../../../ApiEndpoints/Put';
import fetchDelete from '../../../ApiEndpoints/Delete';
import Loader from 'react-loader-spinner';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MenuItem from '@material-ui/core/MenuItem'



function ModalForm({ modalType, fields, autoShow, closeForm,
    popUpTitle, apiPath, updatePostUiFunc, updatePutUiFunc, deleteUiFunc,
    directionInput, authRequired, pagePagination, currPage, removeCurrentOfferFromUi, payload }) {
    const [show, setShow] = useState(false);
    const [inputData, setInputData] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    let renderForm = null;
    let offerUserEmail;

    useEffect(() => {
        if (modalType === 'update-form') {
            const contentObj = {};
            fields.forEach((item, index) => {
                contentObj[index] = item.content;
            });
            setInputData(contentObj);
        }
    }, [fields, modalType])

    const handleClose = () => {
        setInputData({});
        setIsFetching(false);
        setShow(false);
        if (closeForm) {
            closeForm();
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let itemId;
        setIsFetching(true);
        if (modalType === 'update-form') {
            itemId = await fetchPut(apiPath, inputData);
            updatePutUiFunc && updatePutUiFunc([itemId, ...Object.values(inputData)]);
        } else {
            if (popUpTitle === 'העברת משלוח למלאי') {
                let inputDataFixed;
                console.log(inputData)
                if (!inputData[1]) {
                    inputDataFixed = { ...inputData, 1: fields[1].defaultValue };
                }
                else {
                    inputDataFixed = { ...inputData };
                }
                await fetchPost('stock', inputDataFixed, authRequired ?? true);
                await fetchPut(apiPath, {});
                deleteUiFunc && deleteUiFunc();
                alert("המשלוח נוסף למלאי בהצלחה!");
            }
            else {
                if (payload?.maxWeight && inputData[3] > payload.maxWeight) {
                    alert(`לא ניתן לחרוג מהמשקל המקסימלי (${payload.maxWeight})`);
                    setIsFetching(false);
                    return;
                }
                itemId = await fetchPost(apiPath, inputData, authRequired ?? true);
                updatePostUiFunc && updatePostUiFunc([itemId, ...Object.values(inputData)]);
            }
        }
        setIsFetching('Success');
        setTimeout(handleClose, 1000);
    }

    // Determine if a input form or a info form
    switch (modalType) {
        case 'input-form':
            renderForm = fields.map((item, index) =>
                <div
                    className='input-del-div'
                    key={'item-input' + index}>
                    <FormLabel>{item.name}</FormLabel>
                    <TextField
                        {...item}
                        required
                        dir={directionInput || 'rtl'}
                        type={item.type}
                        placeholder={item.name}
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        value={item.value ?? inputData[index]}
                        onChange={(e) => setInputData(prevState => { return { ...prevState, [index]: e.target.value } })}
                    >
                        {/* for combobox inputs */}
                        {item.options && item.options.map(option =>
                            <MenuItem
                                key={option.value}
                                value={option.value}
                                style={{ direction: 'rtl' }}>
                                {option.label}
                            </MenuItem>
                        )}
                    </TextField>
                </div>
            );
            break;

        case 'update-form':
            let dateFormat;
            renderForm = fields.map((item, index) => {
                if (item.type === 'date') {
                    const now = new Date(inputData[index]);
                    dateFormat = `${now.getFullYear()}-${now.getMonth() < 9 ? "0" : ""}${now.getMonth() + 1}-${now.getDate() < 10 ? "0" : ""}${now.getDate()}`
                }
                return (
                    <div
                        className='input-del-div'
                        key={'item-input' + index}>
                        <FormLabel>{item.name}</FormLabel>
                        <TextField
                            {...item}
                            dir={directionInput || 'rtl'}
                            type={item.type || 'text'}
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            value={item.type === 'date' ? dateFormat : inputData[index]}
                            onChange={(e) => setInputData(prevState => { return { ...prevState, [index]: e.target.value } })}
                        >
                            {/* for combobox inputs */}
                            {item.options && item.options.map(option =>
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                    style={{ direction: 'rtl' }}>
                                    {option.label}
                                </MenuItem>
                            )}
                        </TextField>
                    </div>
                );
            });
            break;

        case 'offer-info-form':
            const fieldsFixed = fields.data;
            const offerId = fields.offer_id;
            offerUserEmail = fieldsFixed[4]?.content;

            const deleteOffer = async (offerId) => {
                const deleteConfirm = window.confirm('האם אתה בטוח שברצונך למחוק הצעה זו?');
                if (!deleteConfirm) {
                    return;
                }
                await fetchDelete(`offer/${offerId}`);
                removeCurrentOfferFromUi();
            }

            const acceptOffer = async () => {
                const weight = window.prompt("הכנס את משקל המכירה", fieldsFixed[5].content);
                const maxWeight = fields['maxWeight'];
                const diamondClarity = fields['diamondClarity'];
                const diamondColor = fields['diamondColor'];

                if (!weight) {
                    return;
                }
                else if (weight > maxWeight) {
                    alert(`לא ניתן לחרוג מהמשקל המקסימלי (${maxWeight})`);
                    return;
                }

                const price = window.prompt("הכנס מחיר לקראט", fieldsFixed[6].content);
                if (!price) {
                    return;
                }

                const payment_method = window.prompt("הכנס שיטת תשלום", "");
                if (!payment_method) {
                    return;
                }

                const sell_data = {
                    code: fieldsFixed[1].content,
                    model: fieldsFixed[0].content,
                    weight,
                    price,
                    customer_name: fieldsFixed[2].content,
                    customer_phone: fieldsFixed[3].content,
                    customer_mail: fieldsFixed[4].content,
                    sell_date: fieldsFixed[8].content,
                    payment_method: payment_method
                };

                await fetchPost(`sell`, sell_data);

                const sell_ML_data = {
                    weight,
                    price: price * weight,
                    diamondClarity,
                    diamondColor,
                };

                await fetchPost(`sell-data`, sell_ML_data);

                await fetchDelete(`offer/${offerId}`);
                alert("המכירה אושרה ונוספה למכירות!");
                removeCurrentOfferFromUi();
                window.location.reload();
            }
            renderForm = fieldsFixed.map((item, index) => {
                return (
                    <div
                        className='input-del-div'
                        key={'item-input' + index}>
                        <FormLabel>{item.name}</FormLabel>
                        <TextField
                            dir={directionInput || 'rtl'}
                            type={item.type || 'text'}
                            fullWidth
                            disabled
                            variant="outlined"
                            color="secondary"
                            value={item.content}
                            multiline={item.multiline ?? false}
                        >
                        </TextField>
                    </div>
                );
            });
            renderForm.push(
                <div className="modal-form-pagination">
                    <Button
                        style={{ float: 'left' }}
                        name="next-offer"
                        onClick={() => pagePagination('+')}>
                        הבא
            </Button>
                    <div className="curr-page-h6">
                        <h6 >
                            {currPage}
                        </h6>
                        <div className="offer-options-div" >
                            <Button
                                variant="success"
                                dir="rtl"
                                onClick={() => acceptOffer()}>
                                אשר מכירה
                    </Button>
                            <Button
                                variant="warning"
                                dir="rtl"
                                href={`https://mail.google.com/mail/u/0/?fs=1&to=${offerUserEmail}&su=A%20response%20to%20your%20offer&body=%0A%0A%0ABest%20regards,%0ALBR%20Diamonds.&tf=cm`}
                                target="_blank">
                                חזור במייל!
                    </Button>
                            <Button
                                variant="danger"
                                dir="rtl"
                                onClick={() => deleteOffer(offerId)}>
                                הסר פנייה
                    </Button>
                        </div>
                    </div>
                    <Button
                        style={{ float: 'right' }}
                        name="prev-offer"
                        onClick={() => pagePagination('-')}>
                        הקודם
            </Button>
                </div >
            )
            break;

        case 'contact-info-form':
            offerUserEmail = fields[1]?.content;
            renderForm = fields.map((item, index) =>
                index < 3 &&
                <div
                    className='info-del-div'
                    key={'item-info' + index}>
                    <FormLabel>{item.name}</FormLabel>
                    <TextField
                        inputProps={{ style: { textAlign: 'center', height: '1px' } }}
                        value={item.content}
                        disabled
                        type={item.type || 'text'}
                        variant="outlined"
                        color="secondary">
                    </TextField>
                </div>
            ).reverse();
            renderForm.unshift(
                <div
                    className='info-del-div-time'>
                    <FormLabel>{fields[3].name}</FormLabel>
                    <TextField
                        inputProps={{ style: { textAlign: 'center', height: '1px' } }}
                        value={fields[3].content}
                        disabled
                        type={fields[3].type}
                        variant="outlined"
                        color="secondary">
                    </TextField>
                </div>)
            renderForm.push(
                <div
                    className='info-del-div-content'>
                    <FormLabel>{fields[4].name}</FormLabel>
                    <textarea
                        dir='auto'
                        className="text-area-modal"
                        value={fields[4].content}
                        disabled
                        type={fields[4].type}
                    >
                    </textarea>
                    <Button
                        style={{ position: 'relative', top: '10px' }}
                        variant="warning"
                        dir="rtl"
                        href={`https://mail.google.com/mail/u/0/?fs=1&to=${offerUserEmail}&su=A%20response%20to%20your%20offer&body=%0A%0A%0ABest%20regards,%0ALBR%20Diamonds.&tf=cm`}
                        target="_blank">
                        חזור במייל!
                    </Button>
                </div>
            )
            break;

        case 'customer-info-form':
            {
                renderForm = fields.map((item, index) =>
                    <div
                        className='info-customer-div'
                        key={'item-info' + index}>
                        <FormLabel>{item.name}</FormLabel>
                        <TextField
                            inputProps={{ style: { textAlign: 'center', height: '1px' } }}
                            value={item.content}
                            disabled
                            type={'text'}
                            variant="outlined"
                            color="secondary">
                        </TextField>
                    </div>
                )
            }
            const customerEmail = fields[1].content;
            renderForm.push(
                <Button
                    style={{ display: 'block', width: '30%', margin: 'auto' }}
                    variant="warning"
                    dir="rtl"
                    href={`https://mail.google.com/mail/u/0/?fs=1&to=${customerEmail}&su=A%20response%20to%20your%20offer&body=%0A%0A%0ABest%20regards,%0ALBR%20Diamonds.&tf=cm`}
                    target="_blank">
                    חזור במייל!
                </Button>
            );
            break;
    }


    return (
        <React.Fragment>
            {modalType === 'input-form' &&
                popUpTitle !== "העברת משלוח למלאי" &&
                <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={() => setShow(true)}>
                    {popUpTitle}
                </button>
            }

            <Modal show={show || autoShow} onHide={handleClose} animation={false}>
                <form onSubmit={handleSubmit} >
                    <Modal.Header closeButton>
                        <Modal.Title
                            style={{ marginLeft: 'auto' }}>
                            {popUpTitle}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {renderForm}
                    </Modal.Body>
                    <Modal.Footer style={{ margin: 'auto' }}>
                        {isFetching === true &&
                            <Loader
                                style={{ margin: '0 auto 0 0' }}
                                type='Bars'
                                height={40}
                                width={40}
                                color="SlateBlue"
                            />
                        }
                        {isFetching === 'Success' &&
                            <CheckCircleIcon
                                style={{ fill: 'green', width: '40px', height: '40px', margin: '0 auto 0 0' }}
                            />}
                        <div className='close-save-div'>
                            <Button
                                style={{ margin: '0 5px' }}
                                variant="secondary"
                                onClick={handleClose}>
                                {directionInput === "ltr" ? "Close" : "סגור"}

                            </Button>

                            {modalType !== 'contact-info-form' && modalType !== 'offer-info-form' && modalType !== 'customer-info-form' &&
                                <Button
                                    style={{ margin: '0 5px' }}
                                    variant="primary"
                                    type='submit'>
                                    {directionInput === "ltr" ? "Save Changes" : "שמור שינויים"}
                                </Button>}
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>

        </React.Fragment>
    );
}

export default ModalForm;