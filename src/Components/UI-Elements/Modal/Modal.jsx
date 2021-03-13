import React, { useState } from 'react';
import './Modal.css';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from 'react-bootstrap/Button'
import fetchPost from '../../../ApiEndpoints/Post';
import Loader from 'react-loader-spinner';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MenuItem from '@material-ui/core/MenuItem'

<<<<<<< HEAD
function ModalForm({ modalType, fields, autoShow, closeForm, popUpTitle, postPath, updatePostUi,directionInput }) {
    const [show, setShow] = useState(false);
    const [inputData, setInputData] = useState({});
    const handleShow = () => setShow(true);
=======
function ModalForm({ modalType, fields, autoShow, closeForm, popUpTitle, postPath, updatePostUiFunc }) {
    const [show, setShow] = useState(false);
    const [inputData, setInputData] = useState({});
    const [isFetching, setIsFetching] = useState(false);
>>>>>>> a2931b2aa769ddde40ffcf156f50801ade060bfe

    let renderForm = null;

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
        try {
            setIsFetching(true);
            const itemId = await fetchPost(postPath, inputData);
            updatePostUiFunc([itemId, ...Object.values(inputData)]);
            setIsFetching('Success');
            setTimeout(handleClose, 3000);
        } catch {
            alert('error')
            setIsFetching('Fail');
        }
    }
    // Determine if a input form or a info form
    if (modalType === 'input-form') {
        renderForm = fields.map((item, index) =>
            <div
                className='input-del-div'
                key={'item-input' + index}>
                <FormLabel>{item.name}</FormLabel>
                <TextField
                    {...item}
                    required
<<<<<<< HEAD
                    dir={directionInput||'rtl'}
                    type={item.type}
                    placeholder={item.name}
=======
                    dir='rtl'
>>>>>>> a2931b2aa769ddde40ffcf156f50801ade060bfe
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    value={inputData[index]}
                    onChange={(e) => setInputData(prevState => { return { ...prevState, [index]: e.target.value } })}
                >
                    {/* for combobox inputs */}
                    {item.options && item.options.map(option =>
                        <MenuItem 
                        key={option.value} 
                        value={option.value}
                        style={{direction:'rtl'}}>
                            {option.label}
                        </MenuItem>
                    )}
                </TextField>
            </div>
        );
    }

    else if (modalType === 'contact-info-form') {
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
                    type={item.type}
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
                    style={{ height: '250px', fontSize: '1.3rem', overflow: 'auto', resize: 'none' }}
                    value={fields[4].content}
                    disabled
                    type={fields[4].type}
                >
                </textarea>
            </div>
        )
    }


    return (
        <React.Fragment>
            {modalType === 'input-form' &&
                <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={() => setShow(true)}>
                    {popUpTitle}
                </button>
            }

            <Modal show={show || autoShow} onHide={handleClose} animation={false}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ marginLeft: '160px' }}>{popUpTitle}</Modal.Title>
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
                        <Button variant="secondary" onClick={handleClose}>
                            סגור
                            </Button>
                        {modalType === 'input-form' &&
                            <Button
                                variant="primary"
                                type='submit'>
                                שמור שינויים
                            </Button>}
                    </Modal.Footer>
                </form>
            </Modal>

        </React.Fragment>
    );
}

export default ModalForm;