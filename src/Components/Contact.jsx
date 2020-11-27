import React from 'react';
import Form from 'react-bootstrap/Form';
import './Contact.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styled from 'styled-components/macro'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const markerIcon = L.icon({
    iconUrl: icon,
    shadowUrl: 'leaflet/dist/images/marker-shadow.png',
    iconSize: [25, 40]
})

class Contact extends React.Component {

    render() {
        const position = [32.08356032537613, 34.80143183635717]
        return (
            <div className="contact-div">
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


                <MapWrapper>
                    <MapContainer style={{ height: "400px", width: "800px" }} center={position} zoom={15} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position} icon={markerIcon}>
                            <Popup>
                                בורסת היהלומים רמת גן
                          </Popup>
                        </Marker>
                    </MapContainer>
                </MapWrapper>

            </div>
        );
    }
}

const MapWrapper = styled.div`
    position: relative
    width: 100%;
    height: 350px;
    margin-bottom:10px;
    grid-row:1;
    grid-column: 2 / -1;
    z-index: 0;
`

export default Contact;