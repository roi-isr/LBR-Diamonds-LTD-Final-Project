
import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import ManagementTable from '../../ManagementTable/jsx/ManagementTable'
import Fab from '@material-ui/core/Fab';
import Button from 'react-bootstrap/Button'
import { sorter } from '../../ManagementTable/Utility'
import Form from 'react-bootstrap/Form'
import pics from '../../../Assets/diamonds_comps/edgar-soto-gb0BZGae1Nk-unsplash.jpg';
import Image from 'react-bootstrap/Image'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import RadioBox from "./RadioBox"
import background from '../../../Assets/diamonds_comps/diamond_photo.png';
import './PredictPrice.css'

export default function PredictForm() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    // Returns the table to our requested page.
    return (
        <React.Fragment>
            <div className="predict-main-div">
                <img src={background} className="predict-dmn-img" />

                <Form dir='rtl' background={background} className="predict-form" >

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>הכנס משקל</Form.Label>
                        <Form.Control type="input" placeholder="הכנס משקל" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>בחר חיתוך</Form.Label>
                        <RadioBox optionArray={["Excellent",'Very Good','Good','Fair','Poor']} />
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
                        <Form.Control type="input" placeholder="הכנס לוח" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>הכנס עומק</Form.Label>
                        <Form.Control type="input" placeholder="" />
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
