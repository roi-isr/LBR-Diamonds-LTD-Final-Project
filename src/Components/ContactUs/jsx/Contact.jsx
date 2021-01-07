import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../css/Contact.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import styled from 'styled-components/macro'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// import { Button } from 'react-bootstrap';

/* Creating a styled component that wraps the map and gives it a unique style */
const MapWrapper = styled.div`
    position: relative
    width: 100%;
    height: 100%;
    grid-row:1;
    grid-column: 2 / -1;
    z-index: 0;
`
/* Component that represents the display/render of the leaflet's map */
function MapDisplay() {
    const [position, setPosition] = useState([32.08356032537613, 34.80143183635717]);
    var map = null;
    const markerIcon = L.icon
        ({
            iconUrl: icon,
            iconSize: [25, 40]
        });
    useEffect(() => {
        if (map) {
            map.setView(position)
            setTimeout(() => map.setZoom(15), 300);
        }
    }, [position, map])

    /* Return the map view to indicated centrelized position */
    const getBackToCenter = () => {
        setPosition([32.08356032537613, 34.80143183635717]);
    }

    /* Mounting a map object to a variable for later map's potential manipulation */
    const MapFeatures = () => {
        map = useMap();
        return null;
    }
    return (
        <React.Fragment>
            <MapWrapper>
                <MapContainer className="map-container-css" center={position} zoom={15} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} icon={markerIcon}>
                        <Popup>
                            בורסת היהלומים רמת גן
                          </Popup>
                    </Marker>
                    <MapFeatures />
                </MapContainer>
                {/* <div id="map" style={{width:"500px",height:"415px"}}></div> */}
            </MapWrapper>
            {/* go back to centrelized position button */}
            <button
                className="home-btn"
                onClick={getBackToCenter}>
                H
              </button>
        </React.Fragment>
    );

}

/* Contact us form component */
function ContactForm() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [content, setContent] = useState("")

    //function that send the form data to the server .
    const submitForm = (event) => {
        event.preventDefault();
        fetch("https://final-project-lbr.herokuapp.com/contact",
            {
                mode: 'no-cors',
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email_address: email,
                    name: name,
                    phone: phone,
                    content: content
                })
            })
            .then(() => onSubmitSuccess())
            .catch(() => onSubmitFail())
    }

    // function that runs on a success submittion
    const onSubmitSuccess = () => {
        alert("הודעתך נשלחה בהצלחה!");
        setEmail("");
        setName("");
        setPhone("");
        setContent("");
    }

    // function that runs on a failed submittion
    const onSubmitFail = () => {
        alert("בעיה בשליחת ההודעה...");
    }

    return (
        <div className="contact-form-div">
            <Form onSubmit={(e) => submitForm(e)}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="textarea"
                        placeholder="Your name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="num">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="Number"
                        placeholder="054-345673"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                </Form.Group>
                <Button type='submit'>Contact us!</Button>
            </Form>
        </div>
    );
}

/* full page component that binds all page's component together */
function Contact() {
    return (
        <div className="contact-div">
            <ContactForm />
            <span className="div-seperator" />
            <MapDisplay />
        </div>
    );
}

export default Contact;