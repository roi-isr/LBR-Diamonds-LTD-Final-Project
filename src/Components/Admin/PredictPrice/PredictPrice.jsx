
import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import ManagementTable from '../../ManagementTable/jsx/ManagementTable'
import Fab from '@material-ui/core/Fab';
import Button from 'react-bootstrap/Button'
import { sorter } from '../../ManagementTable/Utility'
import Form from 'react-bootstrap/Form'
import pics from '../../../Assets/diamonds_comps/edgar-soto-gb0BZGae1Nk-unsplash.jpg';
import Image from 'react-bootstrap/Image'



export default function PredictForm() {

    // Returns the table to our requested page.
    return (

        <Form dir='rtl' style={{textAlign:'right'}}>
            <div style={{ width: "100%", height: "100px", marginBottom: '5px', backgroundImage: `url(${pics})`, backgroundSize: '200px', border: '1px solid blue', boxShadow: '2px 2px 2px 2px#000' }}></div>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>הכנס משקל</Form.Label>
                <Form.Control type="input" placeholder="הכנס משקל" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" dir="rtl">
                <Form.Label> הכנס צבע</Form.Label>
                <Form.Control type="input" placeholder="הכנס צבע" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>הכנס ניקיון</Form.Label>
                <Form.Control type="input" placeholder="בחירת ניקיון" />
            </Form.Group>
            <Form.Group controlId="חיתוך היהלום">
                <Form.Label>בחר חיתוך</Form.Label>
                <Form.Control type="input" placeholder="Enter cut" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>הכנס לוח</Form.Label>
                <Form.Control type="input" placeholder="הכנס לוח" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Enter depth</Form.Label>
                <Form.Control type="input" placeholder="Enter depth" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
  </Button>
        </Form>
    );
}
