import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import fetchPost from '../../../../ApiEndpoints/Post';
import Loader from 'react-loader-spinner';
import '../css/AddAdmin.css';

const inputStyle = {
    width: '85%',
    margin: 'auto',
    textAlign: 'center',
    marginBottom: '15px'
};

const formStyle = {
    padding: '15px',
    border: '3px solid #000',
    borderRadius: '10px',
    width: '30%',
    margin: '30px auto',
    textAlign: 'center'
};

export default function AddAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const newAdminData = { email, password };
        try {
            await fetchPost('add-admin', newAdminData, true);
            alert("המשתמש נוסף בהצלחה כאדמין למערכת!");
        }
        catch (e) {
            alert("לא ניתן להוסיף משתמש זה למערכת. ייתכן והמשתמש כבר קיים...");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            <h1 className="add-admin-title">מסך הוספת אדמין</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group style={formStyle} controlId="formBasicEmail">
                    <Form.Label className='mx-auto'>הכנס אימייל</Form.Label>
                    <Form.Control
                        style={inputStyle}
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Label>הכנס סיסמא</Form.Label>
                    <Form.Control
                        style={inputStyle}
                        type="password"
                        required
                        placeholder="******"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant='primary'>הוסף אדמין</Button>
                    {loading &&
                        <Loader
                            className="spinner-icon"
                            type='Bars'
                            height={300}
                            width={300}
                            color="SlateBlue"
                        />}

                </Form.Group>

            </Form>
        </React.Fragment>
    );
}
