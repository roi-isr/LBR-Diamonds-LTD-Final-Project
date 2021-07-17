// A component used for contacting the admin, as well as displaying an interctive map the shows the company exact location

import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../css/Contact.css';
import fetchPost from '../../../ApiEndpoints/Post';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import styled from 'styled-components/macro'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import Loader from 'react-loader-spinner';

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
        <div>
            <MapWrapper style={{ position: 'relative' }}>
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
                <button
                    className="home-btn"
                    onClick={getBackToCenter}>
                    H
                </button>
            </MapWrapper>
            {/* go back to centrelized position button */}
        </div>
    );
}

/* Contact us form component */
function ContactForm() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    // Send the form data to the server .
    const submitForm = async (event) => {
        setLoading(true);
        event.preventDefault();
        const contentData = {
            email_address: email,
            name: name,
            phone: phone,
            content: content
        }
        try {
            await fetchPost('contact', contentData, false);
            alert("Your message was sent successfully!");
            setEmail("");
            setName("");
            setPhone("");
            setContent("");
        }
        catch (e) {
            alert("Couldn't submit your message. Please try again later.");
        }
        finally {
            setLoading(false);
        }
    }

    const formElementsAttr = [
        {
            controlId: "exampleForm.ControlInput1", label: "Email address",
            controlAttr: {
                type: "email", placeholder: "name@example.com", value: email,
                onChange: (event) => setEmail(event.target.value)
            }
        },
        {
            controlId: "name", label: "Name",
            controlAttr: {
                type: "textarea", placeholder: "Your name", value: name,
                onChange: (event) => setName(event.target.value)
            }
        },
        {
            controlId: "num", label: "Phone Number",
            controlAttr: {
                type: "textarea", placeholder: "054-345673", value: phone,
                onChange: (event) => setPhone(event.target.value)
            }
        },
        {
            controlId: "exampleForm.ControlTextarea1", label: "Content",
            controlAttr: {
                as: "textarea", className: "contact-txt-area", placeholder: "Add your content", rows: 3, value: content,
                onChange: (event) => setContent(event.target.value)
            }
        },
    ];

    const renderFormElements =
        formElementsAttr.map((item, index) =>
            <Form.Group
                key={index}
                controlId={item.controlId}>
                <Form.Label
                    style={{ fontSize: '1.2rem' }}>
                    {item.label}
                </Form.Label>
                <Form.Control
                    required
                    {...item.controlAttr}
                />
            </Form.Group>)

    return (
        <div className="contact-form-div">
            <Form
                style={{ textAlign: 'center' }}
                onSubmit={(e) => submitForm(e)}>
                {renderFormElements}
                <div className="contact-submission-div">
                    <Button
                        type='submit'
                        style={{ fontSize: '18px', margin: 'auto' }}>Contact Us!</Button>
                    {loading &&
                        <Loader
                            className="spinner-icon"
                            style={{ margin: '10px 0' }}
                            type='Bars'
                            height={30}
                            width={30}
                            color="SlateBlue"
                        />}
                </div>
            </Form>
        </div>
    );
}

/* full page component that binds all page's component together */
function ContactUs() {
    return (
        <div className="contact-div">
            <ContactForm />
            <span className="div-seperator" />
            <MapDisplay />
        </div>
    );
}

export default ContactUs;
