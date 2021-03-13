import React, { useState } from 'react';
import './Modal.css';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from 'react-bootstrap/Button'
import fetchPost from '../../../ApiEndpoints/Post';

function ModalForm({ modalType, fields, autoShow, closeForm, popUpTitle, postPath, updatePostUi,directionInput }) {
    const [show, setShow] = useState(false);
    const [inputData, setInputData] = useState({});
    const handleShow = () => setShow(true);

    let renderForm = null;

    const handleClose = () => {
        setShow(false);
        if (closeForm) {
            closeForm();
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try{
        await fetchPost(postPath, inputData);
        updatePostUi(Object.values(inputData));
        handleClose();

        } catch{
            alert('error')
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
                    required
                    dir={directionInput||'rtl'}
                    type={item.type}
                    placeholder={item.name}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    value={inputData[index]}
                    onChange={(e) => setInputData(prevState => { return { ...prevState, [index]: e.target.value } })}
                />
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
                    onClick={handleShow}>
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
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            סגור
                            </Button>
                        {modalType === 'input-form' &&
                            <Button
                                variant="primary"
                                type='submit'>
                                שמור שינויים
                            </Button>
                        }
                    </Modal.Footer>
                </form>
            </Modal>
        </React.Fragment>
    );
}

export default ModalForm;