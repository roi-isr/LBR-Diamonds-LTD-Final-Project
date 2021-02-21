import React, { useState } from 'react';
import './Modal.css'
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import Button from 'react-bootstrap/Button'

function ModalForm({ modalType, fields, autoShow, closeForm }) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        if (closeForm) {
            closeForm();
        }

    }
    let renderForm = null;

    // Determine if a input form or a info form
    if (modalType === 'input-form') {
        renderForm = fields.map((item, index) =>
            <div
                className='input-del-div'
                key={'item-input' + index}>
                <FormLabel>{item.name}</FormLabel>
                <TextField
                    required
                    dir='rtl'
                    type={item.type}
                    placeholder={item.name}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                />
            </div>
        );
    }

    else if (modalType === 'info-form') {
        renderForm = fields.map((item, index) =>
            <div
                className='info-del-div'
                key={'item-info' + index}>
                <FormLabel>{item.name}</FormLabel>
                <TextField
                rowsMax={5}
                    value={item.content}
                    disabled
                    dir='rtl'
                    type={item.type}
                    placeholder={item.name}
                    fullWidth
                    variant="outlined"
                    color="secondary">
                </TextField>
            </div>
        );
    }

    return (
        <React.Fragment>
            {modalType === 'input-form' &&
                <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={handleShow}>
                    הוספת משלוח
               </button>
            }
            <Modal show={show || autoShow} onHide={handleClose} animation={false}>
                <form onSubmit={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ marginLeft: '160px' }}>הוספת משלוח</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {renderForm}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            סגור
                            </Button>
                        <Button
                            variant="primary"
                            type='submit'>
                            שמור שינויים
                            </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </React.Fragment>
    );
}

export default ModalForm;