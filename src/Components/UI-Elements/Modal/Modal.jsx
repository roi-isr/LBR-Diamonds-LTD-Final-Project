import React, {useState} from 'react';
import './Modal.css'
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import Button from 'react-bootstrap/Button'

function ModalForm({inputFields}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <React.Fragment>
            <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={handleShow}>
                הוספת משלוח
               </button>

            <Modal show={show} onHide={handleClose} animation={false}>
                <form onSubmit={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ marginLeft: '160px' }}>הוספת משלוח</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {inputFields.map((item, index) =>
                            <div className='input-del-div'>
                                <FormLabel>{item.name}</FormLabel>
                                <TextField
                                    key={'item' + index}
                                    required
                                    dir='rtl'
                                    type={item.type}
                                    placeholder={item.name}
                                    fullWidth
                                    variant="outlined"
                                    color="secondary"
                                />
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
              </Button>
                        <Button
                            variant="primary"
                            type='submit'>
                            Save Changes
              </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </React.Fragment>
    );
}

export default ModalForm;