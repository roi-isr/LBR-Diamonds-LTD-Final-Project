
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import RadioBox from "./RadioBox"
import background from '../../../Assets/diamonds_comps/diamond_photo.png';
import './PredictPrice.css'

export default function PredictForm() {

    const inputFieldsWidth = "200px"

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    // Returns the table to our requested page.
    return (
        <React.Fragment>
            <h1 className="pred-title-div">Predict diamonds price (ML based)</h1>
            <div className="predict-main-div">
                <img src={background} className="predict-dmn-img" />

                <Form dir='rtl' background={background} className="predict-form" >

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>הכנס משקל</Form.Label>
                        <Form.Control style={{width: inputFieldsWidth}} type="input" placeholder="הכנס משקל" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>בחר חיתוך</Form.Label>
                        <RadioBox
                            btnHeight="55"
                            btnWidth="80"
                            optionArray={["Excellent", 'Very Good', 'Good', 'Fair', 'Poor']} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>בחר ניקיון</Form.Label>
                        <RadioBox optionArray={["VVS1", 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3']} />
                    </Form.Group>

                    <Form.Group controlId="">
                        <Form.Label>בחר צבע</Form.Label>
                        <RadioBox optionArray={["D", "E", 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>הכנס לוח</Form.Label>
                        <Form.Control style={{width: inputFieldsWidth}} type="input" placeholder="הכנס לוח" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>הכנס עומק</Form.Label>
                        <Form.Control style={{width: inputFieldsWidth}} type="input" placeholder="הכנס עומק" />
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        onClick={e => handleSubmit(e)}>
                        מצא לי את המחיר !
  </Button>
                </Form>
            </div>
        </React.Fragment>

    );

}
