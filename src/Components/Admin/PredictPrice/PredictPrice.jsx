
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import RadioBox from "./RadioBox"
import background from '../../../Assets/diamonds_comps/diamond_photo.png';
import './PredictPrice.css';
import fetchGet from '../../../ApiEndpoints/Get';
import Loader from 'react-loader-spinner';

export default function PredictForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [curPrediction, setCurPrediction] = useState("");
    const [inputData, setInputData] = useState({
        weight: "",
        cut: "",
        clarity: "",
        color: "",
        table: "",
        depth: ""
    });
    const inputFieldsWidth = "200px";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValidtation()) {
            return;
        }
        const requestUrl =
            `predict-price?weight=${inputData['weight']}&cut=${inputData['cut']}&color=${inputData['color']}&clarity=${inputData['clarity']}&depth=${inputData['depth']}&table=${inputData['table']}`;

        setIsLoading(true);
        try {
            const predictedPrice = await fetchGet(requestUrl);
            if (!predictedPrice['price-prediction']) {
                setCurPrediction("אין מספיק נתונים על מנת לחזות את מחירו של יהלום זה...");
            }
            else {
                setCurPrediction(`המחיר המוצע ליהלום זה הינו: ${predictedPrice['price-prediction']}`);
            }
        }
        catch { }
        finally {
            setIsLoading(false);
        }
    }

    const inputValidtation = () => {
        if (inputData['cut'] === '') {
            alert("אנא בחר חיתוך");
            return false;
        }
        else if (inputData['clarity'] === '') {
            alert("אנא בחר ניקיון");
            return false;
        }
        else if (inputData['color'] === '') {
            alert("אנא בחר צבע");
            return false;
        }
        else if (isNaN(inputData['weight'])) {
            alert("משקל חייב להיות מסוג מספר");
            return false;
        }
        else if (isNaN(inputData['table'])) {
            alert("לוח חייב להיות מסוג מספר");
            return false;
        }
        else if (isNaN(inputData['depth'])) {
            alert("עומק חייב להיות מסוג מספר");
            return false;
        }
        return true;
    }
    const onChaneInput = (name, item) => {
        const inputDataTemp = { ...inputData };
        inputDataTemp[name] = item;
        setInputData(inputDataTemp);
    }
    // Returns the table to our requested page.
    return (
        <React.Fragment>
            <h1 className="pred-title-div">Predict diamonds price (ML based)</h1>
            <div className="predict-main-div">
                <img
                    src={background}
                    alt="diamond-price-predictions"
                    className="predict-dmn-img" />

                <Form
                    dir='rtl'
                    background={background}
                    className="predict-form"
                    onSubmit={handleSubmit}
                >

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>הכנס משקל</Form.Label>
                        <Form.Control
                            style={{ width: inputFieldsWidth }}
                            type="input"
                            required
                            placeholder="הכנס משקל"
                            value={inputData['weight']}
                            onChange={(e) => onChaneInput('weight', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>בחר חיתוך</Form.Label>
                        <RadioBox
                            btnHeight="55"
                            btnWidth="80"
                            optionArray={['Premium', 'Very Good', 'Good', 'Ideal', 'Fair']}
                            name="cut"
                            onClickedState={onChaneInput}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>בחר ניקיון</Form.Label>
                        <RadioBox
                            optionArray={["VVS1", 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3']}
                            name="clarity"
                            onClickedState={onChaneInput}
                        />
                    </Form.Group>

                    <Form.Group controlId="">
                        <Form.Label>בחר צבע</Form.Label>
                        <RadioBox
                            optionArray={["D", "E", 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M']}
                            name="color"
                            onClickedState={onChaneInput}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>הכנס לוח</Form.Label>
                        <Form.Control
                            style={{ width: inputFieldsWidth }}
                            type="input"
                            placeholder="הכנס לוח"
                            required
                            value={inputData['table']}
                            onChange={(e) => onChaneInput('table', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>הכנס עומק</Form.Label>
                        <Form.Control
                            style={{ width: inputFieldsWidth }}
                            type="input"
                            required
                            placeholder="הכנס עומק"
                            value={inputData['depth']}
                            onChange={(e) => onChaneInput('depth', e.target.value)}
                        />
                    </Form.Group>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            מצא לי את המחיר!
                      </Button>
                        {
                            isLoading ?
                                <Loader
                                    type='Audio'
                                    height='50px'
                                    color='#1E50FF'
                                    style={{ margin: 'auto' }} /> :
                                <h3 style={{ textAlign: 'center' }}>
                                    {curPrediction}
                                </h3>
                        }

                    </div>
                </Form>
            </div>
        </React.Fragment>

    );

}
