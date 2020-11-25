import React from 'react';
import Form from 'react-bootstrap/Form';
import './Contact.css'

class Contact extends React.Component {
    render() {
        return (
            <div className="contact-form-div">
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="textarea" placeholder="Your name" />
                    </Form.Group>
                    <Form.Group controlId="num">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="Number" placeholder="054-345673" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default Contact;